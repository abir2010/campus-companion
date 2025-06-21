type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-10 border-b pb-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{description}</p>
    </div>
  );
}
