import { ReactNode } from "react";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
}

export function FeatureItem({
  title,
  description,
  icon,
  iconBgColor,
  iconColor,
}: FeatureItemProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-border/40">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${iconBgColor} rounded-md`}>
          <div className={`w-5 h-5 ${iconColor}`}>{icon}</div>
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
