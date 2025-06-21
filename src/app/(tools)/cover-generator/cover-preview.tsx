'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import React from "react";
import type { GenerateCoverPageOutput } from "@/ai/flows/generate-assignment-cover";

export type CoverPageData = GenerateCoverPageOutput;

type CoverPreviewProps = {
  content: CoverPageData;
};

const getPrintableHtml = (content: CoverPageData): string => {
    const { design, title, assignmentTitle, courseName, submittedTo, submittedBy, submissionDate } = content;
    
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    const background = getComputedStyle(document.documentElement).getPropertyValue('--background');
    const foreground = getComputedStyle(document.documentElement).getPropertyValue('--foreground');

    const baseCss = `
        :root {
            --primary: ${primary};
            --accent: ${accent};
            --background: ${background};
            --foreground: ${foreground};
        }
        body {
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            -webkit-print-color-adjust: exact;
        }
        .page {
            width: 210mm;
            height: 297mm;
            margin: auto;
            background: white;
            padding: 0.75in;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }
        @page { size: A4; margin: 0; }
    `;

    const printScript = `
        <script>
            window.onload = function() {
                setTimeout(function() {
                    window.focus();
                    window.print();
                    window.close();
                }, 250);
            }
        </script>
    `;

    let designCss = '';
    let designHtml = '';

    switch (design) {
        case 'artistic':
            designCss = `
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap');
                body { font-family: 'Roboto', sans-serif; }
                .page::before { content: ''; position: absolute; top: -100px; left: -150px; width: 400px; height: 400px; background-color: hsl(var(--primary) / 0.08); border-radius: 50%; z-index: 0; }
                .page::after { content: ''; position: absolute; bottom: -150px; right: -150px; width: 450px; height: 450px; background: linear-gradient(45deg, hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.15)); clip-path: circle(50% at 100% 100%); z-index: 0; }
                .header, .content-area, .details-grid, .footer { position: relative; z-index: 1; }
                .header { text-align: center; margin-bottom: 1.25in; }
                .university-name { font-family: 'Playfair Display', serif; font-size: 22pt; font-weight: 700; color: hsl(var(--foreground)); opacity: 0.8; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
                .content-area { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
                .main-title { font-family: 'Playfair Display', serif; font-size: 42pt; font-weight: 700; margin-bottom: 0.5in; color: hsl(var(--primary)); }
                .course-details { font-size: 22pt; line-height: 1.6; color: hsl(var(--foreground)); opacity: 0.9; }
                 .course-details strong { font-family: 'Roboto'; font-weight: 700; letter-spacing: 0.5px; }
                .details-grid { display: flex; justify-content: space-between; width: 100%; margin-top: 2in; font-size: 12pt; gap: 1.5in; }
                .info-block { width: 48%; padding: 20px; border-left: 3px solid hsl(var(--primary) / 0.7); background-color: hsl(var(--primary) / 0.05); border-radius: 0 8px 8px 0; }
                .info-block h3 { font-family: 'Playfair Display', serif; font-size: 16pt; font-weight: 700; color: hsl(var(--primary)); margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid hsl(var(--primary) / 0.2); }
                .info-block p { margin: 8px 0; }
                .footer { text-align: center; }
                .date-section { margin-top: auto; padding-top: 1in; font-size: 12pt; opacity: 0.7; }
            `;
            designHtml = `
                <div class="header">
                    <p class="university-name">International Islamic University Chittagong</p>
                </div>
                <div class="content-area">
                    <h1 class="main-title">${title}</h1>
                    <div class="course-details">
                        <p><strong>Course:</strong> ${courseName}</p>
                        <p><strong>Topic:</strong> ${assignmentTitle}</p>
                    </div>
                </div>
                <div class="details-grid">
                  <div class="info-block">
                      <h3>Submitted To:</h3>
                      <p><strong>Name:</strong> ${submittedTo.name}</p>
                      <p><strong>Designation:</strong> ${submittedTo.designation}</p>
                  </div>
                  <div class="info-block">
                      <h3>Submitted By:</h3>
                      <p><strong>Name:</strong> ${submittedBy.name}</p>
                      <p><strong>ID:</strong> ${submittedBy.id}</p>
                      <p><strong>Section:</strong> ${submittedBy.section}</p>
                      <p><strong>Semester:</strong> ${submittedBy.semester}</p>
                  </div>
                </div>
                 <div class="footer">
                   <p class="date-section"><strong>Date of Submission:</strong> ${submissionDate}</p>
                </div>
            `;
            break;
        case 'minimalist':
             designCss = `
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
                body { font-family: 'Roboto', sans-serif; font-weight: 300; }
                .page { padding: 1in; }
                .header { text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 1in; }
                .university-name { font-size: 18pt; letter-spacing: 1px; color: #333; }
                .content-area { text-align: center; margin: 2in 0; }
                .main-title { font-size: 28pt; font-weight: 700; margin-bottom: 0.5in; }
                .course-details { font-size: 16pt; line-height: 1.8; color: #555; }
                .details-grid { display: flex; justify-content: space-between; font-size: 11pt; margin-top: auto; }
                .info-block { width: 45%; }
                .info-block h3 { font-size: 14pt; font-weight: 400; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
                .info-block p { margin: 6px 0; }
                .footer { text-align: center; margin-top: 1in; font-size: 10pt; color: #888; }
            `;
            designHtml = `
                <div class="header">
                    <p class="university-name">International Islamic University Chittagong</p>
                </div>
                <div class="content-area">
                    <h1 class="main-title">${title}</h1>
                    <div class="course-details">
                        <p><strong>Course:</strong> ${courseName}</p>
                        <p><strong>Topic:</strong> ${assignmentTitle}</p>
                    </div>
                </div>
                <div class="details-grid">
                    <div class="info-block">
                        <h3>Submitted To:</h3>
                        <p><strong>Name:</strong> ${submittedTo.name}</p>
                        <p><strong>Designation:</strong> ${submittedTo.designation}</p>
                    </div>
                    <div class="info-block">
                        <h3>Submitted By:</h3>
                        <p><strong>Name:</strong> ${submittedBy.name}</p>
                        <p><strong>ID:</strong> ${submittedBy.id}</p>
                        <p><strong>Section:</strong> ${submittedBy.section}</p>
                        <p><strong>Semester:</strong> ${submittedBy.semester}</p>
                    </div>
                </div>
                <div class="footer">
                    <p><strong>Date of Submission:</strong> ${submissionDate}</p>
                </div>
            `;
            break;
        case 'modern':
            designCss = `
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Roboto:wght@400&display=swap');
                .page { padding: 0; display: flex; }
                .sidebar { width: 35%; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); padding: 1.5in 1in; display: flex; flex-direction: column; justify-content: space-between; }
                .sidebar h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18pt; margin: 0 0 10px 0; }
                .sidebar p { font-family: 'Roboto', sans-serif; margin: 4px 0; opacity: 0.9; }
                .main-content { width: 65%; padding: 2in 1.25in; text-align: left; display: flex; flex-direction: column; }
                .university-name { font-family: 'Space Grotesk', sans-serif; font-size: 20pt; font-weight: 700; text-align: right; margin-bottom: auto; opacity: 0.7;}
                .content-area { margin-bottom: auto; }
                .main-title { font-family: 'Space Grotesk', sans-serif; font-size: 48pt; font-weight: 700; line-height: 1.1; color: hsl(var(--primary)); margin-bottom: 0.5in; }
                .course-details { font-family: 'Roboto', sans-serif; font-size: 18pt; line-height: 1.6; }
                .footer { text-align: right; font-size: 12pt; opacity: 0.8; }
            `;
            designHtml = `
                <div class="sidebar">
                    <div>
                        <h3>Submitted To:</h3>
                        <p><strong>Name:</strong> ${submittedTo.name}</p>
                        <p><strong>Designation:</strong> ${submittedTo.designation}</p>
                    </div>
                    <div>
                        <h3>Submitted By:</h3>
                        <p><strong>Name:</strong> ${submittedBy.name}</p>
                        <p><strong>ID:</strong> ${submittedBy.id}</p>
                        <p><strong>Section:</strong> ${submittedBy.section}</p>
                        <p><strong>Semester:</strong> ${submittedBy.semester}</p>
                    </div>
                </div>
                <div class="main-content">
                    <p class="university-name">IIUC</p>
                    <div class="content-area">
                        <h1 class="main-title">${title}</h1>
                        <div class="course-details">
                            <p><strong>Course:</strong> ${courseName}</p>
                            <p><strong>Topic:</strong> ${assignmentTitle}</p>
                        </div>
                    </div>
                    <div class="footer">
                        <p><strong>Submission Date:</strong> ${submissionDate}</p>
                    </div>
                </div>
            `;
            break;
        case 'classic':
            designCss = `
                @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');
                body { font-family: 'Lora', serif; }
                .page { border: 8px double #333; }
                .content-wrapper { display: flex; flex-direction: column; height: 100%; text-align: center; }
                .header { margin-bottom: 1.5in; }
                .university-name { font-size: 24pt; font-weight: 700; }
                .content-area { flex-grow: 1; }
                .main-title { font-size: 36pt; font-weight: 700; margin-bottom: 0.75in; }
                .course-details { font-size: 20pt; line-height: 1.7; }
                .details-grid { display: flex; justify-content: space-around; margin-top: 2in; font-size: 12pt; }
                .info-block { width: 40%; text-align: left;}
                .info-block h3 { font-size: 14pt; font-weight: 700; margin-bottom: 15px; }
                .info-block p { margin: 6px 0; }
                .footer { margin-top: auto; padding-top: 1in; font-size: 12pt; }
            `;
            designHtml = `
                <div class="content-wrapper">
                    <div class="header">
                        <p class="university-name">International Islamic University Chittagong</p>
                    </div>
                    <div class="content-area">
                        <h1 class="main-title">${title}</h1>
                        <div class="course-details">
                            <p><strong>Course:</strong> ${courseName}</p>
                            <p><strong>Topic:</strong> ${assignmentTitle}</p>
                        </div>
                    </div>
                    <div class="details-grid">
                      <div class="info-block">
                          <h3>Submitted To:</h3>
                          <p><strong>Name:</strong> ${submittedTo.name}</p>
                          <p><strong>Designation:</strong> ${submittedTo.designation}</p>
                      </div>
                      <div class="info-block">
                          <h3>Submitted By:</h3>
                          <p><strong>Name:</strong> ${submittedBy.name}</p>
                          <p><strong>ID:</strong> ${submittedBy.id}</p>
                          <p><strong>Section:</strong> ${submittedBy.section}</p>
                          <p><strong>Semester:</strong> ${submittedBy.semester}</p>
                      </div>
                    </div>
                    <div class="footer">
                        <p><strong>Date of Submission:</strong> ${submissionDate}</p>
                    </div>
                </div>
            `;
            break;
    }

    return `
        <html>
            <head>
                <title>Cover Page - ${assignmentTitle}</title>
                <style>${baseCss} ${designCss}</style>
            </head>
            <body>
                <div class="page">${designHtml}</div>
                ${printScript}
            </body>
        </html>
    `;
};


export function CoverPreview({ content }: CoverPreviewProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download the PDF.");
      return;
    }
    const printableHtml = getPrintableHtml(content);
    printWindow.document.write(printableHtml);
    printWindow.document.close();
  };

  const { design, title, assignmentTitle, courseName, submittedTo, submittedBy, submissionDate } = content;

  const renderPreview = () => {
      switch (design) {
        case 'artistic':
            return (
                <div className="relative z-10 flex h-full flex-col items-center justify-start text-center">
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
                    <div className="mt-16 flex w-full justify-between text-left gap-8">
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
                 <div className="flex flex-col h-full text-center font-sans text-gray-700 p-8">
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
                    <div className="flex justify-between w-full text-left text-sm mt-auto">
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
                    <div className="w-[35%] bg-primary text-primary-foreground p-8 flex flex-col justify-around">
                        <div className="text-sm">
                            <h3 className="font-headline text-lg font-bold">Submitted To:</h3>
                            <p><strong>Name:</strong> {submittedTo.name}</p>
                            <p><strong>Designation:</strong> {submittedTo.designation}</p>
                        </div>
                        <div className="text-sm">
                            <h3 className="font-headline text-lg font-bold">Submitted By:</h3>
                            <p><strong>Name:</strong> {submittedBy.name}</p>
                            <p><strong>ID:</strong> {submittedBy.id}</p>
                            <p><strong>Section:</strong> {submittedBy.section}</p>
                            <p><strong>Semester:</strong> {submittedBy.semester}</p>
                        </div>
                    </div>
                    <div className="w-[65%] p-12 flex flex-col text-left">
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
                <div className="flex flex-col h-full text-center p-8 border-4 border-double border-gray-800" style={{fontFamily: "'Lora', serif"}}>
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
                    <div className="flex justify-around w-full text-left mt-auto">
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-headline">Preview</CardTitle>
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative min-h-[700px] rounded-md border bg-card text-sm overflow-hidden">
           {design === 'artistic' && (
            <>
                <div className="absolute top-[-50px] left-[-75px] w-48 h-48 bg-primary/5 rounded-full -z-0" />
                <div 
                    className="absolute bottom-[-75px] right-[-75px] w-[220px] h-[220px] bg-gradient-to-tl from-accent/10 to-primary/10 -z-0"
                    style={{ clipPath: 'circle(50% at 100% 100%)' }}
                />
            </>
           )}
           <div className="p-2 h-full w-full">
             {renderPreview()}
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
