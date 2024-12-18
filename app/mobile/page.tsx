"use client";
import { MOBILE_SCHEME, REDIRECT_TO_SIGNUP_PATH } from "@/features/auth/constants";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RedirectToSignup() {
  const searchParams = useSearchParams();
  const confirmationToken = searchParams.get("confirmation_token");

  useEffect(() => {
    if (confirmationToken) {
      window.location.href = `${MOBILE_SCHEME}${REDIRECT_TO_SIGNUP_PATH}?confirmation_token=${confirmationToken}`;
      redirect("/");
    }
  }, [confirmationToken]);

  return null;
}