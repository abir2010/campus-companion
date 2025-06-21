'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Building, Mail, User, Clock, Search } from "lucide-react";

const teachers = [
  { name: "Dr. Alan Turing", department: "Computer Science", email: "alan.t@university.edu", office: "CS-101", hours: "Mon 10-12" },
  { name: "Dr. Marie Curie", department: "Physics", email: "marie.c@university.edu", office: "PHY-205", hours: "Wed 1-3" },
  { name: "Dr. Ada Lovelace", department: "Computer Science", email: "ada.l@university.edu", office: "CS-102", hours: "Tue 2-4" },
  { name: "Dr. Albert Einstein", department: "Physics", email: "albert.e@university.edu", office: "PHY-301", hours: "Fri 11-1" },
  { name: "Dr. Grace Hopper", department: "Computer Science", email: "grace.h@university.edu", office: "CS-310", hours: "Thu 9-11" },
  { name: "Prof. Jane Austen", department: "English Literature", email: "jane.a@university.edu", office: "LIT-404", hours: "Mon 2-4" },
];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Teacher Directory"
        description="Search for teachers by name or department to find their contact information and office hours."
      />
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search teachers..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> {teacher.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Building className="h-4 w-4" /> {teacher.department}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${teacher.email}`} className="text-primary hover:underline">{teacher.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>Office: {teacher.office}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Hours: {teacher.hours}</span>
              </div>
            </CardContent>
          </Card>
        ))}
         {filteredTeachers.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center">No teachers found for your search.</p>
        )}
      </div>
    </div>
  );
}
