"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음

function LoginStatus() {
  const [user, setUser] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const supabase = createClient();

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setIsComplete(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(user);

  // 로딩 상태를 기반으로 조건부 렌더링
  if (!isComplete) {
    return <></>; // 또는 다른 로딩 인디케이터
  }

  return (
    <>
      {user ? (
        <>
          <a
            className="uui-button-tertiary-gray hide-tablet w-inline-block"
            href="/"
          >
            Hello! {user?.email}
          </a>
          <a
            href="/login"
            className="uui-button-tertiary-gray hide-tablet w-inline-block"
          >
            <div>Log Out</div>
          </a>
        </>
      ) : (
        <>
          <a
            href="/login"
            className="uui-button-tertiary-gray hide-tablet w-inline-block"
          >
            <div>Log in</div>
          </a>
          <a href="/signup" className="uui-button w-inline-block">
            <div>Sign up</div>
          </a>
        </>
      )}
    </>
  );
}

export default LoginStatus;
