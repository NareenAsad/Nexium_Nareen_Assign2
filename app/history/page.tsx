'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

interface Summary {
  id: number;
  title: string;
  url: string;
  english_summary: string;
  urdu_summary: string;
  created_at: string;
}

export default function HistoryPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setSummaries(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('summaries').delete().eq('id', id);
    if (!error) {
      setSummaries(summaries.filter((s) => s.id !== id));
    }
  };

  return (
    <>
      <Navbar hideHistoryButton={true} />
      <main className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Summary History</h1>

        {loading ? (
          <p>Loading...</p>
        ) : summaries.length === 0 ? (
          <p className="text-muted-foreground">No summaries found.</p>
        ) : (
          <div className="space-y-6">
            {summaries.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-xl p-5 bg-muted group hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/history/${item.id}`);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item.url}</p>
                <p className="text-sm line-clamp-2">{item.english_summary}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Created at: {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <FooterSection/>
    </>
  );
}
