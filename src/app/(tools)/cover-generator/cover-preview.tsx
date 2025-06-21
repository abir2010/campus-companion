'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import React from "react";

type CoverPreviewProps = {
  content: string;
};

const logoSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABD4AAASaCAYAAABaBsfPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGgAAP+lSURBVFET/+z9fV9z2/n93T+zZ/Y5e+d2s/eRfcjGLt7sxl2sJDtJSrIoWZZUStG+aK1iLdZS+qElpSwt2hZppU9piy+lpV+kbf3CqIW2pI/QFi0tFS1kO8mO43iS3WQX8s7OeWb2+Xy/7/P5fWbP7Ds7O+/z+Tof9J69M3v2e+bZc/Y5z/v8DkS/+cvf/PKXv/z1L3/5y1/+8pe//OUvf/nL3/72t7/97W9/+9vf/va3v/3tb3/729/+9re//e1vf/va3/72t7/97W9/+9vf/va3v/3tb3/729/+9re//e1vf/va3/72t7/97W9/+9vf/va3v/3tb3/729/+9re//e1vf/va3/72t7/97W9/+9vf/va3v/3tb//8/tE/45S9/+ctf/vK3v/3tb//i/+J/8f/v/+7f/u3f/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/uVf/-HR-00';

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
