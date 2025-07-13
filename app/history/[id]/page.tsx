import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import GoBackButton from '@/components/GoBackButton'; // newly added

export const dynamic = 'force-dynamic';

export default async function Page(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('summaries')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) notFound();

  return (
    <>
      <Navbar hideHistoryButton={true} />

      <main className="max-w-3xl mx-auto py-24 px-4 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <div>
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-muted-foreground text-sm">{data.url}</p>
          </div>
          <GoBackButton />
        </div>

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

      <FooterSection />
    </>
  );
}
