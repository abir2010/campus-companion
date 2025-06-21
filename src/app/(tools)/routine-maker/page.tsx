import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function RoutineMakerPage() {
  return (
    <div>
      <PageHeader
        title="Routine Maker"
        description="Build and visualize your personalized weekly class schedule."
      />
      <Card>
        <CardHeader>
          <CardTitle>Your Weekly Schedule</CardTitle>
          <CardDescription>
            This feature is currently under construction. Soon, you'll be able to add classes and create your routine here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Coming Soon!</AlertTitle>
            <AlertDescription>
              The interactive routine maker is being developed. Check back later to build your schedule, add classes from the teacher directory, and export your routine as a PDF.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
