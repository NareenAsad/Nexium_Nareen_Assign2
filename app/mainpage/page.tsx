'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Languages, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Introduction() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background text-foreground px-4 text-center pt-35 pb-10">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Concisio</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          The intelligent blog summarizer that gives you clear, AI-generated summaries — with instant Urdu translations. Built for clarity, speed, and simplicity.
        </p>

        <div className="pt-4">
          <Link href="/summarize">
            <Button size="lg" className="gap-2">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section with 3 Cards */}
      <div className="mt-16 w-full max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-border shadow-md">
          <CardHeader className="flex items-center justify-center text-primary">
            <Zap className="w-6 h-6" />
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle className="text-lg">AI-Powered Summarization</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Generate concise summaries from long blog posts instantly.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-md">
          <CardHeader className="flex items-center justify-center text-primary">
            <Languages className="w-6 h-6" />
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle className="text-lg">Instant Urdu Translation</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Automatically translate summaries to Urdu for wider accessibility.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-md">
          <CardHeader className="flex items-center justify-center text-primary">
            <Database className="w-6 h-6" />
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle className="text-lg">Secure Storage</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Save blog data in MongoDB and summaries in Supabase.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
