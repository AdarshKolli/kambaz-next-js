"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: { accountReducer: any }) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      router.push("/Account/Profile");
    }
  }, [currentUser, router]);

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        alert("Invalid username or password");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Account/Profile");
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      <Form.Control 
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="username" 
        className="mb-2" 
        id="wd-username"
      />
      <Form.Control 
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="password" 
        type="password" 
        className="mb-2" 
        id="wd-password"
      />
      <Button onClick={signin} variant="primary" className="w-100 mb-2" id="wd-signin-btn">
        Sign in
      </Button>
      <Link href="/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
      <div className="text-center mt-5 pt-5 border-top">
        <Link href="/Team" className="text-muted">
          Team Details & Repository Links
        </Link>
      </div>
    </div>
  );
}