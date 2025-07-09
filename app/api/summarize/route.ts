import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { MongoClient } from 'mongodb';
import { createClient } from '@supabase/supabase-js';
import { translateToUrdu } from '@/lib/translateToUrdu';

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url || typeof url !== 'string') {
    return NextResponse.json({
      success: false,
      error: 'Invalid URL provided'
    }, { status: 400 });
  }

  try {
    // 1. Scrape blog content with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').text() || 'Untitled Blog Post';
    const bodyText = $('body').text();
    const paragraphs = $('p').map((_, el) => $(el).text()).get();
    const content = paragraphs.join('\n\n') || bodyText.substring(0, 5000);

    if (!content.trim()) {
      throw new Error('No readable content found on the page');
    }

    // 2. Simulate AI summary
    const summary = simulateSummary(content);

    // 3. Translate to Urdu using Google Translate API
    const urduSummary = await translateToUrdu(summary);

    // 4. Save to databases
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

function simulateSummary(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length === 0) return text.substring(0, 200);

  const importantSentences = sentences
    .filter(s => s.length > 30)
    .sort((a, b) => b.length - a.length)
    .slice(0, 3);

  return importantSentences.join(' ') || text.substring(0, 200);
}

async function saveToDatabases(
  url: string,
  title: string,
  content: string,
  summary: string,
  urduSummary: string
) {
  // MongoDB
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

  // Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { error } = await supabase
        .from('summaries')
        .insert({
          url,
          title,
          english_summary: summary,
          urdu_summary: urduSummary,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Supabase Error:', error);
      }
    } catch (supabaseError) {
      console.error('Supabase Connection Error:', supabaseError);
    }
  }
}
