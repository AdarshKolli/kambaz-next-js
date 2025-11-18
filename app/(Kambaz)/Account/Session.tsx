"use client"

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  
  const fetchProfile = async () => {
    try {
      console.log("Fetching profile...");
      const currentUser = await client.profile();
      console.log("Current user:", currentUser);
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
      }
    } catch (err: any) {
      console.log("No user logged in or error:", err);
    } finally {
      // ALWAYS set pending to false, even if there's an error
      setPending(false);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (pending) {
    return <div className="p-4">Checking login status...</div>;
  }
  
  return <>{children}</>;
}