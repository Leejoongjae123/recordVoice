"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // 상대 경로는 프로젝트 구조에 따라 다를 수 있음
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const supabase = createClient();
  const router = useRouter();
  const handleSignUp = async (event) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    const uid = data?.session?.user?.id;

    const [folderName] = email.split('@');


    const avatarFile = '/readme.txt'
    const { videos, error3 } = await supabase
      .storage
      .from('videos')
      .upload(`${folderName}/readme.txt`, avatarFile, {
        cacheControl: '3600',
        upsert: false
      })
      const { voices, error4 } = await supabase
      .storage
      .from('voices')
      .upload(`${folderName}/readme.txt`, avatarFile, {
        cacheControl: '3600',
        upsert: false
      })


    const { data: profiles, error: error2 } = await supabase
      .from("profiles")
      .update({
        username: name,
        phone: phone,
        email: email,
      })
      .eq("id", uid)
      .select();

      console.log(profiles,error2)
    if (error) {
      // alert("가입 실패 : " + error.message);
      router.push("/?signup=fail");
    } else {
      // alert("가입 성공")

      router.push("/?signup=success");
    }
  };

  return (
    <div className="spark-section-5">
      <div className="spark-container-4 w-container">
        <div className="spark-centered-900">
          <h2>회원가입</h2>
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
              type="email"
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
            <label htmlFor="General-Contact-Form---Email">이름</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Email"
              data-name="General Contact Form - Email"
              placeholder="이름을 입력해주세요"
              type="text"
              id="General-Contact-Form---Email"
              required=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="General-Contact-Form---Email">연락처</label>
            <input
              className="spark-input-4 w-input"
              maxLength="256"
              name="General-Contact-Form---Email"
              data-name="General Contact Form - Email"
              placeholder="연락처를 입력해주세요"
              type="text"
              id="General-Contact-Form---Email"
              required=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="submit"
              data-wait="Please wait..."
              className="spark-button-4 spark-full-width2 w-button"
              value="신청하기"
              onClick={handleSignUp}
              style={{marginTop:"1.5rem"}}
            />
          </div>
          <div className="spark-form-success-3 w-form-done">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div className="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
