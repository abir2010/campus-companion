
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useId, useMemo, type FormEvent } from "react";
import { PlusCircle, Trash2, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Class = {
  id: string;
  name: string;
  teacher: string;
  section: string;
  roomNumber: string;
  day: string;
  period: string; 
};

type Slot = {
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
            <div className="text-xs opacity-80 mt-auto flex justify-between">
              <span>Sec: {classItem.section}</span>
              <span>Room: {classItem.roomNumber}</span>
            </div>
        </div>
    );
};


export default function RoutineMakerPage() {
  const [classes, setClasses] = useState<Class[]>([
    { id: '1', name: 'Software Engineering', teacher: 'Dr. Grace Hopper', section: 'A', roomNumber: 'CS-501', day: 'Monday', period: '10:40 - 11:30' },
    { id: '1-2', name: 'Software Engineering', teacher: 'Dr. Grace Hopper', section: 'A', roomNumber: 'CS-501', day: 'Wednesday', period: '12:20 - 13:10' },
    { id: '2', name: 'Algorithms', teacher: 'Dr. Ada Lovelace', section: 'B', roomNumber: 'CS-502', day: 'Wednesday', period: '13:50 - 14:40' },
    { id: '3', name: 'Data Structures', teacher: 'Dr. Alan Turing', section: 'A', roomNumber: 'CS-501', day: 'Tuesday', period: '11:30 - 12:20' },
  ]);

  const [courseName, setCourseName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [section, setSection] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [slots, setSlots] = useState<Slot[]>([]);
  
  const [currentDay, setCurrentDay] = useState('Saturday');
  const [currentPeriod, setCurrentPeriod] = useState(classPeriods[0].time);
  
  const formId = useId();

  const handleAddSlot = () => {
    const isSlotTakenInGrid = classes.some(c => c.day === currentDay && c.period === currentPeriod);
    if (isSlotTakenInGrid) {
      alert(`There is already a class scheduled for ${currentDay} during ${currentPeriod} in your main routine.`);
      return;
    }
    
    const isSlotTakenInCurrentList = slots.some(s => s.day === currentDay && s.period === currentPeriod);
    if (isSlotTakenInCurrentList) {
      alert(`You have already added this time slot for the current course.`);
      return;
    }

    setSlots(prev => [...prev, { day: currentDay, period: currentPeriod }]);
  };
  
  const handleRemoveSlot = (index: number) => {
    setSlots(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddCourse = (e: FormEvent) => {
    e.preventDefault();
    if (!courseName || !teacher || !section || !roomNumber || slots.length === 0) {
      alert("Please provide a course name, teacher, section, room number, and at least one time slot.");
      return;
    }

    const newClasses: Class[] = slots.map((slot, i) => ({
      id: `${Date.now()}-${i}`,
      name: courseName,
      teacher: teacher,
      section: section,
      roomNumber: roomNumber,
      ...slot
    }));

    setClasses(prev => [...prev, ...newClasses]);
    
    // Reset form
    setCourseName('');
    setTeacher('');
    setSection('');
    setRoomNumber('');
    setSlots([]);
  };

  const handleRemoveCourse = (courseName: string, teacher: string, section: string, roomNumber: string) => {
    setClasses(prev => prev.filter(c => !(
        c.name === courseName && 
        c.teacher === teacher &&
        c.section === section &&
        c.roomNumber === roomNumber
    )));
  };

  const uniqueCourseNames = [...new Set(classes.map(c => c.name))];
  
  const groupedClasses = useMemo(() => {
    return classes.reduce((acc, c) => {
        const key = `${c.name}|${c.teacher}|${c.section}|${c.roomNumber}`;
        if (!acc[key]) {
            acc[key] = { name: c.name, teacher: c.teacher, section: c.section, roomNumber: c.roomNumber, schedules: [] };
        }
        acc[key].schedules.push({ id: c.id, day: c.day, period: c.period });
        // Sort schedules for consistent display
        acc[key].schedules.sort((a,b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day) || a.period.localeCompare(b.period));
        return acc;
    }, {} as Record<string, {name: string, teacher: string, section: string, roomNumber: string, schedules: {id: string, day: string, period: string}[]}>);
  }, [classes]);

  const courseList = Object.values(groupedClasses);

  const handleDownloadPdf = async () => {
    const getPrintableHtml = (classes: Class[], uniqueCourseNames: string[]): string => {
        const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        const accentForeground = getComputedStyle(document.documentElement).getPropertyValue('--accent-foreground').trim();
        const chart1 = getComputedStyle(document.documentElement).getPropertyValue('--chart-1').trim();
        const chart2 = getComputedStyle(document.documentElement).getPropertyValue('--chart-2').trim();
        const chart4 = getComputedStyle(document.documentElement).getPropertyValue('--chart-4').trim();
        const chart5 = getComputedStyle(document.documentElement).getPropertyValue('--chart-5').trim();
        const background = getComputedStyle(document.documentElement).getPropertyValue('--card').trim();
        const foreground = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim();
        const mutedForeground = getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground').trim();
        const border = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
        const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim();

        const colorSchemes = [
            { bg: `hsl(${primary} / 0.1)`, border: `hsl(${primary} / 0.4)`, text: `hsl(${primary})`},
            { bg: `hsl(${accent} / 0.15)`, border: `hsl(${accent} / 0.4)`, text: `hsl(${accentForeground})`},
            { bg: `hsl(${chart1} / 0.1)`, border: `hsl(${chart1} / 0.4)`, text: `hsl(${chart1})`},
            { bg: `hsl(${chart2} / 0.1)`, border: `hsl(${chart2} / 0.4)`, text: `hsl(${chart2})`},
            { bg: `hsl(${chart4} / 0.1)`, border: `hsl(${chart4} / 0.4)`, text: `hsl(${chart4})`},
            { bg: `hsl(${chart5} / 0.1)`, border: `hsl(${chart5} / 0.4)`, text: `hsl(${chart5})`},
        ];

        let courseStyles = '';
        uniqueCourseNames.forEach((name, index) => {
            const scheme = colorSchemes[index % colorSchemes.length];
            const className = `course-color-${index}`;
            courseStyles += `
                .${className} {
                    background-color: ${scheme.bg} !important;
                    border-color: ${scheme.border} !important;
                    color: ${scheme.text} !important;
                }
            `;
        });

        const baseCss = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap');
            body {
                font-family: 'Inter', sans-serif;
                margin: 0;
                padding: 0;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .page {
                width: 297mm;
                height: 210mm;
                margin: auto;
                background: white;
                padding: 0.75cm;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
            }
            @page { size: A4 landscape; margin: 0; }

            .routine-table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
            }

            .routine-table th, .routine-table td {
                border: 1px solid hsl(${border});
                text-align: center;
            }

            .routine-table th {
                background-color: hsl(${muted}) !important;
                font-weight: 600;
                font-size: 13px;
                color: hsl(${foreground});
                padding: 6px;
            }
            
            .time-cell {
                font-size: 10px;
                font-weight: 500;
                color: hsl(${mutedForeground});
                width: 90px;
                vertical-align: middle;
                padding: 4px;
            }
            .time-cell p { margin: 0; }

            .class-cell {
                padding: 2px;
                height: 80px;
            }

            .class-card {
                padding: 4px;
                border-radius: 4px;
                height: 100%;
                width: 100%;
                border: 1px solid;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                text-align: left;
                font-size: 11px;
                box-sizing: border-box;
            }
            
            .class-card .course-name { font-weight: 700; font-size: 12px; line-height: 1.2; white-space: normal; }
            .class-card .teacher-name { font-size: 10px; opacity: 0.8; }
            .class-card .details { font-size: 10px; opacity: 0.8; margin-top: auto; display: flex; justify-content: space-between; }
            
            .lunch-cell {
                background-color: hsl(${muted}) !important;
                font-weight: 600;
                font-size: 14px;
                color: hsl(${mutedForeground});
                vertical-align: middle;
            }
            
            h1 {
                font-family: 'Space Grotesk', sans-serif;
                text-align: center;
                margin-bottom: 15px;
                font-size: 22pt;
            }
            ${courseStyles}
        `;

        let tableHtml = `<table class="routine-table"><thead><tr><th class="time-cell"></th>`;
        daysOfWeek.forEach(day => {
            tableHtml += `<th>${day}</th>`;
        });
        tableHtml += `</tr></thead><tbody>`;
        
        timePeriods.forEach(period => {
            tableHtml += `<tr>`;
            if (period.isBreak) {
                tableHtml += `<td class="time-cell"><p class="font-semibold">${period.name}</p><p>${period.time}</p></td>`;
                tableHtml += `<td class="lunch-cell" colspan="${daysOfWeek.length}">LUNCH</td>`;
            } else {
                 tableHtml += `<td class="time-cell"><p class="font-semibold">${period.name}</p><p>${period.time}</p></td>`;
                daysOfWeek.forEach(day => {
                    const classItem = classes.find(c => c.day === day && c.period === period.time);
                    tableHtml += `<td class="class-cell">`;
                    if (classItem) {
                        const courseNameIndex = uniqueCourseNames.indexOf(classItem.name);
                        tableHtml += `
                            <div class="class-card course-color-${courseNameIndex}">
                                <p class="course-name">${classItem.name}</p>
                                <p class="teacher-name">${classItem.teacher}</p>
                                <div class="details">
                                  <span>Sec: ${classItem.section}</span>
                                  <span>Room: ${classItem.roomNumber}</span>
                                </div>
                            </div>
                        `;
                    }
                    tableHtml += `</td>`;
                });
            }
            tableHtml += `</tr>`;
        });
        
        tableHtml += `</tbody></table>`;
        
        return `
            <html>
                <head>
                    <title>Weekly Class Routine</title>
                    <style>${baseCss}</style>
                </head>
                <body>
                    <div class="page">
                        <h1>Weekly Class Routine</h1>
                        ${tableHtml}
                    </div>
                </body>
            </html>
        `;
    };

    const printableHtml = getPrintableHtml(classes, uniqueCourseNames);
    
    const printContainer = document.createElement('div');
    printContainer.innerHTML = printableHtml;
    
    const pageToPrint = printContainer.querySelector('.page') as HTMLElement;
    if (!pageToPrint) {
        alert("Failed to create printable version of the routine.");
        return;
    }

    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.top = '0';
    
    document.body.appendChild(printContainer);

    try {
        const canvas = await html2canvas(pageToPrint, {
            scale: 2,
            useCORS: true,
            width: pageToPrint.offsetWidth,
            height: pageToPrint.offsetHeight,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('class-routine.pdf');

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("An error occurred while generating the PDF. Please try again.");
    } finally {
       document.body.removeChild(printContainer);
    }
  };


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
              <CardTitle>Add Course</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor={`${formId}-name`}>Course Name</Label>
                  <Input id={`${formId}-name`} name="name" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g., Calculus I" required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`${formId}-teacher`}>Teacher</Label>
                  <Input id={`${formId}-teacher`} name="teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="e.g., Prof. Einstein" required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`${formId}-section`}>Section</Label>
                  <Input id={`${formId}-section`} name="section" value={section} onChange={(e) => setSection(e.target.value)} placeholder="e.g., A" required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`${formId}-room`}>Room Number</Label>
                  <Input id={`${formId}-room`} name="room" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="e.g., 501" required/>
                </div>
                
                <Separator />

                <div className="space-y-2">
                    <Label>Time Slots</Label>
                    <div className="space-y-2 rounded-md bg-muted/50 p-2">
                      {slots.length > 0 ? (
                        slots.map((slot, index) => (
                          <div key={index} className="flex items-center justify-between text-sm bg-background p-2 rounded-md">
                            <span>{slot.day}, {slot.period}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveSlot(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-center text-muted-foreground py-2">No time slots added.</p>
                      )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
                    <div className="space-y-1">
                      <Label>Day</Label>
                      <Select name="day" value={currentDay} onValueChange={setCurrentDay}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Period</Label>
                      <Select name="period" value={currentPeriod} onValueChange={setCurrentPeriod}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                          {classPeriods.map(p => <SelectItem key={p.time} value={p.time}>{p.name} ({p.time})</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                </div>
                 <Button type="button" variant="outline" className="w-full" onClick={handleAddSlot}>
                    Add Time Slot
                </Button>

                <Separator />

                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Course to Routine
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Course List</CardTitle>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {courseList.length > 0 ? courseList.map(course => (
                  <div key={`${course.name}-${course.teacher}-${course.section}-${course.roomNumber}`} className="p-3 rounded-md bg-muted/50 text-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-semibold">{course.name}</p>
                            <p className="text-muted-foreground text-xs">{course.teacher}</p>
                            <p className="text-muted-foreground text-xs">Sec: {course.section}, Room: {course.roomNumber}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveCourse(course.name, course.teacher, course.section, course.roomNumber)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                    <div className="mt-2 space-y-1 pl-2 border-l-2 border-primary/20">
                      {course.schedules.map(sch => (
                         <p key={sch.id} className="text-xs text-muted-foreground">{sch.day}, {sch.period}</p>
                      ))}
                    </div>
                  </div>
                )) : <p className="text-sm text-muted-foreground text-center py-4">No courses added yet.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Your Weekly Routine</CardTitle>
                    <Button onClick={handleDownloadPdf} variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
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
                                                    {day === 'Monday' && <div className="text-sm font-semibold text-muted-foreground -rotate-90 whitespace-nowrap">LUNCH</div>}
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
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
