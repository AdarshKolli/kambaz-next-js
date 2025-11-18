"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  
  return (
    <div className="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Control 
        value={user.username || ""} 
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mb-2" 
        placeholder="username" 
        id="wd-username"
      />
      <Form.Control 
        value={user.password || ""} 
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-2" 
        placeholder="password" 
        type="password"
        id="wd-password"
      />
      <Button onClick={signup} variant="primary" className="w-100 mb-2" id="wd-signup-btn">
        Sign up
      </Button>
      <Link href="/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}