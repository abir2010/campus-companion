'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { GenerateCoverPageOutput } from '@/ai/flows/generate-assignment-cover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';


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

type FormSchema = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
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

const designOptions = [
    { value: 'artistic', label: 'Artistic', description: 'Creative and elegant' },
    { value: 'minimalist', label: 'Minimalist', description: 'Clean and simple' },
    { value: 'modern', label: 'Modern', description: 'Bold and asymmetric' },
    { value: 'classic', label: 'Classic', description: 'Formal and traditional' },
];

export default function CoverGeneratorPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleGenerateCover, {
    message: '',
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      design: 'artistic',
      coverType: 'assignment',
      assignmentTitle: '',
      courseName: '',
      courseTeacherName: '',
      teacherDesignation: '',
      studentName: '',
      studentId: '',
      studentSection: '',
      studentSemester: '',
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
        title="Cover Page Generator"
        description="Provide your details and let our AI generate a professional cover page for you."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <form action={formAction} id="cover-form" className="flex h-full flex-col">
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>Fill in the fields below to create your cover page.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
               <Form {...form}>
                <FormField
                    control={form.control}
                    name="design"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Choose a Design</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4 pt-2"
                            >
                            {designOptions.map(option => (
                                <FormItem key={option.value}>
                                    <FormControl>
                                        <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                                    </FormControl>
                                    <Label 
                                        htmlFor={option.value}
                                        className={cn(
                                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                            field.value === option.value && "border-primary"
                                        )}
                                    >
                                        <span className="font-bold">{option.label}</span>
                                        <span className="text-xs text-muted-foreground">{option.description}</span>
                                    </Label>
                                </FormItem>
                            ))}
                            </RadioGroup>
                        </FormControl>
                        <Input type="hidden" {...field} />
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                  control={form.control}
                  name="coverType"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                            <Tabs 
                            defaultValue={field.value}
                            className="w-full" 
                            onValueChange={(value) => form.setValue('coverType', value as 'assignment' | 'lab-report')}
                            >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="assignment">Assignment</TabsTrigger>
                                <TabsTrigger value="lab-report">Lab Report</TabsTrigger>
                            </TabsList>
                            </Tabs>
                        </FormControl>
                         <Input type="hidden" {...field} />
                         <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="assignmentTitle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Introduction to AI" {...field} />
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="courseTeacherName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Course Teacher Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Dr. Alan Turing" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="teacherDesignation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Teacher's Designation</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Professor" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="studentSection"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Section</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., A" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="studentSemester"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Semester</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 5th" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
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
          {state.coverPageData ? (
            <CoverPreview content={state.coverPageData} />
          ) : (
             <div className="flex h-full min-h-[700px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted">
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
