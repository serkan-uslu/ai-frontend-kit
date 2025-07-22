import { ReactNode } from "react";
import { Check, Circle, Clock } from "lucide-react";

interface RoadmapItemProps {
  title: string;
  description: string;
  status: "completed" | "inProgress" | "planned";
}

export function RoadmapItem({ title, description, status }: RoadmapItemProps) {
  const StatusIcon = () => {
    switch (status) {
      case "completed":
        return (
          <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
        );
      case "inProgress":
        return (
          <Clock className="text-amber-500 mt-1 flex-shrink-0" size={18} />
        );
      case "planned":
        return (
          <Circle className="text-blue-500 mt-1 flex-shrink-0" size={18} />
        );
      default:
        return null;
    }
  };

  return (
    <li className="flex items-start gap-3">
      <StatusIcon />
      <div>
        <span className="font-medium">{title}</span>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
    </li>
  );
}

interface RoadmapSectionProps {
  title: string;
  status: "completed" | "inProgress" | "planned";
  children: ReactNode;
}

export function RoadmapSection({
  title,
  status,
  children,
}: RoadmapSectionProps) {
  const StatusIcon = () => {
    switch (status) {
      case "completed":
        return <Check className="text-green-500" size={20} />;
      case "inProgress":
        return <Clock className="text-amber-500" size={20} />;
      case "planned":
        return <Circle className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <StatusIcon />
        <span>{title}</span>
      </h2>
      <ul className="space-y-3 list-none pl-0">{children}</ul>
    </div>
  );
}
