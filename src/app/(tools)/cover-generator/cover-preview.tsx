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
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400&display=swap');
                    body { 
                        font-family: 'Inter', sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                     }
                    .cover-content { 
                        width: 8.5in;
                        height: 11in;
                        padding: 1in;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center; 
                        text-align: center;
                    }
                    pre { 
                        font-family: 'Inter', sans-serif;
                        white-space: pre-wrap; 
                        word-wrap: break-word;
                        font-size: 12pt;
                        line-height: 2;
                    }
                    @page {
                        size: A4;
                        margin: 1in;
                    }
                </style>
            </head>
            <body>
                <div class="cover-content">
                    <pre>${content}</pre>
                </div>
                <script>
                  window.onload = function() {
                    window.focus();
                    window.print();
                    window.close();
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
        <div className="min-h-[300px] rounded-md border bg-muted p-6">
          <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">{content}</pre>
        </div>
      </CardContent>
    </Card>
  );
}
