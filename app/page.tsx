'use client';

import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Introduction from './mainpage/page';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Introduction/>
      <FooterSection />
    </>
  );
}
