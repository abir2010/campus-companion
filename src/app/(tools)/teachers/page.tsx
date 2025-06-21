
'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Building, Mail, User, Clock, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const facultyData = [
  // Heads
  { name: "Dr. Mohammed Mosin", department: "Computer Science & Engineering", email: "m.mosin@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Dr. Md. Razu Ahmed", department: "Computer Science & Engineering", email: "razu.ahmed@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },

  // Professors
  { name: "Prof. Dr. Shahariar Shofiq", department: "Computer Science & Engineering", email: "s.shofiq@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Adnan Talukder", department: "Computer Science & Engineering", email: "adnan.talukder@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  
  // Associate Professors
  { name: "A B M ISMAIL HOSSAIN", department: "Computer Science & Engineering", email: "abm.ismail@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Monjurul Islam", department: "Computer Science & Engineering", email: "monjurul.i@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Shafiul Alam", department: "Computer Science & Engineering", email: "shafiul.a@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Kamrul Huda", department: "Computer Science & Engineering", email: "kamrul.huda@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Dr. Md. Jahidul Islam", department: "Computer Science & Engineering", email: "jahidul@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Ahmadul Hoque", department: "Computer Science & Engineering", email: "ahmadul.h@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Dr. Syed Akhter Hossain", department: "Computer Science & Engineering", email: "n/a", office: "On Leave", hours: "On Leave" },
  { name: "Md. Nurul Huda", department: "Computer Science & Engineering", email: "n/a", office: "On Leave", hours: "On Leave" },
  
  // Assistant Professors
  { name: "Mohammed Shamsul Alam", department: "Computer Science & Engineering", email: "shamsul.alam@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Engr. Delwar Hossain", department: "Computer Science & Engineering", email: "delwar@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Dr. Md. Touhidul Islam", department: "Computer Science & Engineering", email: "touhid@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Syeda Rasheda Sultana", department: "Computer Science & Engineering", email: "rasheda.s@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Harunar Rashid", department: "Computer Science & Engineering", email: "harunar.r@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Mohammed Mahfuzul Islam", department: "Computer Science & Engineering", email: "mmahfuz@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Dr. Md. Faisal Ibn-e-Elahi", department: "Computer Science & Engineering", email: "faisal.ibne.elahi@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Engr. Faisal Ahammed", department: "Computer Science & Engineering", email: "faisal.ahammed@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Mohammed Ashraful Islam", department: "Computer Science & Engineering", email: "ashraful.i@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Jannatul Ferdaws", department: "Computer Science & Engineering", email: "jannatul.ferdaws@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Mohammad Asif Hossain", department: "Computer Science & Engineering", email: "asif.hossain@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Jaber Al-Amin", department: "Computer Science & Engineering", email: "jaber.alamin@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "A.K.M. Zaforullah", department: "Computer Science & Engineering", email: "zafor.cse@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Saadia Binta Hasan", department: "Computer Science & Engineering", email: "saadia.hasan@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Solaiman", department: "Computer Science & Engineering", email: "m.solaiman@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  
  // Lecturers
  { name: "Mahbubul Alam", department: "Computer Science & Engineering", email: "mahbub.cse@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Arif Mohammad Tanvir", department: "Computer Science & Engineering", email: "arif.m.tanvir@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Sabiha Ahmed", department: "Computer Science & Engineering", email: "sabiha.ahmed@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Nazmul Hasan", department: "Computer Science & Engineering", email: "nazmul.hasan@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Nazifa Tabassum", department: "Computer Science & Engineering", email: "nazifa@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Anika Tahsin", department: "Computer Science & Engineering", email: "anika.tahsin@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Samia Zaman", department: "Computer Science & Engineering", email: "samia.zaman@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Nowshin Tabassum", department: "Computer Science & Engineering", email: "nowshin.tabassum@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Nusrat Jahan", department: "Computer Science & Engineering", email: "nusrat.jahan@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Syed Abu Noman", department: "Computer Science & Engineering", email: "syed.noman@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Raihan Uddin", department: "Computer Science & Engineering", email: "raihan.uddin@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Md. Mehedi Hasan", department: "Computer Science & Engineering", email: "mehedi.hasan@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Tasfiqul Ghani", department: "Computer Science & Engineering", email: "tasfiqul.ghani@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
  { name: "Jannatul Naeem", department: "Computer Science & Engineering", email: "jannatul.naeem@iiuc.ac.bd", office: "CSE Building", hours: "By Appointment" },
];

const departments = ["All Departments", ...Array.from(new Set(facultyData.map(f => f.department)))];

export default function FacultyDirectoryPage() {
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
        {filteredFaculty.map((faculty) => (
          <Card key={faculty.email}>
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

