import { ReactNode } from "react";

interface TechItemProps {
  title: string;
  description: string;
}

export function TechItem({ title, description }: TechItemProps) {
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

interface TechSectionProps {
  title: string;
  children: ReactNode;
}

export function TechSection({ title, children }: TechSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
        <div className="grid gap-4 md:grid-cols-2">{children}</div>
      </div>
    </div>
  );
}
