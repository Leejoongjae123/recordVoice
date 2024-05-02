"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabaseClient = createClient();
  const router = useRouter();
  const handleLogin = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      router.push("/?login=fail");
    } else {
      router.push("/?login=success");
    }
  };
  const handleClick = () => {
    router.push("/signup");
    router.refresh();
  };

  const notify1 = () => toast("로그인 성공");
  const notify2 = () => toast("로그인 실패");

  return (
    <div className="spark-section-5">
      <ToastContainer autoClose={1000} progressClassName="purpleProgressBar" />
      <div className="spark-container-4 w-container">
        <div className="spark-centered-900">
          <h2>로그인</h2>
        </div>
        <div className="spark-regular-form w-form">
          <div
            id="General-Contact-Form"
            name="wf-form-General-Contact-Form"
            data-name="General Contact Form"
            method="get"
            data-wf-page-id="660c1cf9287e34fe61aae404"
            data-wf-element-id="5b5d5fad-b84f-8b21-3244-9483c083ba2a"
          >
            <label htmlFor="General-Contact-Form---Name">이메일</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Name"
              data-name="General Contact Form - Name"
              placeholder="이메일 아이디를 입력하세요"
              type="text"
              id="General-Contact-Form---Name"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="General-Contact-Form---Email">비밀번호</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Email"
              data-name="General Contact Form - Email"
              placeholder="비밀번호를 입력하세요"
              type="password"
              id="General-Contact-Form---Email"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-group">
              <input
                type="submit"
                data-wait="Please wait..."
                className="spark-button-4 spark-full-width2 w-button"
                value="로그인"
                onClick={handleLogin}
              />

              <input
                type="button"
                data-wait="Please wait..."
                className="spark-button-4 spark-full-width2 w-button"
                value="회원가입"
                onClick={() => {
                  handleClick();
                }}
              />
              <a style={{color:"7F56D9",textDecoration:'none',fontWeight:'bold'}} href="/findEmail">이메일 찾기</a>
              <a style={{color:"7F56D9",textDecoration:'none',fontWeight:'bold'}}href="/sendReset">비밀번호 찾기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
