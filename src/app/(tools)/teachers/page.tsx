'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Building, Mail, User, Clock, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const facultyData = [
  // Computer Science & Engineering
  { name: "Dr. Mohammed Mosin", department: "Computer Science & Engineering", email: "m.mosin@iiuc.ac.bd", office: "CSE-101", hours: "Sat 11-1" },
  { name: "Dr. Md. Razu Ahmed", department: "Computer Science & Engineering", email: "razu.ahmed@iiuc.ac.bd", office: "CSE-102", hours: "Sun 10-12" },
  { name: "Shahariar Shofiq", department: "Computer Science & Engineering", email: "s.shofiq@iiuc.ac.bd", office: "CSE-103", hours: "Mon 1-3" },
  { name: "Md. Adnan Talukder", department: "Computer Science & Engineering", email: "adnan.t@iiuc.ac.bd", office: "CSE-104", hours: "Tue 2-4" },
  { name: "A B M ISMAIL HOSSAIN", department: "Computer Science & Engineering", email: "ismail.h@iiuc.ac.bd", office: "CSE-105", hours: "Wed 9-11" },
  { name: "Md. Monjurul Islam", department: "Computer Science & Engineering", email: "monjurul.i@iiuc.ac.bd", office: "CSE-201", hours: "Sat 1-3" },
  { name: "Md. Shafiul Alam", department: "Computer Science & Engineering", email: "shafiul.a@iiuc.ac.bd", office: "CSE-202", hours: "Sun 2-4" },
  { name: "Md. Kamrul Huda", department: "Computer Science & Engineering", email: "kamrul.h@iiuc.ac.bd", office: "CSE-203", hours: "Mon 10-12" },
  { name: "Md. Jahidul Islam", department: "Computer Science & Engineering", email: "jahidul.i@iiuc.ac.bd", office: "CSE-204", hours: "Tue 11-1" },
  { name: "Ahmadul Hoque", department: "Computer Science & Engineering", email: "ahmadul.h@iiuc.ac.bd", office: "CSE-205", hours: "Wed 1-3" },
  { name: "Syed Akhter Hossain", department: "Computer Science & Engineering", email: "akhter.h@iiuc.ac.bd", office: "On Leave", hours: "On Leave" },
  { name: "Md. Nurul Huda", department: "Computer Science & Engineering", email: "nurul.h@iiuc.ac.bd", office: "On Leave", hours: "On Leave" },
  { name: "Mohammed Shamsul Alam", department: "Computer Science & Engineering", email: "shamsul.a@iiuc.ac.bd", office: "CSE-301", hours: "Sat 10-12" },
  { name: "Engr. Delwar Hossain", department: "Computer Science & Engineering", email: "delwar.h@iiuc.ac.bd", office: "CSE-302", hours: "Sun 1-3" },
  { name: "Md. Touhidul Islam", department: "Computer Science & Engineering", email: "touhidul.i@iiuc.ac.bd", office: "CSE-303", hours: "Mon 2-4" },
  { name: "Syeda Rasheda Sultana", department: "Computer Science & Engineering", email: "rasheda.s@iiuc.ac.bd", office: "CSE-304", hours: "Tue 9-11" },
  { name: "Md. Harunar Rashid", department: "Computer Science & Engineering", email: "harunar.r@iiuc.ac.bd", office: "CSE-305", hours: "Wed 10-12" },
  { name: "Mohammed Mahfuzul Islam", department: "Computer Science & Engineering", email: "mahfuzul.i@iiuc.ac.bd", office: "CSE-401", hours: "Sat 2-4" },
  { name: "Md. Faisal Ibn-e-Elahi", department: "Computer Science & Engineering", email: "faisal.e@iiuc.ac.bd", office: "CSE-402", hours: "Sun 9-11" },
  { name: "Engr. Faisal Ahammed", department: "Computer Science & Engineering", email: "faisal.a@iiuc.ac.bd", office: "CSE-403", hours: "Mon 11-1" },
  { name: "Mohammed Ashraful Islam", department: "Computer Science & Engineering", email: "ashraful.i@iiuc.ac.bd", office: "CSE-404", hours: "Tue 1-3" },
  { name: "Jannatul Ferdaws", department: "Computer Science & Engineering", email: "jannatul.f@iiuc.ac.bd", office: "CSE-405", hours: "Wed 2-4" },
  { name: "Mohammad Asif Hossain", department: "Computer Science & Engineering", email: "asif.h@iiuc.ac.bd", office: "CSE-501", hours: "Sat 9-11" },
  { name: "Jaber Al-Amin", department: "Computer Science & Engineering", email: "jaber.a@iiuc.ac.bd", office: "CSE-502", hours: "Sun 11-1" },
  { name: "A.K.M. Zaforullah", department: "Computer Science & Engineering", email: "zaforullah@iiuc.ac.bd", office: "CSE-503", hours: "Mon 1-3" },
  { name: "Saadia Binta Hasan", department: "Computer Science & Engineering", email: "saadia.h@iiuc.ac.bd", office: "CSE-504", hours: "Tue 10-12" },
  { name: "Md. Solaiman", department: "Computer Science & Engineering", email: "solaiman@iiuc.ac.bd", office: "CSE-505", hours: "Wed 11-1" },
  { name: "Mahbubul Alam", department: "Computer Science & Engineering", email: "mahbubul.a@iiuc.ac.bd", office: "CSE-601", hours: "By Appointment" },
  { name: "Arif Mohammad Tanvir", department: "Computer Science & Engineering", email: "arif.t@iiuc.ac.bd", office: "CSE-602", hours: "By Appointment" },
  { name: "Sabiha Ahmed", department: "Computer Science & Engineering", email: "sabiha.a@iiuc.ac.bd", office: "CSE-603", hours: "By Appointment" },
  { name: "Md. Nazmul Hasan", department: "Computer Science & Engineering", email: "nazmul.h@iiuc.ac.bd", office: "CSE-604", hours: "By Appointment" },
  { name: "Nazifa Tabassum", department: "Computer Science & Engineering", email: "nazifa.t@iiuc.ac.bd", office: "CSE-605", hours: "By Appointment" },
  { name: "Anika Tahsin", department: "Computer Science & Engineering", email: "anika.t@iiuc.ac.bd", office: "CSE-701", hours: "By Appointment" },
  { name: "Samia Zaman", department: "Computer Science & Engineering", email: "samia.z@iiuc.ac.bd", office: "CSE-702", hours: "By Appointment" },
  { name: "Nowshin Tabassum", department: "Computer Science & Engineering", email: "nowshin.t@iiuc.ac.bd", office: "CSE-703", hours: "By Appointment" },
  { name: "Nusrat Jahan", department: "Computer Science & Engineering", email: "nusrat.j@iiuc.ac.bd", office: "CSE-704", hours: "By Appointment" },
  { name: "Syed Abu Noman", department: "Computer Science & Engineering", email: "abu.noman@iiuc.ac.bd", office: "CSE-705", hours: "By Appointment" },
  { name: "Raihan Uddin", department: "Computer Science & Engineering", email: "raihan.u@iiuc.ac.bd", office: "CSE-801", hours: "By Appointment" },
  { name: "Md. Mehedi Hasan", department: "Computer Science & Engineering", email: "mehedi.h@iiuc.ac.bd", office: "CSE-802", hours: "By Appointment" },
  { name: "Tasfiqul Ghani", department: "Computer Science & Engineering", email: "tasfiqul.g@iiuc.ac.bd", office: "CSE-803", hours: "By Appointment" },
  { name: "Jannatul Naeem", department: "Computer Science & Engineering", email: "jannatul.n@iiuc.ac.bd", office: "CSE-804", hours: "By Appointment" },
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
