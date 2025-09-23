// app/Account/layout.tsx
import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <AccountNavigation />
      <div>{children}</div>
    </div>
  );
}
