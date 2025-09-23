// src/(Kambaz)/Courses/[cid]/Assignments/page.tsx
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <h2>Assignments</h2>
      <hr />

      {/* Example List of Assignments */}
      <ul>
        <li>
          <Link href="/Courses/1234/Assignments/1" id="wd-assignment-link-1">
            Assignment 1 – Build the Landing Page
          </Link>
          <br />
          <span>Due: Jan 28 | 100 pts</span>
        </li>

        <li>
          <Link href="/Courses/1234/Assignments/2" id="wd-assignment-link-2">
            Assignment 2 – Implement the Modules Screen
          </Link>
          <br />
          <span>Due: Feb 4 | 100 pts</span>
        </li>

        <li>
          <Link href="/Courses/1234/Assignments/3" id="wd-assignment-link-3">
            Assignment 3 – Build the Home Screen
          </Link>
          <br />
          <span>Due: Feb 11 | 100 pts</span>
        </li>
      </ul>
    </div>
  );
}
