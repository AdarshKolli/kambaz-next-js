"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import * as db from "../../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u: any) => 
        u.username === credentials.username && 
        u.password === credentials.password
    );
    if (!user) {
      alert("Invalid username or password");
      return;
    }
    dispatch(setCurrentUser(user));
    router.push("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input 
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="username" 
        className="wd-username" 
      /> 
      <br />
      <input 
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="password" 
        type="password" 
        className="wd-password" 
      /> 
      <br />
      <button id="wd-signin-btn" onClick={signin} style={{ cursor: "pointer" }}>
        Sign in
      </button>
      <br />
      <Link href="Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}