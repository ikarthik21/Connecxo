import React, { useState, useRef, useEffect } from 'react';
import { BsFillPlayFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

const VoiceRecorder = ({ setShowVoice }) => {
  const [audioBlob, setAudioBlob] = useState(null);
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
 
  const [audioState, setAudioState] = useState({
    recording: false,
    paused: false,
    playing: false,
  });

  const [timer, setTimer] = useState(0);

  const startRecording = async () => {

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        setAudioBlob(blob);
        audioChunksRef.current = [];
        setAudioState({ recording: false, paused: false, playing: false });
      };

      mediaRecorder.start();
      setAudioState({ recording: true, paused: false, playing: false });

      // Start the recording timer
      setTimer(0);

      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval); // Clear the timer when the component unmounts
      };
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setAudioState({ recording: false, paused: false, playing: false });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setAudioState({ paused: true });
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setAudioState({ paused: false });
    }
  };

  const deleteRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    audioChunksRef.current = [];
    setAudioBlob(null);
    setAudioState({ recording: false, paused: false, playing: false });
  };

  const playAudio = () => {
    if (audioBlob && !audioState.playing) {
      const audioElement = new Audio(URL.createObjectURL(audioBlob));

      audioElement.play();
      setAudioState({ ...audioState, playing: true });
      audioElement.addEventListener('ended', () => {
        setAudioState({ ...audioState, playing: false });
      });
    } else if (audioBlob && audioState.playing) {
   
      setAudioState({ ...audioState, playing: false });
    }
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        {audioState.recording ? (
          <span>Recording Time: {formatTime(timer)}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      {audioState.recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <>
          {audioBlob && (
            <button onClick={playAudio}>
              {audioState.playing ? (

                <BsFillPauseCircleFill size={30} />
              ) : (
                <>

                  <BsFillPlayFill size={30} />

                </>
              )}
            </button>
          )}

          {!audioState.recording && (
            <button onClick={startRecording}>Start Recording</button>
          )}
        </>
      )}

      {audioState.recording && !audioState.paused && (
        <button onClick={pauseRecording}>Pause Recording</button>
      )}

      {audioState.recording && audioState.paused && (
        <button onClick={resumeRecording}>Resume Recording</button>
      )}

      {audioBlob && <button onClick={deleteRecording}><AiFillDelete /></button>}
    </div>
  );
};

export default VoiceRecorder;
