'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background text-foreground shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl hover:opacity-80 transition">
          Concisio
        </Link>

        <div className="flex items-center space-x-4">
          <button className="font-semibold hover:text-destructive transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
