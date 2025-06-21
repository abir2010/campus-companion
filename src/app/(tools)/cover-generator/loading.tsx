import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <PageHeader
                title="Cover Page Generator"
                description="Provide your details and let our AI generate a professional cover page for you."
            />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-7 w-24" />
                        <Skeleton className="h-5 w-3/4" />
                    </CardHeader>
                    <CardContent className="flex-grow space-y-6">
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-32" />
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Skeleton className="h-5 w-16" /><Skeleton className="h-10 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2"><Skeleton className="h-5 w-32" /><Skeleton className="h-10 w-full" /></div>
                           <div className="space-y-2"><Skeleton className="h-5 w-36" /><Skeleton className="h-10 w-full" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2"><Skeleton className="h-5 w-28" /><Skeleton className="h-10 w-full" /></div>
                           <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Skeleton className="h-5 w-20" /><Skeleton className="h-10 w-full" /></div>
                           <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                        </div>
                    </CardContent>
                     <CardFooter>
                        <Skeleton className="h-10 w-36" />
                    </CardFooter>
                </Card>
                <div className="flex items-start">
                    <div className="flex h-full min-h-[700px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                        <div className="text-center">
                            <p className="text-lg font-semibold text-muted-foreground">Your generated cover will appear here.</p>
                            <p className="text-sm text-muted-foreground">Fill out the form and click generate!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
