"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills" className="flex-column" style={{ fontSize: '0.85rem', maxWidth: '120px' }}>
      <NavItem className="mb-2">
        <NavLink href="/Labs" as={Link} className={`nav-link py-1 px-2 ${pathname.endsWith("Labs") ? "active" : ""}`}>
          Labs
        </NavLink>
      </NavItem>
      <NavItem className="mb-2">
        <NavLink href="/Labs/Lab1" as={Link} className={`nav-link py-1 px-2 ${pathname.endsWith("Lab1") ? "active" : ""}`}>
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem className="mb-2">
        <NavLink href="/Labs/Lab2" as={Link} className={`nav-link py-1 px-2 ${pathname.endsWith("Lab2") ? "active" : ""}`}>
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem className="mb-2">
        <NavLink href="/Labs/Lab3" as={Link} className={`nav-link py-1 px-2 ${pathname.endsWith("Lab3") ? "active" : ""}`}>
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem className="mb-2">
        <NavLink href="/Labs/Lab4" as={Link} className={`nav-link py-1 px-2 ${pathname.endsWith("Lab4") ? "active" : ""}`}>
          Lab 4
        </NavLink>
      </NavItem>
      <NavItem className="mb-2">
        <NavLink href="/Labs/Lab5" as={Link} className={`nav-link py-1 px-2 ${pathname.endsWith("Lab5") ? "active" : ""}`}>
          Lab 5
        </NavLink>
      </NavItem>
      <NavItem className="mb-2">
        <NavLink href="/" as={Link} className="nav-link py-1 px-2">
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem className="mb-2">
        <NavLink href="https://github.com/AdarshKolli" target="_blank" className="nav-link py-1 px-2">
          GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}