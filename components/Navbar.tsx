'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          BlogSummarizer
        </Link>
        <span className="text-sm text-gray-600">Powered by AI</span>
      </div>
    </nav>
  );
}
