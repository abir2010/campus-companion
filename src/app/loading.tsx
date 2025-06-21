'use client';

import { useState, useEffect } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-3xl font-bold text-foreground">Campus Companion</h1>
        <p className="text-5xl font-bold font-mono text-primary">{progress}%</p>
        <p className="text-muted-foreground animate-pulse">Please wait...</p>
      </div>
    </div>
  );
}
