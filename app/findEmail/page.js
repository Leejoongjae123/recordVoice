"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const supabaseClient = createClient();
  const router = useRouter();
  const handleLogin = async () => {
  };
  const handleClick = async () => {
    let { data: profiles, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("phone", phone)
    .single()
    
    if (!error && profiles) {
      setEmail(anonymizeEmail(profiles.email)); // 에러가 없고 데이터가 있으면 email 변수에 email 할당
    } else {
      setEmail("이메일이 없습니다") // 에러가 있거나 데이터가 없으면 메시지 할당
    }
    
  };
  console.log(email)

  return (
    <div className="spark-section-5">
      <ToastContainer autoClose={1000} progressClassName="purpleProgressBar" />
      <div className="spark-container-4 w-container">
        <div className="spark-centered-900">
          <h2>이메일 찾기</h2>
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
            <label htmlFor="General-Contact-Form---Name">연락처</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Name"
              data-name="General Contact Form - Name"
              placeholder="가입에 사용한 연락처를 입력해주세요"
              type="text"
              id="General-Contact-Form---Name"
              required=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="login-group">

              <input
                type="button"
                data-wait="Please wait..."
                className="spark-button-4 spark-full-width2 w-button"
                value="찾기"
                onClick={() => {
                  handleClick();
                }}
              />
            </div>
            {email&&<p style={{textAlign:'center',color:'#7F56D9',fontWeight:'bold',marginTop:'1rem'}}>{email}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
function anonymizeEmail(email) {
  const [localPart, domainPart] = email.split('@'); // 이메일을 '@' 기호로 분리
  if (!localPart || !domainPart) {
    return "잘못된 이메일 형식입니다.";
  }
  
  // localPart에서 마지막 두 문자를 '*'로 대체
  const maskedLocalPart = localPart.slice(0, -2) + '**';
  
  return `${maskedLocalPart}@${domainPart}`; // 변경된 localPart와 domainPart를 다시 합쳐서 반환
}