import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { MongoClient } from 'mongodb';
import { createClient } from '@supabase/supabase-js';
import { translateToUrdu } from '@/lib/translateToUrdu';

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ success: false, error: 'Invalid URL provided' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').text() || 'Untitled Blog Post';
    const bodyText = $('body').text();
    const paragraphs = $('p').map((_, el) => $(el).text()).get();
    const content = paragraphs.join('\n\n') || bodyText.substring(0, 5000);

    if (!content.trim()) throw new Error('No readable content found on the page');

    const trimmedContent = content.length > 4000 ? content.substring(0, 4000) : content;
    const summary = await generateLlamaSummary(trimmedContent);
    const urduSummary = await translateToUrdu(summary);

    await saveToDatabases(url, title, content, summary, urduSummary);

    return NextResponse.json({
      success: true,
      title,
      content,
      summary,
      urduSummary
    });

  } catch (error: any) {
    console.error('Summarize Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process blog',
      details: error.name === 'AbortError' ? 'Request timed out' : undefined
    }, { status: 500 });
  }
}

// LLaMA via Groq API
async function generateLlamaSummary(content: string): Promise<string> {
  const prompt = `Summarize the following blog post *clearly and concisely*. Do not include any introductory phrases like "Here's a summary" — just give the summary content directly:\n\n${content}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are a summarization assistant. Only return the summary text without any introduction or explanation.',
        },
        {
          role: 'user',
          content: prompt,
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || 'Summary not available';
}

// Store to DBs
async function saveToDatabases(
  url: string,
  title: string,
  content: string,
  summary: string,
  urduSummary: string
) {
  if (process.env.MONGODB_URI) {
    try {
      const mongoClient = new MongoClient(process.env.MONGODB_URI);
      await mongoClient.connect();
      const db = mongoClient.db('blog-summarizer');
      await db.collection('blogs').insertOne({
        url,
        title,
        content: content.substring(0, 15000),
        createdAt: new Date()
      });
      await mongoClient.close();
    } catch (mongoError) {
      console.error('MongoDB Error:', mongoError);
    }
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { error } = await supabase.from('summaries').insert({
        url,
        title,
        english_summary: summary,
        urdu_summary: urduSummary,
        created_at: new Date().toISOString()
      });

      if (error) console.error('Supabase Error:', error);
    } catch (supabaseError) {
      console.error('Supabase Connection Error:', supabaseError);
    }
  }
}
