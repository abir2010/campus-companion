'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import React from "react";

type CoverPreviewProps = {
  content: string;
};

const logoSrc = 'data:image/png;base64,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';

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
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                    }
                    .logo {
                        height: 1.2in;
                        width: auto;
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
                        <img src="${logoSrc}" alt="University Logo" class="logo" />
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
            <div className="mb-8 flex items-center gap-4">
              <img src={logoSrc} alt="University Logo" className="h-20 w-auto" />
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
