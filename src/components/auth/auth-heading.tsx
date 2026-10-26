import { ReactNode } from "react";
import { Icon, IconName } from "@src/components/ui/icon";

export function AuthHeading({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: IconName;
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <header className="auth-heading">
      <span className="auth-heading-icon">
        <Icon name={icon} />
      </span>
      <p className="auth-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="auth-description">{description}</p>
    </header>
  );
}
