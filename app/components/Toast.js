"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense } from "react";

function Toast() {
  const searchParams = useSearchParams();

  const checkSignUp = () => {
    const signupSuccess = searchParams.get("signup");
    const loginSuccess = searchParams.get("login");
    if (signupSuccess === "success") {
      SignUpSuccess();
    } else if (signupSuccess === "fail") {
      SignUpFail();
    } else if (loginSuccess === "success") {
      LoginSuccess();
    } else if (loginSuccess === "fail") {
      LoginFail();
    }
  };
  useEffect(() => {
    checkSignUp();
  }, []);

  const SignUpSuccess = () => toast("로그인 성공");
  const SignUpFail = () => toast("회원가입 실패");
  const LoginSuccess = () => toast("로그인 성공");
  const LoginFail = () => toast("로그인 실패");
  return (
    <>

        <ToastContainer
          autoClose={1000}
          progressClassName="purpleProgressBar"
        />

    </>
  );
}

export default Toast;
