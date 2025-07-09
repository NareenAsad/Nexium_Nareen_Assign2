'use client';

import { Globe, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  url: string;
  isLoading: boolean;
  error: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function UrlForm({ url, isLoading, error, setUrl, handleSubmit }: Props) {
  return (
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
  );
}
