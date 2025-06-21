'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

type Course = {
  id: number;
  name: string;
  credits: number;
  grade: string;
};

const gradePoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

export default function GpaCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Intro to Programming", credits: 3, grade: "A" },
    { id: 2, name: "Calculus I", credits: 4, grade: "B+" },
  ]);
  const [newCourse, setNewCourse] = useState({ name: "", credits: 3, grade: "A" });
  const [cumulative, setCumulative] = useState({ gpa: 3.5, credits: 60 });

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.credits || !newCourse.grade) return;
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    setNewCourse({ name: "", credits: 3, grade: "A" });
  };

  const handleRemoveCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const { semesterGpa, cumulativeGpa } = useMemo(() => {
    const totalPoints = courses.reduce((acc, course) => acc + (gradePoints[course.grade] * course.credits), 0);
    const totalCredits = courses.reduce((acc, course) => acc + course.credits, 0);
    const semesterGpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

    const totalCumulativePoints = (cumulative.gpa * cumulative.credits) + totalPoints;
    const totalCumulativeCredits = cumulative.credits + totalCredits;
    const cumulativeGpa = totalCumulativeCredits > 0 ? (totalCumulativePoints / totalCumulativeCredits) : 0;

    return {
      semesterGpa: semesterGpa.toFixed(2),
      cumulativeGpa: cumulativeGpa.toFixed(2),
    };
  }, [courses, cumulative]);


  return (
    <div>
      <PageHeader
        title="GPA Calculator"
        description="Calculate your semester and cumulative GPA by adding your courses."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Semester Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map(course => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.grade}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveCourse(course.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 p-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2 space-y-2">
                      <Label>Course Name</Label>
                      <Input value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} placeholder="e.g., World History" />
                  </div>
                   <div className="space-y-2">
                      <Label>Credits</Label>
                      <Input type="number" value={newCourse.credits} onChange={e => setNewCourse({...newCourse, credits: Number(e.target.value)})} />
                  </div>
                   <div className="space-y-2">
                      <Label>Grade</Label>
                      <Select value={newCourse.grade} onValueChange={grade => setNewCourse({...newCourse, grade})}>
                          <SelectTrigger><SelectValue/></SelectTrigger>
                          <SelectContent>
                              {Object.keys(gradePoints).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                          </SelectContent>
                      </Select>
                  </div>
              </div>
            </CardContent>
            <CardFooter>
               <Button onClick={handleAddCourse}><PlusCircle className="mr-2 h-4 w-4"/>Add Course</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Cumulative GPA</CardTitle>
                    <CardDescription>Enter your previous GPA and credits to calculate your new cumulative GPA.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label>Previous Cumulative GPA</Label>
                        <Input type="number" step="0.01" value={cumulative.gpa} onChange={e => setCumulative({...cumulative, gpa: Number(e.target.value)})} />
                    </div>
                     <div className="space-y-2">
                        <Label>Previous Total Credits</Label>
                        <Input type="number" value={cumulative.credits} onChange={e => setCumulative({...cumulative, credits: Number(e.target.value)})} />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Your Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <div className="p-4 rounded-md bg-muted">
                        <p className="text-sm text-muted-foreground">Semester GPA</p>
                        <p className="text-4xl font-bold font-headline text-primary">{semesterGpa}</p>
                    </div>
                     <div className="p-4 rounded-md bg-muted">
                        <p className="text-sm text-muted-foreground">New Cumulative GPA</p>
                        <p className="text-4xl font-bold font-headline text-primary">{cumulativeGpa}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
