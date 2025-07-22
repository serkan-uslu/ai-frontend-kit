import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({
  href = "/",
  label = "Back to Chat",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-6 transition-colors"
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </Link>
  );
}
