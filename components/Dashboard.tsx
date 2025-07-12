'use client';

import { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2, Globe, Text, Languages,
  Database, Check, AlertTriangle
} from "lucide-react";

interface BlogSummary {
  title: string;
  content: string;
  summary: string;
  urduSummary: string;
}

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<BlogSummary | null>(null);
  const [error, setError] = useState('');
  const [dbStatus, setDbStatus] = useState({ mongo: false, supabase: false });

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
        headers: { 'Content-Type': 'application/json' },
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
        setDbStatus({ mongo: true, supabase: true });
      } else {
        throw new Error(result.error || 'Failed to summarize blog');
      }
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message || 'An unexpected error occurred');
      }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 mt-10 transition-colors">
      <div className="max-w-4xl mx-auto">
        <Card className="rounded-2xl shadow-xl overflow-hidden bg-card border border-border transition-colors mt-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Text className="w-5 h-5 text-primary" />
              Summarize Any Blog
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url" className="flex items-center gap-2 text-foreground">
                  <Globe className="w-4 h-4" />
                  Enter Blog URL
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
                    className="py-5 px-6"
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
                  <div className="flex items-center gap-2 text-destructive text-sm mt-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </form>

            {summary && (
              <div className="mt-10 space-y-8">
                <div className="border-t pt-8 border-border">
                  <h2 className="text-2xl font-bold mb-2">{summary.title}</h2>

                  <Tabs defaultValue="summary" className="mt-6">
                    <TabsList className="grid grid-cols-2 w-[300px] bg-muted">
                      <TabsTrigger value="summary" className="data-[state=active]:bg-secondary">
                        English Summary
                      </TabsTrigger>
                      <TabsTrigger value="translation" className="data-[state=active]:bg-secondary">
                        Urdu Translation
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="mt-4">
                      <div className="rounded-lg p-5 border border-border bg-muted">
                        <p className="leading-relaxed">{summary.summary}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="translation" className="mt-4">
                      <div className="rounded-lg p-5 border border-border bg-muted">
                        <p className="leading-relaxed text-right">
                          {summary.urduSummary}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className={`border ${dbStatus.mongo ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' : 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700'}`}>
                    <CardHeader className="pb-3">
                      <div className={`flex items-center gap-2 ${dbStatus.mongo ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                        <Database className="w-5 h-5" />
                        <CardTitle className="text-lg">MongoDB Status</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
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

                  <Card className={`border ${dbStatus.supabase ? 'bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-700' : 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700'}`}>
                    <CardHeader className="pb-3">
                      <div className={`flex items-center gap-2 ${dbStatus.supabase ? 'text-purple-700 dark:text-purple-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                        <Database className="w-5 h-5" />
                        <CardTitle className="text-lg">Supabase Status</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
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
              <div className="mt-12 text-center py-12 border-t border-dashed border-border">
                <div className="flex justify-center mb-4">
                  <div className="bg-muted p-4 rounded-full">
                    <Languages className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">How It Works</h3>
                <ol className="max-w-md mx-auto space-y-2 text-left text-muted-foreground">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm mr-2">1</span>
                    Enter the URL of any blog post
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm mr-2">2</span>
                    Our AI extracts content and generates a concise summary
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm mr-2">3</span>
                    The summary is automatically translated to Urdu
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm mr-2">4</span>
                    Results are saved to MongoDB and Supabase
                  </li>
                </ol>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
