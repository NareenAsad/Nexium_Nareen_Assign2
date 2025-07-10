'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background text-foreground shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/mainpage" className="font-bold text-2xl hover:opacity-80 transition">
          Concisio
        </Link>

        <div className="flex items-center space-x-4">
          {/* GitHub Icon */}
          <Link
            href="https://github.com/NareenAsad/Nexium_Nareen_Assign2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors duration-200 text-xl"
          >
            <FaGithub />
          </Link>

          {/* LinkedIn Icon */}
          <Link
            href="https://linkedin.com/in/nareen-asad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-blue-600 transition-colors duration-200 text-xl"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
