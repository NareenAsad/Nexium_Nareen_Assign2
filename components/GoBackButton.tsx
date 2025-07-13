'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // adjust path if you're using a custom button

export default function GoBackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()}>
      Go Back
    </Button>
  );
}
