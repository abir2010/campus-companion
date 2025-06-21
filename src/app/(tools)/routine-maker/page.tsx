
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useId, useMemo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Class = {
  id: string;
  name: string;
  teacher: string;
  day: string;
  startTime: string;
  endTime: string;
};

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`); // 08:00 to 17:00

const timeToMinutes = (time: string) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const ClassCard = ({ classItem, colorIndex }: { classItem: Class, colorIndex: number }) => {
    const scheduleStartMinutes = timeToMinutes('08:00');
    const scheduleEndMinutes = timeToMinutes('18:00');
    const totalDuration = scheduleEndMinutes - scheduleStartMinutes;

    const startMinutes = timeToMinutes(classItem.startTime);
    const endMinutes = timeToMinutes(classItem.endTime);

    const top = ((startMinutes - scheduleStartMinutes) / totalDuration) * 100;
    const height = ((endMinutes - startMinutes) / totalDuration) * 100;

    const colorSchemes = [
        { bg: 'hsl(var(--primary) / 0.1)', border: 'hsl(var(--primary) / 0.4)', text: 'hsl(var(--primary))'},
        { bg: 'hsl(var(--accent) / 0.15)', border: 'hsl(var(--accent) / 0.4)', text: 'hsl(var(--accent-foreground))'},
        { bg: 'hsl(var(--chart-1) / 0.1)', border: 'hsl(var(--chart-1) / 0.4)', text: 'hsl(var(--chart-1))'},
        { bg: 'hsl(var(--chart-2) / 0.1)', border: 'hsl(var(--chart-2) / 0.4)', text: 'hsl(var(--chart-2))'},
        { bg: 'hsl(var(--chart-4) / 0.1)', border: 'hsl(var(--chart-4) / 0.4)', text: 'hsl(var(--chart-4))'},
        { bg: 'hsl(var(--chart-5) / 0.1)', border: 'hsl(var(--chart-5) / 0.4)', text: 'hsl(var(--chart-5))'},
    ];
    
    const scheme = colorSchemes[colorIndex % colorSchemes.length];

    if (top < 0 || height <= 0) return null;

    return (
        <div
            className="absolute w-full p-1 z-10"
            style={{
                top: `${top}%`,
                height: `${height}%`,
            }}
        >
            <div
                className="relative p-2 rounded-lg h-full w-full border flex flex-col overflow-hidden"
                style={{
                    backgroundColor: scheme.bg,
                    borderColor: scheme.border,
                    color: scheme.text
                }}
            >
                <p className="font-bold text-xs leading-tight truncate">{classItem.name}</p>
                <p className="text-xs opacity-80 truncate">{classItem.teacher}</p>
                <p className="text-xs opacity-80 mt-auto">{classItem.startTime} - {classItem.endTime}</p>
            </div>
        </div>
    );
};


export default function RoutineMakerPage() {
  const [classes, setClasses] = useState<Class[]>([
    { id: '1', name: 'Software Engineering', teacher: 'Dr. Grace Hopper', day: 'Monday', startTime: '10:00', endTime: '11:30' },
    { id: '2', name: 'Algorithms', teacher: 'Dr. Ada Lovelace', day: 'Wednesday', startTime: '14:00', endTime: '15:30' },
    { id: '3', name: 'Data Structures', teacher: 'Dr. Alan Turing', day: 'Tuesday', startTime: '09:00', endTime: '10:30' },
  ]);

  const [newClass, setNewClass] = useState({
    name: '',
    teacher: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
  });
  
  const formId = useId();

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name || !newClass.teacher) {
      alert("Please fill out all fields.");
      return;
    }
    
    if (timeToMinutes(newClass.startTime) >= timeToMinutes(newClass.endTime)) {
        alert("End time must be after start time.");
        return;
    }

    setClasses([...classes, { ...newClass, id: Date.now().toString() }]);
    setNewClass({ name: '', teacher: '', day: 'Monday', startTime: '09:00', endTime: '10:30' });
  };

  const handleRemoveClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClass(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewClass(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div>
      <PageHeader
        title="Routine Maker"
        description="Build and visualize your personalized weekly class schedule."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add a Class</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddClass} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor={`${formId}-name`}>Course Name</Label>
                  <Input id={`${formId}-name`} name="name" value={newClass.name} onChange={handleInputChange} placeholder="e.g., Calculus I" required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`${formId}-teacher`}>Teacher</Label>
                  <Input id={`${formId}-teacher`} name="teacher" value={newClass.teacher} onChange={handleInputChange} placeholder="e.g., Prof. Einstein" required/>
                </div>
                <div className="space-y-1">
                  <Label>Day</Label>
                  <Select name="day" value={newClass.day} onValueChange={(v) => handleSelectChange('day', v)}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                    <Label htmlFor={`${formId}-startTime`}>Start Time</Label>
                    <Input id={`${formId}-startTime`} type="time" name="startTime" value={newClass.startTime} onChange={handleInputChange} required step="1800"/>
                  </div>
                   <div className="space-y-1">
                    <Label htmlFor={`${formId}-endTime`}>End Time</Label>
                    <Input id={`${formId}-endTime`} type="time" name="endTime" value={newClass.endTime} onChange={handleInputChange} required step="1800"/>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Class
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Class List</CardTitle>
            </CardHeader>
            <CardContent className="max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {classes.length > 0 ? classes.sort((a,b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day) || a.startTime.localeCompare(b.startTime)).map(c => (
                  <div key={c.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="text-sm">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-muted-foreground">{c.day}, {c.startTime} - {c.endTime}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveClass(c.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )) : <p className="text-sm text-muted-foreground text-center py-4">No classes added yet.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="flex min-w-[700px]">
                        <div className="w-20 flex-shrink-0 pt-10">
                            {timeSlots.map(time => (
                                <div key={time} className="h-20 flex justify-end pr-2 border-r">
                                    <span className="text-xs text-muted-foreground -translate-y-2.5">{time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex-grow grid grid-cols-7">
                            {daysOfWeek.map(day => (
                                <div key={day} className="relative border-l">
                                    <div className="text-center text-sm font-semibold py-2 h-10 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-20">{day}</div>
                                    <div className="absolute inset-0 top-10">
                                        {timeSlots.slice(0, -1).map(time => (
                                            <div key={`${day}-${time}-line`} className="h-20 border-t border-dashed"></div>
                                        ))}
                                    </div>
                                    {classes.filter(c => c.day === day).map((c, index) => <ClassCard key={c.id} classItem={c} colorIndex={index} />)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
