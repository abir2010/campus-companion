'use server';

/**
 * @fileOverview A flow for generating assignment or lab report cover pages.
 *
 * - generateCoverPage - A function that generates a cover page.
 * - GenerateCoverPageInput - The input type for the generateCoverPage function.
 * - GenerateCoverPageOutput - The return type for the generateCoverPage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverPageInputSchema = z.object({
  design: z.enum(['artistic', 'minimalist', 'modern', 'classic']).describe('The design template for the cover page.'),
  coverType: z.enum(['assignment', 'lab-report']).describe('The type of cover page to generate.'),
  assignmentTitle: z.string().describe('The title of the assignment or lab report.'),
  courseName: z.string().describe('The name of the course.'),
  courseTeacherName: z.string().describe("The course teacher's name."),
  teacherDesignation: z.string().describe("The course teacher's designation."),
  studentName: z.string().describe('The name of the student.'),
  studentId: z.string().describe('The student ID.'),
  studentSection: z.string().describe("The student's section."),
  studentSemester: z.string().describe("The student's semester."),
  submissionDate: z.string().describe('The submission date of the assignment.'),
});
export type GenerateCoverPageInput = z.infer<typeof GenerateCoverPageInputSchema>;

const GenerateCoverPageOutputSchema = z.object({
    design: z.enum(['artistic', 'minimalist', 'modern', 'classic']).describe('The selected design template.'),
    title: z.string().describe('The main title for the cover page, like "Assignment" or "Lab Report".'),
    assignmentTitle: z.string().describe('The title of the assignment or lab report.'),
    courseName: z.string().describe('The name of the course.'),
    submittedTo: z.object({
        name: z.string().describe("The course teacher's name."),
        designation: z.string().describe("The course teacher's designation."),
    }),
    submittedBy: z.object({
        name: z.string().describe("The student's name."),
        id: z.string().describe("The student's ID."),
        section: z.string().describe("The student's section."),
        semester: z.string().describe("The student's semester."),
    }),
    submissionDate: z.string().describe('The submission date.'),
});
export type GenerateCoverPageOutput = z.infer<typeof GenerateCoverPageOutputSchema>;


export async function generateCoverPage(input: GenerateCoverPageInput): Promise<GenerateCoverPageOutput> {
  return generateCoverPageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverPagePrompt',
  input: {schema: GenerateCoverPageInputSchema},
  output: {schema: GenerateCoverPageOutputSchema},
  prompt: `You are an expert in creating professional-looking university cover pages.
  Generate the data for a cover page based on the following information.

  Cover Page Type: {{{coverType}}}
  Title: {{{assignmentTitle}}}
  Course Name: {{{courseName}}}
  Design: {{{design}}}

  Submitted To:
  Name: {{{courseTeacherName}}}
  Designation: {{{teacherDesignation}}}

  Submitted By:
  Name: {{{studentName}}}
  ID: {{{studentId}}}
  Section: {{{studentSection}}}
  Semester: {{{studentSemester}}}

  Submission Date: {{{submissionDate}}}

  Based on the cover type, set the main 'title' field in the output. For 'assignment', the title should be 'Assignment', and for 'lab-report', it should be 'Lab Report'.
  Populate all fields in the output JSON schema accurately based on the provided inputs. The 'design' field should be passed through from the input.
  `,
});

const generateCoverPageFlow = ai.defineFlow(
  {
    name: 'generateCoverPageFlow',
    inputSchema: GenerateCoverPageInputSchema,
    outputSchema: GenerateCoverPageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
