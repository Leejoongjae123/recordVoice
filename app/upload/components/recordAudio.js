'use client'
import { useState, useEffect } from 'react';

function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    // 사용자의 미디어 장치에 접근 권한 요청
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
    setAudioChunks([]); // 새로운 녹음을 위해 이전 청크들 초기화
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const saveRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'recording.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={() => isRecording ? stopRecording() : startRecording()}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {!isRecording && audioChunks.length > 0 && (
        <button onClick={saveRecording}>Save Recording</button>
      )}
    </div>
  );
}

export default RecordAudio;
