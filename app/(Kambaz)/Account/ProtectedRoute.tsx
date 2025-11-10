"use client"

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AccountState {
  currentUser: any;
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}