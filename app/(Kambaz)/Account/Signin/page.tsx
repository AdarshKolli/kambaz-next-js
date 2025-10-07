"use client";
import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input defaultValue="" placeholder="username" className="wd-username" /> <br />
     <input defaultValue="password" placeholder="password" type="password" className="wd-password" /> <br />
     <Link id="wd-signin-btn" href="/Dashboard"> Sign in </Link> <br />
     <Link href="Signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}
