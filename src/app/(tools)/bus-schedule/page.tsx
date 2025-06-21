
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const cityToUniversityData = [
    { sl: 1, time: "6:40 a.m.", startingPoint: "Baroyar Hat", route: "BaroyarHat- Mirsharai- Borodarghahat-Sitakunda-IIUC", remarks: "For Female Students" },
    { sl: 2, time: "6:45 a.m.", startingPoint: "Hathazari College", route: "Hathazari College-Borodighirpar- Baizid Link Road-IIUC", remarks: "For Female Students" },
    { sl: 3, time: "6:50 a.m.", startingPoint: "DidarMarket", route: "Didar Market-Kotowali- Kadamtali- Dewan Hat-IIUC", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "Miler matha", route: "Miler matha- Port Market- Toll Road- Fouzder Hat-IIUC", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "Navy Hospital Gate", route: "Navy Hospital Gate-Sea beach-Jele para-Akmol All Ghat-IIUC.", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "BOT", route: "BOT- Muradpur-2 no gate Balzid Link Road - IIUC.", remarks: "For Female Students" },
    { sl: 4, time: "7:00 a.m.", startingPoint: "Shah Amanath", route: "Shah Amanath Bridge-Bohoddarhat Flyover-Shulokbahor-B.link", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "Chatteswari", route: "Chatteswari Road-GEC-2 no gate- Balzld Link Road - IIUC.", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "Kotowali", route: "Kotowali- Kadamtali- Dewan Hat- Alanker -IIUC", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "Lucky Plaza", route: "Agrabad-Boropool-Noyabazar- AK Khan - IIUC.", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "Kaptai Rastar", route: "Kaptai Rastar Matha-BOT-2 no gate - Balzid Link Road - IHUC.", remarks: "For Female Students" },
    { sl: '', time: '', startingPoint: "Gec circle", route: "Gec circle-Wireless-Foy's lake -AK Khan- HUC.", remarks: "For Female Students" },
    { sl: 5, time: "7:10 a.m.", startingPoint: "Oxygen Moor", route: "Oxygen- Balzid Link Road-IIUC", remarks: "For Female Students" },
    { sl: 6, time: "7:25 a.m.", startingPoint: "KoibolyoDham", route: "KoibolyoDham-HUC.", remarks: "For Female Students" },
    { sl: 7, time: "8.30 a.m.", startingPoint: "CUET", route: "CUET Gate-Kuwaish-Oxygen-IIUC", remarks: "For Male Students" },
    { sl: 8, time: "9:00 a.m.", startingPoint: "Hathazari College", route: "Hathazari College-Borodighirpar- Baizid Link Road-IIUC", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "Navy Hospital Gate", route: "Navy Hospital Gate-Sea beach-Jele para-Akmol All Ghat-IIUC.", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "Miler matha", route: "Miler matha- Port Market- Toll Road- Fouzder Hat-IIUC", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "BaroyarHat", route: "BaroyarHat- Mirsharai- Borodarghahat-Sitakunda-IIUC", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "Shah Amanath", route: "Shah Amanath Bridge-Bohoddarhat Flyover-Shulokbohor-Baizid", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "BOT", route: "BOT (Bahaddarhat)- Muradpur-2 no gate Baizid Link Road -", remarks: "For Male Students" },
    { sl: 9, time: "9:05 a.m.", startingPoint: "Chatteswari", route: "Chatteswari Road-GEC-2 no gate Baizid Link Road - HUC.", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "Kotowali", route: "Kotowali-Kadamtali-Dewan Hat- Alanker-IIUC", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "Lucky Plaza", route: "Agrabad-Boropool-Noyabazar- AK Khan - IIUC.", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "Kaptai Rastar", route: "Kaptai Rastar Matha-BOT-2 no gate - Balzid Link Road - Iluc.", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "GEC circle", route: "GEC circle-Wireless-Foy's lake-AK Khan- IIUC.", remarks: "For Male Students" },
    { sl: 10, time: "9:25 a.m.", startingPoint: "Oxygen Moor", route: "Oxygen- Baizid Link Road- IIUC", remarks: "For Male Students" },
    { sl: 11, time: "9:45 a.m.", startingPoint: "Sitakunda", route: "Sitakunda-Barobkunda-Kumira-Joramtol-IIUC", remarks: "For Male Students" },
    { sl: 12, time: "9:35 a.m.", startingPoint: "KoibolyoDham", route: "KoibolyoDham- HUC.", remarks: "For Male Students" },
    { sl: 13, time: "11:50 a.m.", startingPoint: "Mayor goli", route: "Mayor goli-Baizid Link Road-Fouzdarhat- IIUC.", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "Boropul", route: "Boropul-Noyabazar-IIUC.", remarks: "For Male Students" },
    { sl: 14, time: "12:45 p.m.", startingPoint: "Mayor goll", route: "Mayor goli -Baizid Link Road-Fouzdarhat- IIUC.", remarks: "For Male Students" },
    { sl: '', time: '', startingPoint: "KoibolvoDham", route: "KoibolvoDham- IHUC.", remarks: "For Male Students" },
];

const universityToCityData = [
    { sl: 1, time: "11:00 a.m.", description: "Shuttle bus for Female students", route: "IIUC-KoibolvoDham-Novabazar-Boropul", endPoint: "Boropul" },
    { sl: '', time: '', description: "", route: "IIUC-Balzid Link Road-SherShah-Mayor Goll", endPoint: "Mayor Goli" },
    { sl: '', time: '', description: "", route: "HUC-KoibolvoDham-Noyabazar", endPoint: "NoyaBazar" },
    { sl: 2, time: "11:45 a.m.", description: "Shuttle bus for Female students", route: "IIUC-Sitakundo-Borodargahat-Mirshorai", endPoint: "Mirshoral" },
    { sl: '', time: '', description: "", route: "IIUC-Balzid Link Road-SherShah-Mayor Goll", endPoint: "Mayor Goli" },
    { sl: 3, time: "12:15 p.m.", description: "Shuttle bus for Male students", route: "IIUC-Ak khan-Sagorika", endPoint: "Sagorika" },
    { sl: '', time: '', description: "", route: "IIUC-Balzid Unk Road-Mayor Goll", endPoint: "Mayor Goli" },
    { sl: 4, time: "01:30 p.m.", description: "For Female Students", route: "All approved Routes", endPoint: "All points" },
    { sl: 5, time: "01:40 p.m.", description: "For Male students", route: "All approved Routes (except Cuet gate)", endPoint: "All points" },
    { sl: 6, time: "02:55 p.m.", description: "Shuttle bus for Male students", route: "IIUC-KoibolyoDham-Noyabazar", endPoint: "Nayabazar" },
    { sl: '', time: '', description: "", route: "IIUC-Balzid Link Road-SherShah- Mayor Goli", endPoint: "Mayor Goli" },
    { sl: 7, time: "04:35 p.m.", description: "For Male Students", route: "All approved Routes", endPoint: "All points" },
];

const fridayCityToUniversity = [
    { sl: 1, time: "7:30 a.m.", busNumber: "IIUC/HB", startingPoint: "BOT", route: "BOT-Chatteswari-WASA-Wireless-AK Khan-IIUC", remarks: "For ministerial staff" },
    { sl: 2, time: "7:45 a.m.", busNumber: "IIUC/HB", startingPoint: "BOT", route: "BOT-Muradpur-2 no gate-Baizid link road-IIUC.", remarks: "For all" },
    { sl: '', time: '', busNumber: "IIUC/HB", startingPoint: "Agrabad", route: "Agrabad-Baro Pul-AK Khan-IIUC", remarks: "" },
    { sl: '', time: '', busNumber: "IIUC/HB", startingPoint: "Kotawali", route: "Kotowali-Kadamtali- Dewan Hat-Alanker-IIUC", remarks: "" },
    { sl: '', time: '', busNumber: "IIUC/HB", startingPoint: "Chawakbazar", route: "Chatteswari Road-WASA-Wireless-AK Khan-IIUC", remarks: "" },
    { sl: '', time: '', busNumber: "IIUC/HB", startingPoint: "Baroyerhat", route: "Baroyerhat-Mirsharai-Sitakunda-IIUC", remarks: "" },
    { sl: '', time: '', busNumber: "IIUC Bus", startingPoint: "Oxygen", route: "Oxygen-Baizid-Shershah--IIUC", remarks: "For all" },
    { sl: 3, time: "8:00 a.m.", busNumber: "AC Bus", startingPoint: "Chawakbazar", route: "Keari Elysium-Chatteswari Road-WASA-AK Khan -HUC", remarks: "Teachers" },
    { sl: '', time: '', busNumber: "AC Bus", startingPoint: "BOT", route: "BOT-Muradpur-2 no gate-Baizid link road-IIUC", remarks: "Teachers" },
    { sl: '', time: '', busNumber: "IIUC Bus", startingPoint: "Agrabad", route: "Agrabad-Boropool-AK Khan-IIUC", remarks: "For Teachers and staff" },
    { sl: 4, time: "9:30 a.m.", busNumber: "IIUC Bus", startingPoint: "BOT", route: "BOT-Chatteswari Road WASA-Wireles-AK Khan-IIUC", remarks: "For Teachers and staff" },
    { sl: 5, time: "11:45 p.m.", busNumber: "IIUC Bus", startingPoint: "BOT", route: "BOT-Chatteswari Road-WASA-Wireles-AK Khan-HUC", remarks: "For Teachers, Officer & staff" },
    { sl: 6, time: "9:00 p.m.", busNumber: "IIUC Bus", startingPoint: "Chawakbazar", route: "Chatteswari Road- WASA- Khulshi-Wireles-AK Khan- HUC", remarks: "For the Residents of IIUC" },
];

const fridayUniversityToCity = [
    { sl: 1, time: "12:10 p.m.", busNumber: "IIUC Bus", route: "IIUC-AK Khan-Wireles-Khulshi-WASA-Chatteswari Road", endPoint: "Chatteswari Road", remarks: "Students" },
    { sl: '', time: '', busNumber: "IIUC Bus", route: "IIUC-Baizid link road-2 no gate-Muradpur-BOT", endPoint: "BOT", remarks: "Teachers" },
    { sl: '', time: '', busNumber: "AC Bus", route: "IIUC-AK Khan-Wireles- Khulshi-WASA-Chatteswari Road- BOT", endPoint: "BOT", remarks: "Teachers" },
    { sl: 2, time: "2:00 p.m.", busNumber: "IIUC & H.B", route: "IIUC-AK Khan-Wireles-Khulshi-WASA-Chatteswari Road", endPoint: "Chatteswari Road", remarks: "For all" },
    { sl: '', time: '', busNumber: "IIUC & H.B", route: "IIUC-Baizid link road-2 no gate- Muradpur-BOT", endPoint: "BOT", remarks: "" },
    { sl: '', time: '', busNumber: "IIUC & H.B", route: "IIUC-AK Khan-Nayabazar- Agrabad", endPoint: "Agrabad", remarks: "" },
    { sl: 3, time: "4:15 p.m.", busNumber: "IIUC Bus", route: "IIUC-AK Khan-Wireles-Khulshi-WASA-Chatteswari Road", endPoint: "Chatteswari Road", remarks: "Students" },
    { sl: '', time: '', busNumber: "", route: "IIUC-Baizid link road-2 no gate- Muradpur-BOT", endPoint: "BOT", remarks: "Teachers" },
    { sl: '', time: '', busNumber: "AC Bus", route: "IIUC-AK Khan-Wireles-Khulshi - WASA-Chatteswari Road-BOT", endPoint: "BOT", remarks: "Teachers" },
    { sl: 4, time: "6:15 p.m.", busNumber: "IIUC & H.B", route: "IIUC-Baizid link road-2 no gate- Muradpur-BOT", endPoint: "BOT", remarks: "For all" },
    { sl: '', time: '', busNumber: "IIUC & H.B", route: "IIUC-AK Khan-Wireles- Khulshi - WASA- Chatteswari Road", endPoint: "Chatteswari Road", remarks: "" },
    { sl: '', time: '', busNumber: "IIUC & H.B", route: "IIUC-AK Khan-Nayabazar- Agrabad", endPoint: "Agrabad", remarks: "" },
    { sl: '', time: '', busNumber: "IIUC & H.B", route: "IIUC-Sitakunda-Mirsharai-Baroyarhat", endPoint: "Baroyerhat", remarks: "" },
];


export default function BusSchedulePage() {
  return (
    <div>
      <PageHeader
        title="Bus Schedule"
        description="Find timetables for all campus bus routes for regular days and Fridays."
      />
      <Tabs defaultValue="regular" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="regular">Regular Days (Sat-Wed)</TabsTrigger>
            <TabsTrigger value="friday">Friday</TabsTrigger>
        </TabsList>
        <TabsContent value="regular" className="mt-4 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>City to University</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>Starting Time</TableHead>
                                <TableHead>Starting Point</TableHead>
                                <TableHead>Route</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cityToUniversityData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.sl}</TableCell>
                                    <TableCell>{item.time}</TableCell>
                                    <TableCell>{item.startingPoint}</TableCell>
                                    <TableCell>{item.route}</TableCell>
                                    <TableCell>
                                      {item.remarks && <Badge variant={item.remarks.includes("Female") ? "default" : "secondary"}>{item.remarks}</Badge>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>University to City</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>Starting Time</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Route</TableHead>
                                <TableHead>End Point</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {universityToCityData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.sl}</TableCell>
                                    <TableCell>{item.time}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.route}</TableCell>
                                    <TableCell>{item.endPoint}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="friday" className="mt-4 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Towards University</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>Starting Time</TableHead>
                                <TableHead>Bus Number</TableHead>
                                <TableHead>Starting Point</TableHead>
                                <TableHead>Route</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fridayCityToUniversity.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.sl}</TableCell>
                                    <TableCell>{item.time}</TableCell>
                                    <TableCell>{item.busNumber}</TableCell>
                                    <TableCell>{item.startingPoint}</TableCell>
                                    <TableCell>{item.route}</TableCell>
                                    <TableCell>
                                      {item.remarks && <Badge>{item.remarks}</Badge>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>From University</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>Starting Time</TableHead>
                                <TableHead>Bus Number</TableHead>
                                <TableHead>Route</TableHead>
                                <TableHead>End Point</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fridayUniversityToCity.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.sl}</TableCell>
                                    <TableCell>{item.time}</TableCell>
                                    <TableCell>{item.busNumber}</TableCell>
                                    <TableCell>{item.route}</TableCell>
                                    <TableCell>{item.endPoint}</TableCell>
                                     <TableCell>
                                      {item.remarks && <Badge>{item.remarks}</Badge>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
