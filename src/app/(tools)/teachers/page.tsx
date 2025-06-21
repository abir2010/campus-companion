'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Building, Mail, User, Clock, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const facultyData = [
  { name: "Dr. Alan Turing", department: "Computer Science", email: "alan.t@university.edu", office: "CS-101", hours: "Mon 10-12" },
  { name: "Dr. Marie Curie", department: "Physics", email: "marie.c@university.edu", office: "PHY-205", hours: "Wed 1-3" },
  { name: "Dr. Ada Lovelace", department: "Computer Science", email: "ada.l@university.edu", office: "CS-102", hours: "Tue 2-4" },
  { name: "Dr. Albert Einstein", department: "Physics", email: "albert.e@university.edu", office: "PHY-301", hours: "Fri 11-1" },
  { name: "Dr. Grace Hopper", department: "Computer Science", email: "grace.h@university.edu", office: "CS-310", hours: "Thu 9-11" },
  { name: "Prof. Jane Austen", department: "English Literature", email: "jane.a@university.edu", office: "LIT-404", hours: "Mon 2-4" },
];

const departments = ["All Departments", ...Array.from(new Set(facultyData.map(f => f.department)))];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const filteredFaculty = useMemo(() => {
    return facultyData
      .filter(faculty => 
        selectedDepartment === "All Departments" || faculty.department === selectedDepartment
      )
      .filter(faculty =>
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedDepartment]);

  return (
    <div>
      <PageHeader
        title="Faculty Directory"
        description="Search for faculty members by name and filter by department."
      />
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> {faculty.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Building className="h-4 w-4" /> {faculty.department}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${faculty.email}`} className="text-primary hover:underline">{faculty.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>Office: {faculty.office}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Hours: {faculty.hours}</span>
              </div>
            </CardContent>
          </Card>
        ))}
         {filteredFaculty.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-8">No faculty members found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
