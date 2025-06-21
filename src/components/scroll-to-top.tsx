'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className={cn(
          'bg-background/75 backdrop-blur-sm transition-opacity hover:bg-accent',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <ArrowUp className="h-4 w-4" />
        <span className="sr-only">Go to top</span>
      </Button>
    </div>
  );
}
