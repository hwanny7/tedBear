import { useEffect, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const JuPage = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const onStart = () => {
    SpeechRecognition.startListening();
  };

  const onStop = () => {
    SpeechRecognition.stopListening();
  };

  const onReset = () => {
    resetTranscript();
  };

  // useEffect(() => {
  //   SpeechRecognition.startListening({ continuous: true, language: 'en' });
  //   console.log('Listening starts');
  // }, []);

  // https://www.youtube.com/watch?v=z2v1zSU25uE
  return (
    <div>
      {/* <textarea value={transcript}></textarea> */}
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onReset}>Reset</button>
      <p>transcript : {transcript}</p>
    </div>
  );
};

export default JuPage;
