"use client";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { pink, deepPurple } from "@mui/material/colors";

function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(""); // 녹음된 오디오의 URL을 저장하기 위한 상태
  const [recordState, setRecordState] = useState(0);
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

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
    setRecordState((prev) => prev + 1);
  };

  const saveRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "recording.wav";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    playRecording();
  }, [setRecordState]);

  // 녹음이 완료된 오디오를 재생하기 위해 audioUrl 상태를 업데이트하는 함수
  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
  };

  console.log(audioUrl);

  return (
    <div>
      <div
        id="w-node-_117f8182-6ab1-24fe-b8b6-2da55d62a248-6341e88b"
        class="uui-form-button-wrapper"
      >
        <input
          type="button"
          data-wait="Please wait..."
          id="w-node-d19b111f-c02d-ece5-a0c7-33c8e050dd7e-6341e88b"
          class="uui-button-3 w-button"
          value={isRecording ? "녹음중..." : "녹음하기"}
          onClick={() => (isRecording ? stopRecording() : startRecording())}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!isRecording && audioChunks.length > 0 && (
          <>
            {/* <button style={{ margin: "1rem" }} >
              다운로드
            </button>
            <button style={{ margin: "1rem" }} >
              재생
            </button> */}
            <ButtonGroup
              color="secondary"
              aria-label="Medium-sized button group"
              sx={{
                margin:"1.5rem"
              }}
            >
              <Button onClick={saveRecording} key="one">다운로드</Button>
              <Button onClick={playRecording} key="two">재생</Button>,
            </ButtonGroup>
          </>
        )}
        {audioUrl && (
          <audio style={{ margin: "1rem" }} src={audioUrl} controls autoPlay />
        )}{" "}
        {/* 오디오 플레이어 */}
      </div>
    </div>
  );
}

export default RecordAudio;
