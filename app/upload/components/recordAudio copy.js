"use client";
import { useState, useEffect,useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { pink, deepPurple } from "@mui/material/colors";

export default function RecordAudio({ audioUrl, setAudioUrl }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordState, setRecordState] = useState(0);
  const playButtonRef = useRef(null); // "재생" 버튼을 위한 ref 생성

  useEffect(() => {
    async function getMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);

      mediaRecorder.ondataavailable = (event) => {
        setAudioChunks((currentChunks) => [...currentChunks, event.data]);
      };
    }

    getMedia();
  }, []);

  const startRecording = () => {
    setAudioChunks([]);
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    mediaRecorder.stop();
    setIsRecording(false);
    setRecordState((prev) => prev + 1);

    // "완료" 버튼 클릭 후 1초 뒤에 "재생" 버튼의 click 이벤트를 트리거
    setTimeout(() => {
      playButtonRef.current?.click();
    }, 1000);
  };

  const saveRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "recording.mpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 녹음이 완료된 오디오를 재생하기 위해 audioUrl 상태를 업데이트하는 함수
  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
  };

  console.log(audioUrl);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <ButtonGroup
            color="secondary"
            aria-label="Medium-sized button group"
            sx={{
              margin: "1.5rem",
              ".MuiButton-root": {
                // ButtonGroup 내의 모든 Button 컴포넌트에 적용
                backgroundColor: "#fff", // 배경색을 흰색으로 설정
                color: "#7F56D9", // 텍스트 색상을 #7F56D9로 설정
                borderColor: "#7F56D9", // 테두리 색상을 #7F56D9로 설정
                "&:hover": {
                  // 호버 상태
                  backgroundColor: "#f0e6ff", // 호버 상태에서의 배경색, 연한 보라색으로 설정하여 효과를 줌
                  borderColor: "#6842c2", // 호버 상태에서의 테두리 색상 변경
                },
              },
            }}
          >
            <Button onClick={startRecording} key="one" variant="outlined">
              녹음시작
            </Button>
            <Button
              className="completeButton"
              onClick={stopRecording}
              key="one"
              variant="outlined"
            >
              녹음종료
            </Button>
            <Button
              ref={playButtonRef}
              onClick={playRecording}
              className="playButton"
              key="two"
              variant="outlined"
            >
              재생하기
            </Button>
          </ButtonGroup>
        </>
        {<audio style={{ margin: "1rem" }} src={audioUrl} controls autoPlay />}{" "}
      </div>
    </div>
  );
}
