'use client'
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음

function LoginStatus() {
  const [user, setUser] = useState(null); // 초기 상태를 null로 설정하여 사용자가 로그인하지 않았음을 명시
  const [isComplete, setIsComplete] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // 사용자 상태를 체크하고 업데이트하는 함수
    const checkUser = async () => {
      const user = supabase.auth.getUser();
      setUser(user);
      setIsComplete(true);
    };

    // 리스너 등록: 인증 상태 변경 시 사용자 정보 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        setIsComplete(true);
      }
    );

    // 현재 사용자 상태 체크
    checkUser();

    // 컴포넌트 언마운트 시 리스너 해제
  }, [supabase.auth]);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    // 로그아웃 후 사용자 상태를 null로 설정
    setUser(null);
  };

  if (!isComplete) {
    return <></>; // 로딩 인디케이터를 여기에 표시할 수 있음
  }

  return (
    <>
      {user ? (
        <>
          <a className="uui-button-tertiary-gray hide-tablet w-inline-block" href="/">
            Hello! {user.email}
          </a>
          <div
            className="uui-button-tertiary-gray hide-tablet w-inline-block"
            onClick={handleLogOut}
            style={{ cursor: "pointer" }} // 클릭 가능한 요소임을 나타내기 위해 커서 스타일 추가
          >
            Log Out
          </div>
        </>
      ) : (
        <>
          <a
            href="/login"
            className="uui-button-tertiary-gray hide-tablet w-inline-block"
          >
            Log in
          </a>
          <a href="/signup" className="uui-button w-inline-block">
            Sign up
          </a>
        </>
      )}
    </>
  );
}

export default LoginStatus;
