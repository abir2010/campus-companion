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
  'A+': 4.00,
  'A': 3.75,
  'A-': 3.50,
  'B+': 3.25,
  'B': 3.00,
  'B-': 2.75,
  'C+': 2.50,
  'C': 2.25,
  'D': 2.00,
  'F': 0.00,
};

const gradingScale = [
  { marks: "80% or above", grade: "A+", points: 4.00, remarks: "Excellent" },
  { marks: "75% to less than 80%", grade: "A", points: 3.75, remarks: "Very Good" },
  { marks: "70% to less than 75%", grade: "A-", points: 3.50, remarks: "" },
  { marks: "65% to less than 70%", grade: "B+", points: 3.25, remarks: "Good" },
  { marks: "60% to less than 65%", grade: "B", points: 3.00, remarks: "" },
  { marks: "55% to less than 60%", grade: "B-", points: 2.75, remarks: "Satisfactory" },
  { marks: "50% to less than 55%", grade: "C+", points: 2.50, remarks: "" },
  { marks: "45% to less than 50%", grade: "C", points: 2.25, remarks: "Pass" },
  { marks: "40% to less than 45%", grade: "D", points: 2.00, remarks: "" },
  { marks: "less than 40%", grade: "F", points: 0.00, remarks: "Fail" },
];

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
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Official Grading Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marks (%)</TableHead>
                <TableHead>Letter Grade</TableHead>
                <TableHead>Grade Points</TableHead>
                <TableHead>Remarks/Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradingScale.map((item) => (
                <TableRow key={item.grade}>
                  <TableCell>{item.marks}</TableCell>
                  <TableCell className="font-medium">{item.grade}</TableCell>
                  <TableCell>{item.points.toFixed(2)}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
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
