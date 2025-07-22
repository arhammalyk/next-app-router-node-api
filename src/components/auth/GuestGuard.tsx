"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);
  const [isCheckComplete, setIsCheckComplete] = useState(false);

  useEffect(() => {
    const accessToken = typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (accessToken) {
      router.replace("/dashboard");
    } else {
      setIsGuest(true);
    }
    setIsCheckComplete(true);
  }, [router]);

  if (!isCheckComplete) {
    return <Loader />;
  }

  return isGuest ? <>{children}</> : <Loader />;
};

export default GuestGuard;