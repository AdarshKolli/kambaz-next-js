"use client"
import { AiOutlineDashboard, AiTwotoneExperiment } from "react-icons/ai";
import {
  FaBookOpenReader,
  FaCalendarCheck,
  FaRegCircleUser,
} from "react-icons/fa6";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FiInbox } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Dashboard", icon: FaBookOpenReader },
    { label: "Calendar",  path: "/Calendar",  icon: FaCalendarCheck },
    { label: "Inbox",     path: "/Inbox",     icon: FiInbox },
    { label: "Labs",      path: "/Labs",      icon: AiTwotoneExperiment },
  ];

  return (
    <div id="wd-kambaz-navigation">
      <ListGroup
        className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
        style={{ width: 120 }}
        id="wd-kambaz-navigation"
      >
        <ListGroupItem
          className="bg-black border-0 text-center"
          as="a"
          target="_blank"
          href="https://www.northeastern.edu/"
          id="wd-neu-link"
        >
          <img
            src="/images/neuhuskylogo.webp"
            width="75px"
            alt="Northeastern University"
          />
        </ListGroupItem>
        
        <ListGroupItem 
          as={Link} 
          href="/Account"
          id="wd-account-link"
          className={`text-center border-0 text-decoration-none
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
          <FaRegCircleUser
            className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
          <br />
          Account
        </ListGroupItem>

        {links.map((link) => (
          <ListGroupItem 
            key={link.path + link.label} 
            as={Link} 
            href={link.path}
            id={`wd-${link.label.toLowerCase()}-link`}
            className={`text-center border-0 text-decoration-none
              ${pathname.includes(link.label) ? "bg-white text-danger" : "bg-black text-white"}`}>
            {link.icon({ className: "fs-1 text-danger"})}
            <br />
            {link.label}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}