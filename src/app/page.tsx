import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator, Landmark, FileSignature, CalendarPlus, UsersRound, BusFront } from 'lucide-react';

const features = [
  {
    title: 'Assignment Cover Generator',
    description: 'Create professional assignment covers with AI.',
    icon: <FileSignature className="h-8 w-8 text-primary" />,
    href: '/cover-generator',
    dataAiHint: 'assignment cover',
  },
  {
    title: 'GPA Calculator',
    description: 'Calculate your semester and cumulative GPA.',
    icon: <Calculator className="h-8 w-8 text-primary" />,
    href: '/gpa-calculator',
    dataAiHint: 'calculator notebook',
  },
  {
    title: 'Fee Calculator',
    description: 'Estimate your university tuition and other fees.',
    icon: <Landmark className="h-8 w-8 text-primary" />,
    href: '/fee-calculator',
    dataAiHint: 'university campus',
  },
  {
    title: 'Routine Maker',
    description: 'Generate and manage your class schedule.',
    icon: <CalendarPlus className="h-8 w-8 text-primary" />,
    href: '/routine-maker',
    dataAiHint: 'calendar schedule',
  },
  {
    title: 'Teacher Directory',
    description: 'Find contact information for your teachers.',
    icon: <UsersRound className="h-8 w-8 text-primary" />,
    href: '/teachers',
    dataAiHint: 'lecture hall',
  },
  {
    title: 'Bus Schedule',
    description: 'View the campus bus timetables.',
    icon: <BusFront className="h-8 w-8 text-primary" />,
    href: '/bus-schedule',
    dataAiHint: 'bus schedule',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 py-8">
        <h1 className="font-headline text-2xl font-bold text-foreground">Campus Companion</h1>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4 pb-12 pt-8 text-center md:space-y-8 md:pt-16">
          <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Your All-in-One University Toolkit
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Simplify your academic life with our powerful and easy-to-use tools, from generating assignment covers to calculating your GPA.
          </p>
        </div>

        <div className="container mx-auto max-w-6xl px-4 pb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title} className="group rounded-lg">
                <Card className="flex h-full transform-gpu flex-col justify-between border-2 border-transparent bg-card shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary hover:shadow-xl" data-ai-hint={feature.dataAiHint}>
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardDescription className="px-6 pb-6 text-base">
                    {feature.description}
                  </CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <footer className="container mx-auto border-t px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Campus Companion. All rights reserved.</p>
      </footer>
    </div>
  );
}
