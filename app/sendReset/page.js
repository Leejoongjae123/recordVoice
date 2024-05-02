'use client'
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음
import { redirect, useRouter } from "next/navigation";



export default function Login() {
  const [email, setEmail] = useState("");
  
  const supabaseClient = createClient();
  const router = useRouter();

  const handleSend=async ()=>{
    console.log(email)

    const {data,error}=await supabaseClient.auth.resetPasswordForEmail(email)
    console.log(error)
    if(!error){
      return router.push("/?login=reset")
    }

  }

  return (
    <div className="spark-section-5">
      <div className="spark-container-4 w-container">
        <div className="spark-centered-900">
          <h2>비밀번호 찾기</h2>
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
            
            <div className="login-group">
              <input
                type="submit"
                data-wait="Please wait..."
                className="spark-button-4 spark-full-width2 w-button"
                value="메일 발송"
                onClick={handleSend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
