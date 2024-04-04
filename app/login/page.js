'use client'
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음
import {useRouter} from 'next/navigation'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabaseClient = createClient();
  const router=useRouter()
  const handleLogin = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert("로그인 실패: " + error.message);
    } else {
      alert("로그인 성공")
      router.push("/")
    }
  };
  const handleClick=()=>{
    router.push('/signup')
  }

  return (
    <div className="spark-section-4">
      <div className="spark-container-4 w-container">
        <div className="spark-centered-900">
          <h2>Log in</h2>
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
            <label htmlFor="General-Contact-Form---Name">ID</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Name"
              data-name="General Contact Form - Name"
              placeholder="Enter Your Name"
              type="text"
              id="General-Contact-Form---Name"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="General-Contact-Form---Email">PW</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Email"
              data-name="General Contact Form - Email"
              placeholder="Enter Your Email Address"
              type="email"
              id="General-Contact-Form---Email"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              data-wait="Please wait..."
              className="spark-button-4 spark-full-width w-button"
              value="Log in"
              onClick={handleLogin}
            />
            
            <input
              type='button'
              data-wait="Please wait..."
              className="spark-button-4 spark-full-width w-button"
              value="Sign up"
              onClick={()=>{
                handleClick()
              }}
            />
            
            
          </div>
        </div>
      </div>
    </div>
  );
}