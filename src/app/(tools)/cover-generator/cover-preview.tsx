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

export function CoverPreview({ content }: CoverPreviewProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download the PDF.");
      return;
    }

    const { title, assignmentTitle, courseName, submittedTo, submittedBy, submissionDate } = content;
    
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    const background = getComputedStyle(document.documentElement).getPropertyValue('--background');
    const foreground = getComputedStyle(document.documentElement).getPropertyValue('--foreground');

    printWindow.document.write(`
        <html>
            <head>
                <title>Cover Page - ${assignmentTitle}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap');
                    
                    :root {
                        --primary: ${primary};
                        --accent: ${accent};
                        --background: ${background};
                        --foreground: ${foreground};
                    }

                    body {
                        margin: 0;
                        padding: 0;
                        font-family: 'Roboto', sans-serif;
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
                    .page::before {
                        content: '';
                        position: absolute;
                        top: -100px;
                        left: -150px;
                        width: 400px;
                        height: 400px;
                        background-color: hsl(var(--primary) / 0.08);
                        border-radius: 50%;
                        z-index: 0;
                    }
                    .page::after {
                        content: '';
                        position: absolute;
                        bottom: -150px;
                        right: -150px;
                        width: 450px;
                        height: 450px;
                        background: linear-gradient(45deg, hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.15));
                        clip-path: circle(50% at 100% 100%);
                        z-index: 0;
                    }
                    .header, .content-area, .details-grid, .footer {
                        position: relative;
                        z-index: 1;
                    }
                    .header { 
                        text-align: center;
                        margin-bottom: 1.25in;
                    }
                    .university-name {
                        font-family: 'Playfair Display', serif;
                        font-size: 22pt;
                        font-weight: 700;
                        color: hsl(var(--foreground));
                        opacity: 0.8;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                        margin: 0;
                    }
                    .content-area {
                      flex-grow: 1;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      text-align: center;
                    }
                    .main-title { 
                        font-family: 'Playfair Display', serif;
                        font-size: 42pt; 
                        font-weight: 700; 
                        margin-bottom: 0.5in; 
                        color: hsl(var(--primary));
                    }
                    .course-details { 
                        font-size: 22pt;
                        line-height: 1.6;
                        color: hsl(var(--foreground));
                        opacity: 0.9;
                    }
                     .course-details strong {
                        font-family: 'Roboto';
                        font-weight: 700;
                        letter-spacing: 0.5px;
                     }
                    .details-grid {
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                      margin-top: 2in;
                      font-size: 12pt;
                      gap: 1.5in;
                    }
                    .info-block { 
                        width: 48%; 
                        padding: 20px;
                        border-left: 3px solid hsl(var(--primary) / 0.7);
                        background-color: hsl(var(--primary) / 0.05);
                        border-radius: 0 8px 8px 0;
                    }
                    .info-block h3 { 
                        font-family: 'Playfair Display', serif;
                        font-size: 16pt; 
                        font-weight: 700; 
                        color: hsl(var(--primary));
                        margin-top: 0;
                        margin-bottom: 15px;
                        padding-bottom: 8px; 
                        border-bottom: 1px solid hsl(var(--primary) / 0.2);
                    }
                    .info-block p { margin: 8px 0; }
                    .footer { text-align: center; }
                    .date-section { margin-top: auto; padding-top: 1in; font-size: 12pt; opacity: 0.7; }
                    @page { size: A4; margin: 0; }
                </style>
            </head>
            <body>
                <div class="page">
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
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.focus();
                            window.print();
                            window.close();
                        }, 250);
                    }
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
  };

  const { title, assignmentTitle, courseName, submittedTo, submittedBy, submissionDate } = content;

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
        <div className="relative min-h-[700px] rounded-md border bg-card p-6 text-sm overflow-hidden">
           <div className="absolute top-[-50px] left-[-75px] w-48 h-48 bg-primary/5 rounded-full -z-0" />
           <div 
            className="absolute bottom-[-75px] right-[-75px] w-[220px] h-[220px] bg-gradient-to-tl from-accent/10 to-primary/10 -z-0"
            style={{ clipPath: 'circle(50% at 100% 100%)' }}
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-start text-center">
            <div className="w-full pb-4 mb-12">
              <p className="font-serif text-xl font-bold tracking-widest text-foreground/80 uppercase" style={{fontFamily: "'Playfair Display', serif"}}>
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
        </div>
      </CardContent>
    </Card>
  );
}
