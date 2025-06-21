'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { handleGenerateCover } from './actions';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CoverPreview } from './cover-preview';
import { WandSparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  assignmentTitle: z.string().min(3, 'Assignment title must be at least 3 characters.'),
  courseName: z.string().min(3, 'Course name must be at least 3 characters.'),
  studentName: z.string().min(2, 'Student name must be at least 2 characters.'),
  studentId: z.string().min(1, 'Student ID is required.'),
  submissionDate: z.string().min(1, 'Submission date is required.'),
});

type FormSchema = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
         <WandSparkles className="mr-2 h-4 w-4" />
          Generate Cover
        </>
      )}
    </Button>
  );
}

export default function CoverGeneratorPage() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(handleGenerateCover, {
    message: '',
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignmentTitle: '',
      courseName: '',
      studentName: '',
      studentId: '',
      submissionDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
    },
  });

  useEffect(() => {
    if (state.message && state.message !== 'Success!') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div>
      <PageHeader
        title="Assignment Cover Generator"
        description="Provide your assignment details and let our AI generate a professional cover page for you."
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <form action={formAction} className="flex h-full flex-col">
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>Fill in the fields below to create your cover page.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="assignmentTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Introduction to AI Research Paper" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., COMP 472" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="submissionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submission Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
        <div className="flex items-start">
          {state.coverPageText ? (
            <CoverPreview content={state.coverPageText} />
          ) : (
             <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted">
              <div className="text-center">
                <p className="text-lg font-semibold text-muted-foreground">Your generated cover will appear here.</p>
                <p className="text-sm text-muted-foreground">Fill out the form and click generate!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
