import { PropsWithChildren } from "react";
import AuthLayout from "./auth-layout";

export default function MainLayout({ children }: PropsWithChildren) {
  return <AuthLayout welcome>{children}</AuthLayout>;
}
