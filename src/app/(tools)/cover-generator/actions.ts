'use server';

import { generateAssignmentCover, GenerateAssignmentCoverInput } from '@/ai/flows/generate-assignment-cover';
import { z } from 'zod';

const formSchema = z.object({
  assignmentTitle: z.string().min(1, 'Assignment title is required.'),
  courseName: z.string().min(1, 'Course name is required.'),
  studentName: z.string().min(1, 'Student name is required.'),
  studentId: z.string().min(1, 'Student ID is required.'),
  submissionDate: z.string().min(1, 'Submission date is required.'),
});

type FormState = {
  message: string;
  coverPageText?: string;
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
    const result = await generateAssignmentCover(validatedFields.data as GenerateAssignmentCoverInput);
    return {
      message: 'Success!',
      coverPageText: result.coverPageText,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while generating the cover page. Please try again later.',
    };
  }
}
