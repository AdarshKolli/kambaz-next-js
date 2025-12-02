"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

interface AccountState {
  currentUser: any;
}

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/Account/${link}`}
          className={`list-group-item border-0 ${
            pathname.includes(link) ? "active" : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          href="/Account/Users"
          className={`list-group-item border-0 ${
            pathname.includes("Users") ? "active" : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
      <br />
    </div>
  );
}