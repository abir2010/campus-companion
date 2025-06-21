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

    printWindow.document.write(`
        <html>
            <head>
                <title>Cover Page</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Times+New+Roman&display=swap');
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: 'Times New Roman', serif;
                        background-color: #f4f4f4;
                        -webkit-print-color-adjust: exact;
                    }
                    .page {
                        width: 210mm;
                        height: 297mm;
                        margin: auto;
                        background: white;
                        padding: 1in;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        border: 1px solid #ccc;
                    }
                    .page-border {
                        position: absolute;
                        top: 0.5in;
                        left: 0.5in;
                        right: 0.5in;
                        bottom: 0.5in;
                        border: 5px double #003366;
                        pointer-events: none;
                    }
                    .header { 
                        text-align: center;
                        margin-bottom: 1in;
                        border-bottom: 2px solid #003366;
                        padding-bottom: 0.25in;
                    }
                    .university-name {
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 22pt;
                        font-weight: 700;
                        color: #003366;
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
                    .main-title { font-size: 36pt; font-weight: bold; margin-bottom: 0.75in; }
                    .course-details { font-size: 18pt; line-height: 1.5; }
                    .details-grid {
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                      margin-top: 1.5in;
                      font-size: 14pt;
                    }
                    .info-block { width: 45%; text-align: left; }
                    .info-block h3 { font-size: 16pt; font-weight: bold; border-bottom: 2px solid black; padding-bottom: 5px; margin-bottom: 15px;}
                    .info-block p { margin: 5px 0; }
                    .footer { text-align: center; }
                    .date-section { margin-top: 1.5in; font-size: 14pt; }
                    @page { size: A4; margin: 0; }
                </style>
            </head>
            <body>
                <div class="page">
                    <div class="page-border"></div>
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
        <div className="relative min-h-[500px] rounded-md border bg-muted p-6 text-sm">
          <div
            className="pointer-events-none absolute inset-2 border-4 border-double"
            style={{ borderColor: 'hsl(var(--primary))' }}
          />
          <div className="flex h-full flex-col items-center justify-start text-center">
            <div className="w-full border-b-2 pb-4" style={{ borderColor: 'hsl(var(--primary))' }}>
              <p className="font-headline text-xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
                International Islamic University Chittagong
              </p>
            </div>
            <div className="my-12 flex-grow text-center">
                <h2 className="text-4xl font-bold font-headline">{title}</h2>
                <div className="mt-8 space-y-2 text-lg text-muted-foreground">
                    <p><strong>Course:</strong> {courseName}</p>
                    <p><strong>Topic:</strong> {assignmentTitle}</p>
                </div>
            </div>

            <div className="mt-8 flex w-full justify-between text-left">
                <div className="w-[48%]">
                    <h3 className="font-bold border-b-2 border-foreground pb-1 mb-2">Submitted To:</h3>
                    <p><strong>Name:</strong> {submittedTo.name}</p>
                    <p><strong>Designation:</strong> {submittedTo.designation}</p>
                </div>
                 <div className="w-[48%]">
                    <h3 className="font-bold border-b-2 border-foreground pb-1 mb-2">Submitted By:</h3>
                    <p><strong>Name:</strong> {submittedBy.name}</p>
                    <p><strong>ID:</strong> {submittedBy.id}</p>
                    <p><strong>Section:</strong> {submittedBy.section}</p>
                    <p><strong>Semester:</strong> {submittedBy.semester}</p>
                </div>
            </div>
            <div className="mt-auto pt-8">
                 <p><strong>Date of Submission:</strong> {submissionDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
