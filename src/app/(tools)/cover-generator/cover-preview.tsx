
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import React, { useRef } from "react";
import type { GenerateCoverPageOutput } from "@/ai/flows/generate-assignment-cover";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type CoverPageData = GenerateCoverPageOutput;

type CoverPreviewProps = {
  content: CoverPageData;
};

// A reusable layout for the cover page content to avoid duplication.
const CoverPageLayout = ({
  design,
  renderPreview,
}: {
  design: CoverPageData['design'];
  renderPreview: () => JSX.Element;
}) => (
  <div className="relative h-full w-full">
    {design === 'artistic' && (
      <>
        <div className="absolute top-[-50px] left-[-75px] w-48 h-48 bg-primary/5 rounded-full -z-0" />
        <div
          className="absolute bottom-[-75px] right-[-75px] w-[220px] h-[220px] bg-gradient-to-tl from-accent/10 to-primary/10 -z-0"
          style={{ clipPath: 'circle(50% at 100% 100%)' }}
        />
      </>
    )}
    <div className="h-full w-full bg-white">{renderPreview()}</div>
  </div>
);

export function CoverPreview({ content }: CoverPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const printElement = printRef.current;
    if (!printElement) {
      alert("Could not find the element to generate PDF from.");
      return;
    }
    
    try {
      const canvas = await html2canvas(printElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const contentAspectRatio = canvas.width / canvas.height;
      const pageAspectRatio = pdfWidth / pdfHeight;

      let imgWidth, imgHeight;

      if (contentAspectRatio > pageAspectRatio) {
        imgWidth = pdfWidth;
        imgHeight = imgWidth / contentAspectRatio;
      } else {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * contentAspectRatio;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'cover-page.pdf';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    }
  };

  const { design, title, assignmentTitle, courseName, submittedTo, submittedBy, submissionDate } = content;

  const renderPreview = () => {
      switch (design) {
        case 'artistic':
            return (
                <div className="relative z-10 flex h-full flex-col items-center justify-start text-center p-8 box-border" style={{ fontFamily: "'Roboto', sans-serif" }}>
                    <div className="w-full pb-4 mb-12">
                        <p className="text-xl font-bold tracking-widest text-foreground/80 uppercase" style={{fontFamily: "'Playfair Display', serif"}}>
                            International Islamic University Chittagong
                        </p>
                    </div>
                    <div className="my-12 flex-grow text-center">
                        <h2 className="text-5xl font-bold" style={{fontFamily: "'Playfair Display', serif", color: 'hsl(var(--primary))'}}>{title}</h2>
                        <div className="mt-8 space-y-2 text-2xl text-foreground/90">
                            <p><strong>Course:</strong> {courseName}</p>
                            <p><strong>Topic:</strong> {assignmentTitle}</p>
                        </div>
                    </div>
                    <div className="mt-16 flex w-full justify-between text-left gap-8 text-base">
                        <div className="w-[48%] p-4 border-l-4 border-primary/70 bg-primary/5 rounded-r-lg">
                            <h3 className="font-bold text-lg pb-2 mb-2 border-b border-primary/20 text-primary" style={{fontFamily: "'Playfair Display', serif"}}>Submitted To:</h3>
                            <p><strong>Name:</strong> {submittedTo.name}</p>
                            <p><strong>Designation:</strong> {submittedTo.designation}</p>
                        </div>
                        <div className="w-[48%] p-4 border-l-4 border-primary/70 bg-primary/5 rounded-r-lg">
                            <h3 className="font-bold text-lg pb-2 mb-2 border-b border-primary/20 text-primary" style={{fontFamily: "'Playfair Display', serif"}}>Submitted By:</h3>
                            <p><strong>Name:</strong> {submittedBy.name}</p>
                            <p><strong>ID:</strong> {submittedBy.id}</p>
                            <p><strong>Section:</strong> {submittedBy.section}</p>
                            <p><strong>Semester:</strong> {submittedBy.semester}</p>
                        </div>
                    </div>
                    <div className="mt-auto pt-16">
                        <p className="opacity-70"><strong>Date of Submission:</strong> {submissionDate}</p>
                    </div>
                </div>
            );
        case 'minimalist':
            return (
                 <div className="flex flex-col h-full text-center font-sans text-gray-700 p-16 box-border" style={{fontFamily: "'Roboto', sans-serif"}}>
                    <div className="border-b pb-4 mb-16">
                        <p className="text-xl tracking-wider text-gray-600">International Islamic University Chittagong</p>
                    </div>
                    <div className="flex-grow my-16">
                        <h2 className="text-4xl font-bold mb-8 text-gray-800">{title}</h2>
                        <div className="space-y-2 text-lg text-gray-600">
                            <p><strong>Course:</strong> {courseName}</p>
                            <p><strong>Topic:</strong> {assignmentTitle}</p>
                        </div>
                    </div>
                    <div className="flex justify-between w-full text-left text-base mt-auto">
                        <div className="w-[48%]">
                            <h3 className="text-base font-semibold border-b pb-2 mb-2">Submitted To:</h3>
                            <p><strong>Name:</strong> {submittedTo.name}</p>
                            <p><strong>Designation:</strong> {submittedTo.designation}</p>
                        </div>
                        <div className="w-[48%]">
                            <h3 className="text-base font-semibold border-b pb-2 mb-2">Submitted By:</h3>
                            <p><strong>Name:</strong> {submittedBy.name}</p>
                            <p><strong>ID:</strong> {submittedBy.id}</p>
                            <p><strong>Section:</strong> {submittedBy.section}</p>
                            <p><strong>Semester:</strong> {submittedBy.semester}</p>
                        </div>
                    </div>
                    <div className="mt-16 text-xs text-gray-500">
                        <p><strong>Date of Submission:</strong> {submissionDate}</p>
                    </div>
                </div>
            );
        case 'modern':
            return (
                <div className="flex h-full w-full">
                    <div className="w-[35%] bg-primary text-primary-foreground p-12 flex flex-col justify-around box-border">
                        <div className="text-base">
                            <h3 className="font-headline text-lg font-bold">Submitted To:</h3>
                            <p><strong>Name:</strong> {submittedTo.name}</p>
                            <p><strong>Designation:</strong> {submittedTo.designation}</p>
                        </div>
                        <div className="text-base">
                            <h3 className="font-headline text-lg font-bold">Submitted By:</h3>
                            <p><strong>Name:</strong> {submittedBy.name}</p>
                            <p><strong>ID:</strong> {submittedBy.id}</p>
                            <p><strong>Section:</strong> {submittedBy.section}</p>
                            <p><strong>Semester:</strong> {submittedBy.semester}</p>
                        </div>
                    </div>
                    <div className="w-[65%] p-16 flex flex-col text-left box-border">
                        <p className="font-headline text-2xl font-bold self-end opacity-70">IIUC</p>
                        <div className="flex-grow flex flex-col justify-center">
                            <h2 className="font-headline text-6xl font-bold leading-tight text-primary mb-8">{title}</h2>
                            <div className="space-y-2 text-xl">
                                <p><strong>Course:</strong> {courseName}</p>
                                <p><strong>Topic:</strong> {assignmentTitle}</p>
                            </div>
                        </div>
                        <p className="self-end"><strong>Submission Date:</strong> {submissionDate}</p>
                    </div>
                </div>
            );
        case 'classic':
             return (
                <div className="flex flex-col h-full text-center p-12 box-border border-8 border-double border-gray-800" style={{fontFamily: "'Lora', serif"}}>
                    <div className="mb-16">
                        <p className="text-2xl font-bold">International Islamic University Chittagong</p>
                    </div>
                    <div className="flex-grow my-8">
                        <h2 className="text-4xl font-bold mb-12">{title}</h2>
                        <div className="space-y-3 text-xl">
                            <p><strong>Course:</strong> {courseName}</p>
                            <p><strong>Topic:</strong> {assignmentTitle}</p>
                        </div>
                    </div>
                    <div className="flex justify-around w-full text-left mt-auto text-base">
                        <div className="w-[45%]">
                            <h3 className="font-bold text-lg mb-2">Submitted To:</h3>
                            <p><strong>Name:</strong> {submittedTo.name}</p>
                            <p><strong>Designation:</strong> {submittedTo.designation}</p>
                        </div>
                        <div className="w-[45%]">
                            <h3 className="font-bold text-lg mb-2">Submitted By:</h3>
                            <p><strong>Name:</strong> {submittedBy.name}</p>
                            <p><strong>ID:</strong> {submittedBy.id}</p>
                            <p><strong>Section:</strong> {submittedBy.section}</p>
                            <p><strong>Semester:</strong> {submittedBy.semester}</p>
                        </div>
                    </div>
                    <div className="mt-16 pt-8">
                        <p><strong>Date of Submission:</strong> {submissionDate}</p>
                    </div>
                </div>
            );
          default:
              return <p>Select a design to see a preview.</p>
      }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="font-headline">Preview</CardTitle>
          <Button onClick={handleDownloadPdf} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-[210mm] max-w-full mx-auto aspect-[1/1.414] rounded-md border bg-card text-sm">
            <CoverPageLayout design={design} renderPreview={renderPreview} />
          </div>
        </CardContent>
      </Card>
      
      <div className="absolute -left-[9999px] top-auto z-[-1]">
        <div ref={printRef} className="w-[210mm] h-[297mm]">
          <CoverPageLayout design={design} renderPreview={renderPreview} />
        </div>
      </div>
    </>
  );
}
