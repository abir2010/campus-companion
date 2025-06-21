'use server';

import { generateCoverPage, GenerateCoverPageInput, GenerateCoverPageOutput } from '@/ai/flows/generate-assignment-cover';
import { z } from 'zod';

const formSchema = z.object({
  design: z.enum(['artistic', 'minimalist', 'modern', 'classic']),
  coverType: z.enum(['assignment', 'lab-report']),
  assignmentTitle: z.string().min(3, 'Title must be at least 3 characters.'),
  courseName: z.string().min(3, 'Course name must be at least 3 characters.'),
  courseTeacherName: z.string().min(2, 'Teacher name must be at least 2 characters.'),
  teacherDesignation: z.string().min(2, 'Designation must be at least 2 characters.'),
  studentName: z.string().min(2, 'Student name must be at least 2 characters.'),
  studentId: z.string().min(1, 'Student ID is required.'),
  studentSection: z.string().min(1, 'Section is required.'),
  studentSemester: z.string().min(1, 'Semester is required.'),
  submissionDate: z.string().min(1, 'Submission date is required.'),
});

type FormState = {
  message: string;
  coverPageData?: GenerateCoverPageOutput;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export async function handleGenerateCover(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateCoverPage(validatedFields.data as GenerateCoverPageInput);
    return {
      message: 'Success!',
      coverPageData: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while generating the cover page. Please try again later.',
    };
  }
}
