
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState, FormEvent } from "react";

const COST = {
  DC_REGULAR: 2100,
  URC_REGULAR: 1100,
  DC_RETAKE: 1050,
  URC_RETAKE: 550,
  DC_IMPROVEMENT: 2100,
  URC_IMPROVEMENT: 1100,
  SEMESTER_FEE: 14000,
  ESTABLISHMENT_FEE: 4000,
  EXAM_FEE: 0,
};

const initialInputs = {
  semester: "Autumn-2025",
  dcRegular: "0",
  urcRegular: "0",
  dcRetake: "0",
  urcRetake: "0",
  dcImprovement: "0",
  urcImprovement: "0",
  previousDues: "0",
  waiverPercentage: "0",
};

const initialResults = {
  semesterFee: 0,
  totalTuitionFee: 0,
  examFee: 0,
  establishmentFee: 0,
  previousDues: 0,
  totalFee: 0,
  totalWaiver: 0,
  totalPayable: 0,
  installments: [
    { name: "1st Installment (40%)", total: 0, tuitionFee: 0, waiver: 0, payment: 0 },
    { name: "2nd Installment (20%)", total: 0, tuitionFee: 0, waiver: 0, payment: 0 },
    { name: "3rd Installment (40%)", total: 0, tuitionFee: 0, waiver: 0, payment: 0 },
  ],
  tuitionBreakdown: {
    dcRegular: 0,
    urcRegular: 0,
    dcRetake: 0,
    urcRetake: 0,
    dcImprovement: 0,
    urcImprovement: 0,
  },
};

export default function FeeCalculatorPage() {
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState(initialResults);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setInputs(prev => ({ ...prev, semester: value }));
  };

  const calculateFees = (e: FormEvent) => {
    e.preventDefault();

    const parsedInputs = {
        dcRegular: Number(inputs.dcRegular) || 0,
        urcRegular: Number(inputs.urcRegular) || 0,
        dcRetake: Number(inputs.dcRetake) || 0,
        urcRetake: Number(inputs.urcRetake) || 0,
        dcImprovement: Number(inputs.dcImprovement) || 0,
        urcImprovement: Number(inputs.urcImprovement) || 0,
        previousDues: Number(inputs.previousDues) || 0,
        waiverPercentage: Number(inputs.waiverPercentage) || 0,
    };

    const dcRegularTuition = parsedInputs.dcRegular * COST.DC_REGULAR;
    const urcRegularTuition = parsedInputs.urcRegular * COST.URC_REGULAR;
    const dcRetakeTuition = parsedInputs.dcRetake * COST.DC_RETAKE;
    const urcRetakeTuition = parsedInputs.urcRetake * COST.URC_RETAKE;
    const dcImprovementTuition = parsedInputs.dcImprovement * COST.DC_IMPROVEMENT;
    const urcImprovementTuition = parsedInputs.urcImprovement * COST.URC_IMPROVEMENT;

    const totalTuitionFee = dcRegularTuition + urcRegularTuition + dcRetakeTuition + urcRetakeTuition + dcImprovementTuition + urcImprovementTuition;
    const totalFee = COST.SEMESTER_FEE + totalTuitionFee + COST.EXAM_FEE + COST.ESTABLISHMENT_FEE + parsedInputs.previousDues;
    const totalWaiver = totalTuitionFee * (parsedInputs.waiverPercentage / 100);
    const totalPayable = totalFee - totalWaiver;
    
    setResults({
      semesterFee: COST.SEMESTER_FEE,
      totalTuitionFee,
      examFee: COST.EXAM_FEE,
      establishmentFee: COST.ESTABLISHMENT_FEE,
      previousDues: parsedInputs.previousDues,
      totalFee,
      totalWaiver,
      totalPayable,
      installments: [
        { name: "1st Installment (40%)", total: totalPayable * 0.4, tuitionFee: totalTuitionFee * 0.4, waiver: totalWaiver * 0.4, payment: totalPayable * 0.4 },
        { name: "2nd Installment (20%)", total: totalPayable * 0.2, tuitionFee: totalTuitionFee * 0.2, waiver: totalWaiver * 0.2, payment: totalPayable * 0.2 },
        { name: "3rd Installment (40%)", total: totalPayable * 0.4, tuitionFee: totalTuitionFee * 0.4, waiver: totalWaiver * 0.4, payment: totalPayable * 0.4 },
      ],
      tuitionBreakdown: {
        dcRegular: dcRegularTuition,
        urcRegular: urcRegularTuition,
        dcRetake: dcRetakeTuition,
        urcRetake: urcRetakeTuition,
        dcImprovement: dcImprovementTuition,
        urcImprovement: urcImprovementTuition,
      },
    });
  };

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const FeeRow = ({ sl, description, amount, isBold = false }: { sl: string | number; description: React.ReactNode; amount: number; isBold?: boolean }) => (
    <TableRow className={cn(isBold && "font-bold")}>
      <TableCell className="text-center">{sl}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell className="text-right">{currencyFormatter(amount)}</TableCell>
    </TableRow>
  );

  return (
    <div>
      <PageHeader
        title="Fee Calculator"
        description="Estimate your tuition and other fees for the upcoming semester based on the university's structure."
      />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateFees} className="space-y-4">
                <div className="space-y-2">
                  <Label>Semester</Label>
                  <Select name="semester" value={inputs.semester} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spring-2025">Spring-2025</SelectItem>
                      <SelectItem value="Summer-2025">Summer-2025</SelectItem>
                      <SelectItem value="Autumn-2025">Autumn-2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Regular Credit Hours (DC)</Label>
                  <Input type="number" name="dcRegular" value={inputs.dcRegular} onChange={handleInputChange} min="0" step="any" />
                </div>
                <div className="space-y-2">
                  <Label>Regular Credit Hours (URC)</Label>
                  <Input type="number" name="urcRegular" value={inputs.urcRegular} onChange={handleInputChange} min="0" step="any" />
                </div>
                 <div className="space-y-2">
                  <Label>Retake Credit Hours (DC)</Label>
                  <Input type="number" name="dcRetake" value={inputs.dcRetake} onChange={handleInputChange} min="0" step="any" />
                </div>
                <div className="space-y-2">
                  <Label>Retake Credit Hours (URC)</Label>
                  <Input type="number" name="urcRetake" value={inputs.urcRetake} onChange={handleInputChange} min="0" step="any" />
                </div>
                <div className="space-y-2">
                  <Label>Improvement Credit Hours (DC)</Label>
                  <Input type="number" name="dcImprovement" value={inputs.dcImprovement} onChange={handleInputChange} min="0" step="any" />
                </div>
                 <div className="space-y-2">
                  <Label>Improvement Credit Hours (URC)</Label>
                  <Input type="number" name="urcImprovement" value={inputs.urcImprovement} onChange={handleInputChange} min="0" step="any" />
                </div>
                 <div className="space-y-2">
                  <Label>Previous Dues (if any)</Label>
                  <Input type="number" name="previousDues" value={inputs.previousDues} onChange={handleInputChange} min="0" step="any" />
                </div>
                <div className="space-y-2">
                  <Label>Waiver on Tuition Fee (%)</Label>
                  <Input type="number" name="waiverPercentage" value={inputs.waiverPercentage} onChange={handleInputChange} min="0" max="100" step="any" />
                </div>

                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Fee Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16 text-center">SL</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <FeeRow sl={1} description="Semester Fee" amount={results.semesterFee} />
                            <TableRow>
                                <TableCell className="text-center align-top pt-4">2</TableCell>
                                <TableCell>
                                    <div className="font-medium">Total Tuition Fee</div>
                                    <div className="text-xs text-muted-foreground pl-4">
                                        <p>DC Regular ({inputs.dcRegular || 0} X {COST.DC_REGULAR}) = {currencyFormatter(results.tuitionBreakdown.dcRegular)}</p>
                                        <p>URC Regular ({inputs.urcRegular || 0} X {COST.URC_REGULAR}) = {currencyFormatter(results.tuitionBreakdown.urcRegular)}</p>
                                        <p>DC Repeat ({inputs.dcRetake || 0} X {COST.DC_RETAKE}) = {currencyFormatter(results.tuitionBreakdown.dcRetake)}</p>
                                        <p>URC Repeat ({inputs.urcRetake || 0} X {COST.URC_RETAKE}) = {currencyFormatter(results.tuitionBreakdown.urcRetake)}</p>
                                        <p>DC Improvement ({inputs.dcImprovement || 0} X {COST.DC_IMPROVEMENT}) = {currencyFormatter(results.tuitionBreakdown.dcImprovement)}</p>
                                        <p>URC Improvement ({inputs.urcImprovement || 0} X {COST.URC_IMPROVEMENT}) = {currencyFormatter(results.tuitionBreakdown.urcImprovement)}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right align-top pt-4 font-medium">{currencyFormatter(results.totalTuitionFee)}</TableCell>
                            </TableRow>
                            <FeeRow sl={3} description="Exam Fee" amount={results.examFee} />
                            <FeeRow sl={4} description="Establishment Fee" amount={results.establishmentFee} />
                            <FeeRow sl={5} description="Previous Dues (if any)" amount={results.previousDues} />
                            <FeeRow sl="" description="Total Fee" amount={results.totalFee} isBold={true} />
                            <FeeRow sl="" description="Total Waiver on Tuition Fee" amount={results.totalWaiver > 0 ? -results.totalWaiver : 0} isBold={true} />
                            <FeeRow sl="" description="Total Payable" amount={results.totalPayable} isBold={true} />
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="mt-8">
                 <CardHeader>
                    <CardTitle>Installment Plan</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Installment</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Tuition Fee</TableHead>
                                <TableHead className="text-right">Waiver</TableHead>
                                <TableHead className="text-right">Payment</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.installments.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-right">{currencyFormatter(item.total)}</TableCell>
                                    <TableCell className="text-right">{currencyFormatter(item.tuitionFee)}</TableCell>
                                    <TableCell className="text-right">{currencyFormatter(item.waiver)}</TableCell>
                                    <TableCell className="text-right">{currencyFormatter(item.payment)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className="text-xs text-muted-foreground mt-4">(Not applicable for current semester)</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
