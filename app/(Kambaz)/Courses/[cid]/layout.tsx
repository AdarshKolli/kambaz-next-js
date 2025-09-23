"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import KambazNavigation from "../../Navigation";
import CourseNavigation from "./Navigation";

export default function CourseLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const cid = parts[2]; // e.g. /Courses/1234/Home → "1234"

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Global Sidebar */}
      <KambazNavigation />

      {/* Course Sidebar */}
      <CourseNavigation cid={cid} />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
