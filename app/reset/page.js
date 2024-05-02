"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const supabaseClient = createClient();
  const router = useRouter();
  const handleChange = async () => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    if(password1===password2){
      console.log('1234')
    } else{
      setError("비밀번호가 다릅니다.")
    }
  };

  return (
    <div className="spark-section-5">
      <div className="spark-container-4 w-container">
        <div className="spark-centered-900">
          <h2>비밀번호 변경</h2>
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
            <label htmlFor="General-Contact-Form---Name">비밀번호</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Name"
              data-name="General Contact Form - Name"
              placeholder="이메일 아이디를 입력하세요"
              type="password"
              id="General-Contact-Form---Name"
              required=""
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <label htmlFor="General-Contact-Form---Email">비밀번호 확인</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Email"
              data-name="General Contact Form - Email"
              placeholder="비밀번호를 입력하세요"
              type="password"
              id="General-Contact-Form---Email"
              required=""
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <div className="login-group">
              <input
                type="submit"
                data-wait="Please wait..."
                className="spark-button-4 spark-full-width2 w-button"
                value="변경하기"
                onClick={handleChange}
              />
            </div>
            {error&&<p style={{textAlign:'center',color:'#7F56D9',fontWeight:'bold',marginTop:'1rem'}}>{error}</p>}
            
          </div>

        </div>
      </div>
    </div>
  );
}
