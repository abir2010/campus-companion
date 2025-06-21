import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 py-8">
        <Skeleton className="h-7 w-48" />
      </header>
      <main className="flex-grow">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4 pb-12 pt-8 text-center md:space-y-8 md:pt-16">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full max-w-[700px]" />
          <Skeleton className="h-6 w-1/2 max-w-[500px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 pb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex h-full flex-col justify-between">
                <CardHeader>
                  <Skeleton className="mb-4 h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <div className="px-6 pb-6">
                    <Skeleton className="h-5 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="container mx-auto border-t px-4 py-6 text-center">
        <Skeleton className="h-5 w-1/3 mx-auto" />
      </footer>
    </div>
  );
}
