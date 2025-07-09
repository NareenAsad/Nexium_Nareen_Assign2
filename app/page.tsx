'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Globe, Text, Languages, Database, Check, AlertTriangle } from "lucide-react";

interface BlogSummary {
  title: string;
  content: string;
  summary: string;
  urduSummary: string;
}

export default function BlogSummarizer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<BlogSummary | null>(null);
  const [error, setError] = useState('');
  const [dbStatus, setDbStatus] = useState({
    mongo: false,
    supabase: false
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!url || !url.startsWith('http')) {
      setError('Please enter a valid blog URL starting with http/https');
      return;
    }

    setIsLoading(true);
    setError('');
    setSummary(null);
    setDbStatus({ mongo: false, supabase: false });
    
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSummary({
          title: result.title,
          content: result.content,
          summary: result.summary,
          urduSummary: result.urduSummary
        });
        setDbStatus({
          mongo: true,
          supabase: true
        });
      } else {
        throw new Error(result.error || 'Failed to summarize blog');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog Summarizer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform lengthy blog posts into concise summaries with AI and get instant Urdu translations
          </p>
        </div>

        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Text className="w-5 h-5 text-indigo-600" />
              Summarize Any Blog
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url" className="flex items-center gap-2 text-gray-700">
                  <Globe className="w-4 h-4" />
                  Blog URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/blog-post"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 py-5 text-base"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 py-5 px-6"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : 'Summarize'}
                  </Button>
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </form>

            {summary && (
              <div className="mt-10 space-y-8">
                <div className="border-t pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{summary.title}</h2>
                  
                  <Tabs defaultValue="summary" className="mt-6">
                    <TabsList className="grid grid-cols-2 w-[300px] bg-gray-100">
                      <TabsTrigger value="summary" className="data-[state=active]:bg-indigo-100">
                        English Summary
                      </TabsTrigger>
                      <TabsTrigger value="translation" className="data-[state=active]:bg-indigo-100">
                        Urdu Translation
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="summary" className="mt-4">
                      <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
                        <p className="text-gray-700 leading-relaxed">{summary.summary}</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="translation" className="mt-4">
                      <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
                        <p className="text-gray-700 leading-relaxed text-right">
                          {summary.urduSummary}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className={`${dbStatus.mongo ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <CardHeader className="pb-3">
                      <div className={`flex items-center gap-2 ${dbStatus.mongo ? 'text-green-700' : 'text-yellow-700'}`}>
                        <Database className="w-5 h-5" />
                        <CardTitle className="text-lg">MongoDB Status</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={`flex items-center gap-2 ${dbStatus.mongo ? 'text-green-600' : 'text-yellow-600'}`}>
                        {dbStatus.mongo ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Full blog content stored successfully</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4" />
                            <span>Storage failed - check environment variables</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`${dbStatus.supabase ? 'bg-purple-50 border-purple-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <CardHeader className="pb-3">
                      <div className={`flex items-center gap-2 ${dbStatus.supabase ? 'text-purple-700' : 'text-yellow-700'}`}>
                        <Database className="w-5 h-5" />
                        <CardTitle className="text-lg">Supabase Status</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={`flex items-center gap-2 ${dbStatus.supabase ? 'text-purple-600' : 'text-yellow-600'}`}>
                        {dbStatus.supabase ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Summaries stored successfully</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4" />
                            <span>Storage failed - check environment variables</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {!summary && !isLoading && (
              <div className="mt-12 text-center py-12 border-t border-dashed border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="bg-indigo-100 p-4 rounded-full">
                    <Languages className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">How It Works</h3>
                <ol className="max-w-md mx-auto text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-sm mr-2">1</span>
                    Enter the URL of any blog post
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-sm mr-2">2</span>
                    Our AI extracts content and generates a concise summary
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-sm mr-2">3</span>
                    The summary is automatically translated to Urdu
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-sm mr-2">4</span>
                    Results are saved to MongoDB and Supabase
                  </li>
                </ol>
              </div>
            )}
          </CardContent>
        </Card>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Next.js, Tailwind CSS, and ShadCN UI • Deploy on Vercel</p>
        </footer>
      </div>
    </div>
  );
}