"use client";
import React from "react";
import RecordAudio from "./components/recordAudio";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { pink, deepPurple } from "@mui/material/colors";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Upload() {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // If no user is found, redirect to the /login page
        router.push("/login");
      } else {
        setUser(user); // Save the user data if found
      }
    };
    

    checkUser();


  }, [router]); // Depend on router to avoid exhaustive deps warning

  const uploadData = async (audioUrl) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user.email;

    // audioUrl에서 파일을 Blob으로 변환
    const response = await fetch(audioUrl);
    const blob = await response.blob();
    const file = new File([blob], "recording.wav", { type: "audio/wav" });

    // 파일 업로드
    const fileName = createNewName(email);
    const { error2: uploadError } = await supabase.storage
      .from("voices")
      .upload(fileName, file);
    // .upload(`recordings.wav`, file);

    const { data, error } = await supabase
      .from("records")
      .insert([
        {
          title: title,
          description: description,
          email: email,
          filePath:
            "https://xksemlvhzhuwginhbkyc.supabase.co/storage/v1/object/public/voices/" +
            fileName,
        },
      ])
      .select();

    console.log(error);
    if (!error) {
      notify();
    }
  };  
  

  const notify = () => toast("업로드를 완료하였습니다.");

  return (
    <>
      {user && (
        <section class="uui-section_contact02">
          <div class="uui-page-padding-3">
            <div class="uui-container-small">
              <div class="uui-padding-vertical-xhuge-2">
                <div class="uui-text-align-center-2">
                  <div class="uui-max-width-large-2 align-center">
                    <div class="uui-heading-subheading-2">
                      당신의 추억을 저장해주세요
                    </div>
                    <h2 class="uui-heading-medium-2">업로드</h2>
                    <div class="uui-space-xsmall-2"></div>
                    <div class="uui-text-size-large-2">
                      당신의 목소리가 여행하는 시간 속으로, 우리는 가장 소중한
                      순간들을 담아낸다. 여기, 당신만의 음성을 녹음하고 영원히
                      보존하세요. 각각의 소리에 담긴 이야기와 감정이, 미래의
                      어느 날 다시 우리를 만나길 기다립니다. 당신의 이야기를,
                      당신만의 시간 속에 영원히 남겨두세요.
                    </div>
                  </div>
                </div>
                <div class="uui-contact02_component w-form">
                  <div
                    id="wf-form-Contact-02-form"
                    name="wf-form-Contact-02-form"
                    data-name="Contact 02 form"
                    method="get"
                    class="uui-contact02_form"
                    data-wf-page-id="660c1c6d3dc8e9d96341e88b"
                    data-wf-element-id="d19b111f-c02d-ece5-a0c7-33c8e050dd3f"
                  >
                    <div class="form-field-2col">
                      <div class="uui-form-field-wrapper">
                        <label
                          for="Contact-02-first-name"
                          class="uui-field-label"
                        >
                          제목
                        </label>
                        <input
                          class="uui-form_input-2 w-input"
                          maxLength="256"
                          name="Contact-02-first-name"
                          data-name="Contact 02 first name"
                          placeholder="제목"
                          type="text"
                          id="Contact-02-first-name"
                          required=""
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="uui-form-field-wrapper">
                      <label for="Contact-02-select" class="uui-field-label">
                        대분류1
                      </label>
                      {/* <select
                        id="Contact-02-select"
                        name="Contact-02-select"
                        data-name="Contact 02 select"
                        required=""
                        class="uui-form_input-2 select w-select"
                      >
                        <option value="">선택하세요</option>
                        <option value="First">First Choice</option>
                        <option value="Second">Second Choice</option>
                        <option value="Third">Third Choice</option>
                      </select> */}
                    </div>
                    <div
                      id="w-node-_6f35a2c8-c584-7d24-5c97-a078e8c56621-6341e88b"
                      class="uui-form-field-wrapper"
                    >
                      <label for="Contact-02-select-2" class="uui-field-label">
                        대분류2
                      </label>
                      <select
                        id="Contact-02-select-2"
                        name="Contact-02-select-2"
                        data-name="Contact 02 Select 2"
                        required=""
                        class="uui-form_input-2 select w-select"
                      >
                        <option value="">선택하세요</option>
                        <option value="First">First Choice</option>
                        <option value="Second">Second Choice</option>
                        <option value="Third">Third Choice</option>
                      </select>
                    </div>
                    <div class="uui-form-field-wrapper">
                      <label for="Contact-02-message" class="uui-field-label">
                        설명
                      </label>
                      <textarea
                        id="Contact-02-message"
                        name="Contact-02-message"
                        maxLength="5000"
                        data-name="Contact 02 message"
                        placeholder="메세지를 입력하세요"
                        required=""
                        class="uui-form_input-2 text-area w-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: deepPurple[700],
                            "&.Mui-checked": {
                              color: deepPurple[600],
                            },
                          }}
                        />
                      }
                      label="개인정보 이용 방침에 동의합니다."
                    />

                    {/* <label
                  id="Contact-2-Checkbox"
                  class="w-checkbox uui-form-checkbox"
                >
                  <div class="w-checkbox-input w-checkbox-input--inputType-custom uui-form-checkbox-icon"></div>
                  <input
                    id="Contact-02-checkbox"
                    type="checkbox"
                    name="Contact-02-checkbox"
                    data-name="Contact 02 checkbox"
                    required=""
                    // style="opacity:0;position:absolute;z-index:-1"
                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                  />
                  <span
                    for="Contact-02-checkbox"
                    class="uui-form-checkbox-label w-form-label"
                  >
                    You agree to our friendly{" "}
                    <a href="#" class="uui-text-style-link-2">
                      privacy policy
                    </a>
                    .
                  </span>
                </label> */}
                    {/* <div
                  id="w-node-d19b111f-c02d-ece5-a0c7-33c8e050dd7d-6341e88b"
                  class="uui-form-button-wrapper"
                >
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    id="w-node-d19b111f-c02d-ece5-a0c7-33c8e050dd7e-6341e88b"
                    class="uui-button-3 w-button"
                    value="Record"
                  />
                </div> */}
                    <RecordAudio
                      audioUrl={audioUrl}
                      setAudioUrl={setAudioUrl}
                    ></RecordAudio>
                    <div
                      id="w-node-_117f8182-6ab1-24fe-b8b6-2da55d62a248-6341e88b"
                      class="uui-form-button-wrapper"
                    >
                      <input
                        type="submit"
                        data-wait="Please wait..."
                        id="w-node-_117f8182-6ab1-24fe-b8b6-2da55d62a249-6341e88b"
                        class="uui-button-3 w-button"
                        value="업로드"
                        onClick={() => {
                          uploadData(audioUrl);
                        }}
                      />
                    </div>
                    <ToastContainer
                      autoClose={1000}
                      progressClassName="purpleProgressBar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function createNewName(str) {
  // '@' 기준으로 문자열을 분리하고 첫 번째 부분(좌측)을 선택합니다.
  const leftPart = str.split("@")[0];

  // 현재 날짜와 시간을 가져옵니다.
  const now = new Date();
  // 시간, 분, 초를 HHMMSS 형식으로 포매팅합니다.
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((unit) => unit.toString().padStart(2, "0")) // 각 시간 단위를 두 자리로 맞춥니다.
    .join("");

  // 원하는 형식으로 문자열을 합쳐서 반환합니다.
  const result = `${leftPart}_${time}`;
  console.log(result);
  return result;
}
