import { cn } from "@src/utils/classnames";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("brand-mark", className)} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export function Brand() {
  return (
    <span className="brand" dir="ltr">
      <BrandMark />
      <span>
        i<span className="brand-name">Medica</span>
        <span className="brand-dot">.</span>
      </span>
    </span>
  );
}
