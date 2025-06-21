import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, Clock } from "lucide-react";

const busSchedules = [
  {
    routeName: "Campus Loop",
    routeId: "campus-loop",
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
    routeId: "express-downtown",
    schedule: [
      { stop: "Student Union", time: "9:00 AM" },
      { stop: "Central Station", time: "9:20 AM" },
      { stop: "City Hall", time: "9:35 AM" },
    ],
  },
  {
    routeName: "South Residential",
    routeId: "south-residential",
    schedule: [
      { stop: "South Dorms", time: "7:45 AM" },
      { stop: "Rec Center", time: "7:55 AM" },
      { stop: "Library", time: "8:10 AM" },
    ],
  },
];


export default function BusSchedulePage() {
  return (
    <div>
      <PageHeader
        title="Bus Schedule"
        description="Find timetables for all campus bus routes."
      />
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="campus-loop" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              {busSchedules.map((route) => (
                <TabsTrigger key={route.routeId} value={route.routeId}>
                  <Bus className="mr-2 h-4 w-4" /> {route.routeName}
                </TabsTrigger>
              ))}
            </TabsList>
            {busSchedules.map((route) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
