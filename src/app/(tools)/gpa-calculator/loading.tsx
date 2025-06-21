import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <PageHeader
                title="GPA Calculator"
                description="Calculate your semester and cumulative GPA by adding your courses."
            />
            
            <Card className="mb-8">
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-64" />
                        </CardHeader>
                        <CardContent>
                             <Skeleton className="h-40 w-full" />
                             <div className="mt-6 p-4 border-t">
                                <Skeleton className="h-24 w-full" />
                             </div>
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-36" />
                        </CardFooter>
                    </Card>
                </div>
                
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                           <Skeleton className="h-7 w-48" />
                           <Skeleton className="h-5 w-full mt-2" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2"><Skeleton className="h-5 w-40" /><Skeleton className="h-10 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-5 w-40" /><Skeleton className="h-10 w-full" /></div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-32" />
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                           <Skeleton className="h-24 w-full" />
                           <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
