import styled, { css } from 'styled-components';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import LearningMic from 'assets/img/learningMic.svg';
import LearningStop from 'assets/img/learningStop.svg';
import LearningPause from 'assets/img/learningPause.svg';
import LearningReplay from 'assets/img/learningReplay.svg';
import Dot from 'assets/img/dot.svg';
import VideoLevel from 'assets/img/videoLevel.svg';
import Dictionary from 'assets/img/dictionary.svg';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import {
  deleteSentenceBookmark,
  deleteVideoBookmark,
  feelDifficulty,
  getSentenceBookmarkState,
  getVideoDesc,
  postCompletedVideo,
  postCurrentVideo,
  postSentenceBookmark,
  postVideoBookmark,
  speakResult,
  VideoDesc,
} from 'utils/api/learningApi';
import YouTube, { YouTubeProps } from 'react-youtube';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useNavigate, useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import DictionaryModal from 'components/learning/dictionaryModal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Wrapper = styled.div`
  /* border: 2px solid red; */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 56px 120px;
  position: relative;
`;

const Box = styled.div`
  border-radius: 50px;
  width: 500px;
  height: 330px;
  box-shadow: 6px 6px 20px #61616142;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  padding: 32px 64px;
  justify-content: end;

  p:nth-child(1) {
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 16px;
    color: ${props => props.theme.textColor1};
  }

  p:nth-child(2) {
    font-size: 18px;
    margin-bottom: 16px;
    /* color: #ffffffad; */
    color: ${props => props.theme.textColor2};
  }

  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
  }
`;

const PuzzleDiv = styled.div`
  /* border: 1px solid red; */
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Box} {
    /* background: linear-gradient(
      220deg,
      rgba(255, 182, 170, 1) 0%,
      rgba(255, 144, 124, 1) 42%,
      rgba(255, 97, 70, 1) 76%,
      rgba(249, 50, 15, 1) 100%
    ); */
    background-color: white;
  }
`;

const CrossDiv = styled.div`
  /* border: 1px solid red; */
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Box} {
    /* background: linear-gradient(
      220deg,
      rgba(204, 232, 171, 1) 0%,
      rgba(180, 228, 124, 1) 42%,
      #8ede32 76%,
      #65b20d 100%
    ); */
    background-color: white;
  }
`;

const GameSelectPage = () => {
  const navigate = useNavigate();

  const goPuzzle = () => {
    navigate('/game/detail');
  };

  const goCross = () => {
    navigate('/cross-word');
  };

  return (
    <Wrapper>
      <PuzzleDiv>
        <Box onClick={goPuzzle}>
          <p>퍼즐</p>
          <p>단어를 맞춰서 귀여운 그림을 모아보세요!</p>
        </Box>
      </PuzzleDiv>
      <CrossDiv>
        <Box onClick={goCross}>
          <p>십자말풀이</p>
          <p>단어를 맞춰서 격자판을 채워보세요! </p>
        </Box>
      </CrossDiv>
    </Wrapper>
  );
};

export default GameSelectPage;
