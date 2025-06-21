
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useId } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Class = {
  id: string;
  name: string;
  teacher: string;
  day: string;
  period: string; 
};

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];

const timePeriods = [
  { name: 'Period 1', time: '10:40 - 11:30' },
  { name: 'Period 2', time: '11:30 - 12:20' },
  { name: 'Period 3', time: '12:20 - 13:10' },
  { name: 'Lunch', time: '13:10 - 13:50', isBreak: true },
  { name: 'Period 4', time: '13:50 - 14:40' },
  { name: 'Period 5', time: '14:40 - 15:30' },
  { name: 'Period 6', time: '15:30 - 16:20' },
];

const classPeriods = timePeriods.filter(p => !p.isBreak);

const ClassCard = ({ classItem, colorIndex }: { classItem: Class, colorIndex: number }) => {
    const colorSchemes = [
        { bg: 'hsl(var(--primary) / 0.1)', border: 'hsl(var(--primary) / 0.4)', text: 'hsl(var(--primary))'},
        { bg: 'hsl(var(--accent) / 0.15)', border: 'hsl(var(--accent) / 0.4)', text: 'hsl(var(--accent-foreground))'},
        { bg: 'hsl(var(--chart-1) / 0.1)', border: 'hsl(var(--chart-1) / 0.4)', text: 'hsl(var(--chart-1))'},
        { bg: 'hsl(var(--chart-2) / 0.1)', border: 'hsl(var(--chart-2) / 0.4)', text: 'hsl(var(--chart-2))'},
        { bg: 'hsl(var(--chart-4) / 0.1)', border: 'hsl(var(--chart-4) / 0.4)', text: 'hsl(var(--chart-4))'},
        { bg: 'hsl(var(--chart-5) / 0.1)', border: 'hsl(var(--chart-5) / 0.4)', text: 'hsl(var(--chart-5))'},
    ];
    
    const scheme = colorSchemes[colorIndex % colorSchemes.length];

    return (
        <div
            className="p-2 rounded-lg h-full w-full border flex flex-col overflow-hidden text-left"
            style={{
                backgroundColor: scheme.bg,
                borderColor: scheme.border,
                color: scheme.text
            }}
        >
            <p className="font-bold text-sm leading-tight truncate">{classItem.name}</p>
            <p className="text-xs opacity-80 truncate">{classItem.teacher}</p>
            <p className="text-xs opacity-80 mt-auto">{classItem.period}</p>
        </div>
    );
};


export default function RoutineMakerPage() {
  const [classes, setClasses] = useState<Class[]>([
    { id: '1', name: 'Software Engineering', teacher: 'Dr. Grace Hopper', day: 'Monday', period: '10:40 - 11:30' },
    { id: '2', name: 'Algorithms', teacher: 'Dr. Ada Lovelace', day: 'Wednesday', period: '13:50 - 14:40' },
    { id: '3', name: 'Data Structures', teacher: 'Dr. Alan Turing', day: 'Tuesday', period: '11:30 - 12:20' },
  ]);

  const [newClass, setNewClass] = useState({
    name: '',
    teacher: '',
    day: 'Saturday',
    period: classPeriods[0].time,
  });
  
  const formId = useId();

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name || !newClass.teacher) {
      alert("Please fill out all fields.");
      return;
    }
    
    const conflict = classes.find(c => c.day === newClass.day && c.period === newClass.period);
    if (conflict) {
        alert(`There is already a class scheduled for ${newClass.day} during ${newClass.period}.`);
        return;
    }

    setClasses([...classes, { ...newClass, id: Date.now().toString() }]);
    setNewClass({ name: '', teacher: '', day: 'Saturday', period: classPeriods[0].time });
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
  
  const uniqueCourseNames = [...new Set(classes.map(c => c.name))];
  
  return (
    <div>
      <PageHeader
        title="Routine Maker"
        description="Build and visualize your personalized weekly class schedule based on fixed periods."
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
                <div className="space-y-1">
                  <Label>Period</Label>
                  <Select name="period" value={newClass.period} onValueChange={(v) => handleSelectChange('period', v)}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      {classPeriods.map(p => <SelectItem key={p.time} value={p.time}>{p.name} ({p.time})</SelectItem>)}
                    </SelectContent>
                  </Select>
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
                {classes.length > 0 ? classes.sort((a,b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day) || a.period.localeCompare(b.period)).map(c => (
                  <div key={c.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="text-sm">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-muted-foreground">{c.day}, {c.period}</p>
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
                    <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] min-w-[700px]">
                        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20"></div>
                        {daysOfWeek.map(day => (
                            <div key={day} className="text-center text-sm font-semibold py-2 border-b border-l sticky top-0 bg-background/95 backdrop-blur-sm z-20">
                                {day}
                            </div>
                        ))}
                        {timePeriods.map((period) => (
                             <div key={period.time} className={cn("contents")}>
                                <div className={cn("text-xs text-muted-foreground text-right pr-2 py-4 border-r", !period.isBreak && 'border-t')}>
                                    <p className="font-medium">{period.name}</p>
                                    <p>{period.time}</p>
                                </div>
                                {daysOfWeek.map(day => {
                                    if (period.isBreak) {
                                        return (
                                            <div key={`${day}-${period.time}`} className="bg-muted/50 border-l flex items-center justify-center">
                                                {day === 'Saturday' && <div className="text-sm font-semibold text-muted-foreground -rotate-90 whitespace-nowrap">LUNCH</div>}
                                            </div>
                                        )
                                    }
                                    const classItem = classes.find(c => c.day === day && c.period === period.time);
                                    const courseNameIndex = classItem ? uniqueCourseNames.indexOf(classItem.name) : -1;
                                    
                                    return (
                                        <div key={`${day}-${period.time}`} className="border-l border-t p-1 min-h-[90px]">
                                            {classItem && <ClassCard classItem={classItem} colorIndex={courseNameIndex} />}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
