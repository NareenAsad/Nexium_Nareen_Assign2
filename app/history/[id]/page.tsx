import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('summaries')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) notFound();

  return (
    <main className="max-w-3xl mx-auto py-24 px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-muted-foreground text-sm mb-6">{data.url}</p>

      <section className="space-y-6">
        <div className="p-4 border rounded bg-muted">
          <h2 className="text-xl font-semibold mb-2">English Summary</h2>
          <p>{data.english_summary}</p>
        </div>

        <div className="p-4 border rounded bg-muted">
          <h2 className="text-xl font-semibold mb-2">Urdu Summary</h2>
          <p className="text-right">{data.urdu_summary}</p>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Created at: {new Date(data.created_at).toLocaleString()}
        </p>
      </section>
    </main>
  );
}
