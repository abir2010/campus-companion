'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import React from "react";

type CoverPreviewProps = {
  content: string;
};

export function CoverPreview({ content }: CoverPreviewProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download the PDF.");
      return;
    }

    printWindow.document.write(`
        <html>
            <head>
                <title>Assignment Cover Page</title>
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
                        margin-bottom: 2in;
                        text-align: center;
                    }
                    .university-name {
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: 24pt;
                        font-weight: 700;
                        color: #003366;
                        margin: 0;
                    }
                    .content-area {
                        flex-grow: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    pre {
                        font-family: 'Times New Roman', serif;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        font-size: 14pt;
                        line-height: 2;
                        text-align: center;
                        margin: 0;
                    }
                    @page {
                        size: A4;
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <div class="page">
                    <div class="page-border"></div>
                    <div class="header">
                        <p class="university-name">International Islamic University Chittagong</p>
                    </div>
                    <div class="content-area">
                        <pre>${content}</pre>
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
        <div className="relative min-h-[400px] rounded-md border bg-muted p-6">
          <div
            className="pointer-events-none absolute inset-2 border-4 border-double"
            style={{ borderColor: 'hsl(var(--primary))' }}
          />
          <div className="flex h-full flex-col items-center justify-start pt-8 text-center">
            <div className="mb-8">
              <p
                className="font-headline text-xl font-bold"
                style={{ color: 'hsl(var(--primary))' }}
              >
                International Islamic University Chittagong
              </p>
            </div>
            <div className="flex-grow">
              <pre className="whitespace-pre-wrap text-center font-sans text-sm text-muted-foreground">
                {content}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
