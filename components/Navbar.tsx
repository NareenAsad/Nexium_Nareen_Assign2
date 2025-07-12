'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface NavbarProps {
  hideHistoryButton?: boolean;
}

const Navbar = ({ hideHistoryButton = false }: NavbarProps) => {
  const pathname = usePathname();
  const isIntroductionPage = pathname === '/' || pathname === '/mainpage';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background text-foreground shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl hover:opacity-80 transition">
          Concisio
        </Link>

        <div className="flex items-center space-x-4">
          {/* Show History button on all pages except history page or if hidden explicitly */}
          {!hideHistoryButton && pathname !== '/history' && (
            <Link
              href="/history"
              className="text-sm px-4 py-2 font-bold hover:opacity-90 transition"
            >
              History
            </Link>
          )}

          {/* Show social icons only on introduction page */}
          {isIntroductionPage && (
            <>
              <Link
                href="https://github.com/NareenAsad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary transition"
              >
                <FaGithub />
              </Link>
              <Link
                href="https://linkedin.com/in/nareen-asad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-blue-600 transition"
              >
                <FaLinkedin />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
