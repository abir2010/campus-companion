import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, Clock } from "lucide-react";

const scheduleData = {
  regular: {
    label: "Regular Days (Sat-Wed)",
    dayType: "regular",
    routes: [
      {
        routeName: "Campus Loop",
        routeId: "campus-loop-regular",
        schedule: [
          { stop: "Student Union", time: "8:00 AM" },
          { stop: "Library", time: "8:10 AM" },
          { stop: "Engineering Building", time: "8:20 AM" },
          { stop: "Science Complex", time: "8:30 AM" },
          { stop: "North Dorms", time: "8:45 AM" },
        ],
      },
      {
        routeName: "Express Downtown",
        routeId: "express-downtown-regular",
        schedule: [
          { stop: "Student Union", time: "9:00 AM" },
          { stop: "Central Station", time: "9:20 AM" },
          { stop: "City Hall", time: "9:35 AM" },
        ],
      },
      {
        routeName: "South Residential",
        routeId: "south-residential-regular",
        schedule: [
          { stop: "South Dorms", time: "7:45 AM" },
          { stop: "Rec Center", time: "7:55 AM" },
          { stop: "Library", time: "8:10 AM" },
        ],
      },
    ],
  },
  friday: {
    label: "Friday",
    dayType: "friday",
    routes: [
       {
        routeName: "Campus Loop",
        routeId: "campus-loop-friday",
        schedule: [
          { stop: "Student Union", time: "9:00 AM" },
          { stop: "Library", time: "9:15 AM" },
          { stop: "Engineering Building", time: "9:30 AM" },
        ],
      },
      {
        routeName: "Express Downtown",
        routeId: "express-downtown-friday",
        schedule: [
          { stop: "Student Union", time: "10:00 AM" },
          { stop: "Central Station", time: "10:20 AM" },
        ],
      },
    ],
  },
};

type Route = {
  routeName: string;
  routeId: string;
  schedule: { stop: string; time: string }[];
};

const RouteTabs = ({ routes, defaultRouteId }: { routes: Route[]; defaultRouteId: string }) => {
  if (!routes || routes.length === 0) {
    return (
        <Card className="mt-4">
            <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No bus service available for this schedule.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Tabs defaultValue={defaultRouteId} className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {routes.map((route) => (
          <TabsTrigger key={route.routeId} value={route.routeId}>
            <Bus className="mr-2 h-4 w-4" /> {route.routeName}
          </TabsTrigger>
        ))}
      </TabsList>
      {routes.map((route) => (
        <TabsContent key={route.routeId} value={route.routeId}>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{route.routeName} Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stop</TableHead>
                    <TableHead className="text-right">Departure Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {route.schedule.map((stopInfo) => (
                    <TableRow key={stopInfo.stop}>
                      <TableCell className="font-medium">{stopInfo.stop}</TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{stopInfo.time}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};


export default function BusSchedulePage() {
  return (
    <div>
      <PageHeader
        title="Bus Schedule"
        description="Find timetables for all campus bus routes for regular days and Fridays."
      />
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue={scheduleData.regular.dayType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value={scheduleData.regular.dayType}>{scheduleData.regular.label}</TabsTrigger>
                <TabsTrigger value={scheduleData.friday.dayType}>{scheduleData.friday.label}</TabsTrigger>
            </TabsList>
            <TabsContent value={scheduleData.regular.dayType}>
                <RouteTabs routes={scheduleData.regular.routes} defaultRouteId={scheduleData.regular.routes[0]?.routeId} />
            </TabsContent>
            <TabsContent value={scheduleData.friday.dayType}>
                <RouteTabs routes={scheduleData.friday.routes} defaultRouteId={scheduleData.friday.routes[0]?.routeId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
