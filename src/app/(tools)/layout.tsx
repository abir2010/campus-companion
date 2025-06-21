import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function ToolsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="font-headline text-xl font-bold">
                    IIUC Companion
                </Link>
                <Button variant="ghost" asChild>
                    <Link href="/">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </Button>
            </div>
        </header>
        <main className="container mx-auto px-4 py-10">
            {children}
        </main>
    </div>
  );
}
