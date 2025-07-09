'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  title: string;
  summary: string;
  urduSummary: string;
}

export default function SummaryResult({ title, summary, urduSummary }: Props) {
  return (
    <div className="border-t pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
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
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        </TabsContent>
        <TabsContent value="translation" className="mt-4">
          <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
            <p className="text-gray-700 leading-relaxed text-right">{urduSummary}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
