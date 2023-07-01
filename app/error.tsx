'use client';

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">حدث خطأ ما.</h2>
      <Button onClick={() => reset()}>المحاولة مرة أخرى</Button>
    </div>
  );
}