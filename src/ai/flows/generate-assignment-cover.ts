'use server';

/**
 * @fileOverview A flow for generating assignment cover pages.
 *
 * - generateAssignmentCover - A function that generates an assignment cover page.
 * - GenerateAssignmentCoverInput - The input type for the generateAssignmentCover function.
 * - GenerateAssignmentCoverOutput - The return type for the generateAssignmentCover function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAssignmentCoverInputSchema = z.object({
  assignmentTitle: z.string().describe('The title of the assignment.'),
  courseName: z.string().describe('The name of the course.'),
  studentName: z.string().describe('The name of the student.'),
  studentId: z.string().describe('The student ID.'),
  submissionDate: z.string().describe('The submission date of the assignment.'),
});
export type GenerateAssignmentCoverInput = z.infer<typeof GenerateAssignmentCoverInputSchema>;

const GenerateAssignmentCoverOutputSchema = z.object({
  coverPageText: z.string().describe('The generated text for the assignment cover page.'),
});
export type GenerateAssignmentCoverOutput = z.infer<typeof GenerateAssignmentCoverOutputSchema>;

export async function generateAssignmentCover(input: GenerateAssignmentCoverInput): Promise<GenerateAssignmentCoverOutput> {
  return generateAssignmentCoverFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAssignmentCoverPrompt',
  input: {schema: GenerateAssignmentCoverInputSchema},
  output: {schema: GenerateAssignmentCoverOutputSchema},
  prompt: `You are an expert in creating professional-looking assignment cover pages.

  Generate the text for an assignment cover page with the following information:

  Assignment Title: {{{assignmentTitle}}}
  Course Name: {{{courseName}}}
  Student Name: {{{studentName}}}
  Student ID: {{{studentId}}}
  Submission Date: {{{submissionDate}}}

  The cover page should include a title, the course name, student information, and submission date.
  Ensure the cover page looks professional and is well-formatted.
  Do not generate any HTML or markdown - only the text of the cover page.
  `,
});

const generateAssignmentCoverFlow = ai.defineFlow(
  {
    name: 'generateAssignmentCoverFlow',
    inputSchema: GenerateAssignmentCoverInputSchema,
    outputSchema: GenerateAssignmentCoverOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
