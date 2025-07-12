'use client';

import { useEffect, useState } from 'react';

interface SummaryEntry {
  id: number;
  url: string;
  title: string;
  english_summary: string;
  urdu_summary: string;
  created_at: string;
}

export function useSummaryHistory() {
  const [history, setHistory] = useState<SummaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('/api/summary-history');
        const data = await res.json();
        setHistory(data.summaries || []);
      } catch (err) {
        console.error('Failed to load summary history', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return { history, loading };
}
