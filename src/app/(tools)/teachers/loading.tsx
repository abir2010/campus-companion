import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <PageHeader
                title="Faculty Directory"
                description="Search for faculty members by name and filter by department."
            />
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Skeleton className="h-10 w-full md:w-[280px]" />
                <Skeleton className="h-10 w-full flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-5 w-1/2" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-5 w-3/4" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
