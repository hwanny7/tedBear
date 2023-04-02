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
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import DictionaryModal from 'components/learning/dictionaryModal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { warn } from 'console';

interface ToggleStyledProps {
  toggle: boolean;
}

interface HighlightStyledProps {
  highlight: boolean;
  selected: number;
}

interface BadgeProps {
  score: number;
}

interface SpeakerBoxProps {
  result: number;
}

const Wrapper = styled.div`
  /* border: 2px solid red; */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 56px 120px;
  position: relative;
`;

const TitleBox = styled.div`
  /* border: 1px solid blue; */

  height: 8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  p {
    font-weight: bold;
    font-size: 24px;
    margin-left: 16px;
    color: ${props => props.theme.textColor1};
  }
`;

const ScoreChart = styled.div`
  background-color: #ffffffed;
  border-radius: 16px;
  box-shadow: 6px 6px 8px #00000042;
  width: 500px;
  padding: 50px 24px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 15px;
  z-index: 5;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: -1;

  .apexcharts6wyl5juj {
    border: 1px solid red;
  }

  .apexcharts-legend {
    display: none;
  }

  > div:nth-last-child(3) {
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    span {
      padding-left: 8px;
      padding-right: 16px;
      font-size: 12px;
      font-weight: bold;
    }
  }
  > div:nth-last-child(2) {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    span {
      padding-left: 8px;
      padding-right: 16px;
      font-size: 12px;
      font-weight: bold;
    }
  }
  > div:nth-last-child(1) {
    width: 100%;
    margin-top: 20px;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    /* word-break: keep-all; */
    font-size: 14px;
    line-height: 24px;
    color: ${props => props.theme.blackColorLight2};
  }
`;

const ViedoLevelImg = styled.img<BadgeProps>`
  cursor: pointer;
  width: 32px;
  /* margin-right: 16px; */
  filter: ${props => {
    if (props.score == 0) {
      return `${props.theme.badgeRed}`;
    } else if (props.score == 1) {
      return `${props.theme.badgeOrange}`;
    } else if (props.score == 2) {
      return `${props.theme.badgeYellow}`;
    } else if (props.score == 3) {
      return `${props.theme.badgeGreen}`;
    } else if (props.score == 4) {
      return `${props.theme.badgeBlue}`;
    } else if (props.score == 5) {
      return `${props.theme.badgeIndigo}`;
    } else if (props.score == 6) {
      return `${props.theme.badgePurple}`;
    } else if (props.score == 7) {
      return `${props.theme.badgeBronze}`;
    } else if (props.score == 8) {
      return `${props.theme.badgeSilver}`;
    } else if (props.score == 9) {
      return `${props.theme.badgGold}`;
    } else {
      return `${props.theme.badgeUnlank}`;
    }
  }};

  // hover 시 다른 styledcomponent target 할 떄
  &:hover ~ ${ScoreChart} {
    opacity: 1;
    z-index: 4;
  }
`;

const ContentBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  height: 92%;
`;

const ContentLeft = styled.div`
  /* border: 1px solid green; */
  width: 60%;
  height: 100%;
  margin-right: 16px;
`;

const BookmarkImg = styled.img`
  width: 20px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 24px;
`;

const YoutubeBox = styled.div`
  /* background-color: red; */
  height: 55%;
  margin-bottom: 8px;
  position: relative;
  z-index: 3;

  ${BookmarkImg} {
    position: absolute;
    z-index: 9999;
    top: 0px;
    right: 24px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    z-index: 0;
    position: absolute;
    top: 0px;
    box-shadow: 6px 6px 20px #61616142;
  }
`;

const SpeakBox = styled.div`
  background-color: ${props => props.theme.speakBox};
  border-radius: 16px;
  height: 45%;
  padding: 40px 16px 16px;
  box-shadow: 6px 6px 20px #61616142;
  position: relative;

  > div {
    background-color: ${props => props.theme.learningBoxColor2};
    border-radius: 10px;
    width: 100%;
    height: 100%;
    /* padding: 16px; */
    display: flex;
    flex-direction: column;
  }
`;

const SentenceBox = styled.div`
  /* border: 1px solid black; */
  height: 50%;
  max-height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  /* overflow: scroll; */
  overflow-y: scroll;
  margin: 10px;
  padding: 0 32px;
  color: #1a1a1a;

  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer; // 커서 포인터 왜 안돼..
  }
  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: ${props => props.theme.mainLightColor};
    border-radius: 10px;
  }

  p {
    /* font-weight: bold; */
    font-size: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

const MicBox = styled.div<SpeakerBoxProps>`
  /* border: 1px solid black; */
  background-color: ${props => {
    if (props.result == 0) {
      // 틀
      console.log('틀림');
      return `${props.theme.learningBoxIncorrectColor}`;
    } else if (props.result == 1) {
      // 맞
      console.log('맞음');
      return `${props.theme.learningBoxCorrect}`;
    } else {
      // 기본
      return `${props.theme.learningBoxDefaultColor}`;
    }
  }};
  height: 50%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 0px 10px 10px;
  padding-top: 10px;
  color: #1a1a1a;

  p {
    padding: 0px 32px;
    font-size: 16px;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      cursor: pointer; // 커서 포인터 왜 안돼..
    }
    &::-webkit-scrollbar-thumb {
      height: 15%;
      background-color: ${props => props.theme.mainLightColor};
      border-radius: 10px;
    }
  }

  div {
    margin: 4px 0px;
  }
`;

const LearningMicImg = styled.img`
  width: 24px;
  cursor: pointer;
`;
const LearningStopImg = styled(LearningMicImg)``;
const LearningPauseImg = styled(LearningMicImg)``;
const LearningReplayImg = styled(LearningMicImg)`
  margin: 0 8px;
`;

const ContentRight = styled.div`
  /* border: 1px solid purple; */
  background-color: ${props => props.theme.learningBoxColor};
  width: 40%;
  height: 100%;
  border-radius: 16px;
  /* box-shadow: 2px 3px 3px ${props => props.theme.shadowColor}; */
  box-shadow: 6px 6px 20px #61616142;
`;

const ContentRightTop = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 24px;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    p {
      color: ${props => props.theme.textColor2};
      padding: 0 8px;
      font-size: 14px;
    }

    > div:nth-child(3) {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: #dadada84;
      }
    }
  }
`;

const ToggleBtn = styled.div<ToggleStyledProps>`
  background-color: ${ToggleStyledProps =>
    ToggleStyledProps.toggle ? '#FEAD55' : '#8E8E8E'};
  transition: 0.3s;
  border-radius: 50px;
  position: relative;
  width: 48px;
  height: 20px;
  display: flex;
  align-items: center;
  margin-right: 24px;
  cursor: pointer;
`;

const Circle = styled.div<ToggleStyledProps>`
  background: ${props => props.theme.whiteColor};
  width: 20px;
  height: 20px;
  z-index: 999;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 4px #00000053;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
  ${ToggleStyledProps =>
    ToggleStyledProps.toggle &&
    `
      transform: translateX(28px);
    `}
`;

const DotImg = styled.img`
  width: 4px;
  cursor: pointer;
`;

const ContentRightMiddle = styled.ul`
  /* border: 1px solid black; */
  overflow-y: scroll;
  height: 80%;

  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer; // 커서 포인터 왜 안돼..
  }
  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: ${props => props.theme.mainLightColor};
    border-radius: 10px;
  }
`;

const English = styled.span`
  margin-bottom: 14px;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.theme.textColor1};
`;

const Korean = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 8px;
  color: ${props => props.theme.textColor2};
`;

const ScriptEl = styled.li<HighlightStyledProps>`
  margin: 8px 32px 24px;

  ${props => {
    if (props.highlight) {
      return `
      &:nth-child(${props.selected + 1}) > ${English}{
        background-color:  ${props.theme.highlightColor};
      }
      `;
    } else {
      return `
      &:nth-child(1) > ${English}{
        background-color:  ${props.theme.highlightColor};
      }
      `;
    }
  }};
`;

const ContentRightFooter = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 24px;
`;

const CompleteBtn = styled.button`
  background-color: ${props => props.theme.pointLightColor};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  padding: 8px 16px;
  box-shadow: 2px 3px 3px #747474;

  &:hover {
    background-color: #fb9222;
    transition: all 0.3s;
    transform: translateY(3px);
    box-shadow: none;
  }
`;

const DictionaryImg = styled.img`
  width: 56px;
  z-index: 5;
  position: absolute;
  bottom: 24px;
  right: 24px;
  cursor: pointer;
`;

const LearningPage = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const clickedToggle = () => {
    setToggle(!toggle);
  };

  // 회원 정보 가져오기 ==================================================
  const { isLogin } = useSelector((state: any) => state.auth);

  // 유튜브 아이디 ==================================================
  const { videoId } = useParams() as { videoId: string };

  // VIDEO 아이디 Number ==================================================
  const [videoNumber, setVideoNumber] = useState<number>(0);

  // 받아온 data ===================================================
  const [videoDesc, setVideoDesc] = useState<VideoDesc>();

  // 유튜브 옵션
  const [opts, setOpts] = useState({});

  useEffect(() => {
    // 유튜브 상세 데이터 가져오기
    const fetchData = async () => {
      const data = await getVideoDesc(videoId);
      await setVideoDesc(data);
    };
    fetchData();
  }, []);

  // 유튜브 뱃지 색상 설정 및 뱃지 차트 만들기  ===================================================
  // 레벨
  const [score, setScore] = useState<number>(0);
  const chartOptions = {
    labels: [
      'level1',
      'level2',
      'level3',
      'level4',
      'level5',
      'level6',
      'level7',
      'level8',
      'level9',
      'level10',
      'unlanked',
    ],
    colors: [
      '#FF4949',
      '#FF8E3D',
      '#EBFF00',
      '#00FF38',
      '#2EB4FF',
      '#5F27FF',
      '#BC2FFF',
      '#CDAB8B',
      '#C6C6C6',
      '#BC2FFF',
      '#000000',
    ],
  };
  const [series, setSeries] = useState<number[]>();
  useEffect(() => {
    //뱃지 색상 설정
    if (videoDesc?.scoreInfo.score !== undefined) {
      setScore(videoDesc?.scoreInfo.score);
    }

    // 뱃지 차트 만들기
    if (videoDesc?.scoreInfo.sentenceScoreInfo !== undefined) {
      setSeries(videoDesc?.scoreInfo.sentenceScoreInfo);
    }

    // video number 설정
    if (videoDesc?.no !== undefined) {
      setVideoNumber(videoDesc?.no);
    }

    // 영상 북마크 갱신
    setVideoBookmark(videoDesc?.bookMarked);

    // 유튜브 영상 설정  ===================================================
    const opts = {
      height: '560',
      width: '315',
      playerVars: {
        autoplay: 0,
        start: videoDesc?.lastWatchingTime,
      },
    };

    setOpts(opts);
  }, [videoDesc]);

  // 북마크  ===================================================
  // 영상
  const [videoBookmark, setVideoBookmark] = useState<boolean | undefined>(
    false,
  );
  // 북마크 클릭시 (등록 및 해제)
  const onBookmark = () => {
    if (isLogin) {
      setVideoBookmark(!videoBookmark);

      const data = {
        videoNo: videoNumber,
      };
      if (videoBookmark) {
        // bookmark 해제 (true -> false)
        const delVideoBookmark = async () => {
          await deleteVideoBookmark(data);
        };
        delVideoBookmark();
      } else {
        // bookmark 등록 (false -> true)
        const insertVideoBookmark = async () => {
          await postVideoBookmark(data);
        };
        insertVideoBookmark();
      }
    } else {
      alert('로그인 후 이용해주세요.');
    }
  };

  // 문장
  const [sentenceBookmark, setSentenceBookmark] = useState<boolean | undefined>(
    false,
  );
  // 아래 있는 selected는 html에서 요소의 index값이거 sentencId는 db에 저장되어있는 문장 number
  const [senetenceId, setSentenceId] = useState<number>(0);

  // 실시간 하이라이팅  ===================================================
  const [highlight, setHighlight] = useState<boolean>(false);
  const [selected, setSelected] = useState(0);
  const [youtubePlayer, setYoutubePlayer] = useState<any>();

  // player 준비시
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    const player = event.target;
    setYoutubePlayer(player);
  };

  // 문장 클릭시 해당 시간으로 영상 이동, 북마크여부 가져오기 및 하이라이팅 하기
  const onSentenceClick = (
    index: any,
    startTime: number,
    sentenceIdx: number,
  ) => {
    setHighlight(true);
    setSelected(index);
    setSentenceId(sentenceIdx);

    // 스피커 박스
    SpeechRecognition.stopListening();
    onReset();
    setResult(2);

    // 유튜브 해당 시간으로 이동
    youtubePlayer?.seekTo(startTime);

    // 문장 북마크 여부 가져오기
    const getSentenceBookmark = async () => {
      const data = await getSentenceBookmarkState(sentenceIdx);
      setSentenceBookmark(data.bookmarked);
    };
    getSentenceBookmark();
  };

  //문장 북마크
  const onSentenceBookmark = (id: number) => {
    if (isLogin) {
      setSentenceBookmark(!sentenceBookmark);

      const data = {
        sentenceNo: id,
      };
      if (sentenceBookmark) {
        // bookmark 해제 (true -> false)
        const delSentenceBookmark = async () => {
          await deleteSentenceBookmark(data);
        };
        delSentenceBookmark();
      } else {
        // bookmark 등록 (false -> true)
        const insertSentenceBookmark = async () => {
          await postSentenceBookmark(data);
        };
        insertSentenceBookmark();
      }
    } else {
      alert('로그인 후 이용해주세요.');
    }
  };

  // 학습 시간 기록  ===================================================
  const [videoTime, setVideoTime] = useState(0);
  // 1초마다 영상 실행 시간 가져오기
  useEffect(() => {
    const watchTime = setInterval(() => {
      // 현재 시청 시간 state 저장
      const time = Math.floor(Number(youtubePlayer?.getCurrentTime()));
      console.log('watch');
      setVideoTime(time);
      // 실시간 하이라이팅
      let flag = false;
      let idx = selected;
      while (!flag) {
        if (
          videoDesc?.sentenceInfoList[idx].startTime &&
          videoDesc?.sentenceInfoList[idx].startTime <= time &&
          time <= videoDesc?.sentenceInfoList[idx + 1].startTime
        ) {
          flag = true;
          break;
        }

        idx++;
      }

      setHighlight(true);
      setSelected(idx);
    }, 1000);

    return () => {
      // 페이지 벗어날 때 시청 중인 영상 기록
      console.log('언마운트');
      if (isLogin) {
        const data = {
          videoNo: videoNumber,
          videoProgressTime: videoTime.toString(),
        };

        const onRecordWatching = async () => {
          await postCurrentVideo(data);
        };
        onRecordWatching();
      }

      clearInterval(watchTime);

      // 마이크 끠
      // SpeechRecognition.stopListening();
    };
  });
  // 학습 완료
  const onComplete = () => {
    if (isLogin) {
      if (window.confirm('학습 완료 하시겠습니까?')) {
        // 학습 왼료 정보 보내기
        const data = {
          videoNo: videoNumber,
          videoProgressTime: videoTime.toString(),
        };
        const onCompleteVideo = async () => {
          await postCompletedVideo(data);
        };
        onCompleteVideo();

        Swal.fire({
          title: '<p> 영상의 난이도가 어떠셨나요? </p>',
          icon: 'question',
          showCloseButton: false,
          showDenyButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '쉬워요',
          cancelButtonText: '평범해요',
          denyButtonText: '어려워요',
        }).then(result => {
          let data = {};
          if (result.isConfirmed) {
            // 쉬워요
            data = {
              difficulty: 'easy',
            };
          } else if (result.isDenied) {
            // 어려워요
            data = {
              difficulty: 'hard',
            };
          } else {
            // 평범해요
            data = {
              difficulty: 'normal',
            };
          }

          // api 보내기
          const postFeel = async () => {
            await feelDifficulty(data);
          };
          postFeel();
        });
      }
    } else {
      alert('로그인 후 이용해주세요.');
    }
  };

  // STT
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  // const [micStatus, setMicStatus] = useState<boolean>(false);
  const [result, setResult] = useState(2); // 기본: 2, 맞:1, 틀: 0

  // https://github.com/JamesBrill/react-speech-recognition/blob/HEAD/docs/API.md#SpeechRecognition
  const onStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    // setMicStatus(true);
    youtubePlayer.pauseVideo();
    setResult(2);
  };

  const onReplay = () => {
    resetTranscript();
  };

  const onStop = () => {
    SpeechRecognition.stopListening();
    onMatching();
    onReset();
    // setMicStatus(false);
  };

  const onReset = () => {
    resetTranscript();
  };

  // 정답 매칭

  const [check1, setCheck1] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>(false);
  // 문자열 배열에 담기
  const onMatching = () => {
    // 스크립트 특수문자 제거하기
    // [\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.\\{}<>/[]]/gim;
    // const str = 'AdmiN, **{}()! 1234.안녕[]<>\\/?';
    // const temp2 = str.replace(reg, '');
    const answer = videoDesc?.sentenceInfoList[selected].content
      .replace(reg, '')
      .toLowerCase()
      .split(' ');

    const speaker = transcript
      .toLowerCase()
      .replace(reg, '')
      .toLowerCase()
      .split(' ');

    // 정답 매칭
    let flag = 1;
    let idx = 0;
    if (answer?.length && speaker.length) {
      while (idx < answer.length && idx < speaker.length) {
        if (answer[idx] != speaker[idx]) {
          flag = 0;
          break;
        }
        idx++;
      }
    }

    setResult(flag);

    // flag == 1 맞  , flag == 0 틀
    // 스피킹 결과 api 보내기

    if (isLogin) {
      let temp;
      if (flag == 1) {
        temp = true;
      } else {
        temp = false;
      }
      const data = {
        matchStatus: temp,
        sentenceNo: senetenceId,
      };

      // api 보내기
      const postSpeakResult = async () => {
        await speakResult(data);
      };
      postSpeakResult();

      if (!check2) {
        Swal.fire({
          title: '<p>스피킹 결과가 <br/>경험치에 반영되었습니다.</p>',
          icon: 'success',
          input: 'checkbox',
          inputPlaceholder: '다시 보지 않기',
        }).then(el => {
          if (el.value) {
            setCheck2(true);
          }
        });
      }
    } else {
      if (!check1) {
        Swal.fire({
          title: '<p>테드베어 회원이 되셔서 <br/>경험치를 올려보세요!</p>',
          icon: 'warning',
          input: 'checkbox',
          inputPlaceholder: '다시 보지 않기',
        }).then(el => {
          if (el.value) {
            setCheck1(true);
          }
        });
      }
    }
  };

  // 사전
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onDicModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Wrapper>
      <TitleBox>
        <ViedoLevelImg src={VideoLevel} score={score} />
        <ScoreChart>
          <Chart
            options={chartOptions}
            series={series}
            type="donut"
            width="100%"
          />
          <div>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(46%) sepia(41%) saturate(6932%) hue-rotate(338deg) brightness(112%) contrast(100%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[0]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  ' invert(61%) sepia(77%) saturate(821%) hue-rotate(331deg) brightness(101%) contrast(102%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[1]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(93%) sepia(99%) saturate(1462%) hue-rotate(8deg) brightness(104%) contrast(103%)',
              }}
            />
            <span> {videoDesc?.scoreInfo.sentenceScoreInfo[2]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(74%) sepia(44%) saturate(1457%) hue-rotate(73deg) brightness(95%) contrast(124%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[3]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(53%) sepia(83%) saturate(1300%) hue-rotate(176deg) brightness(104%) contrast(101%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[4]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(18%) sepia(96%) saturate(6580%) hue-rotate(258deg) brightness(102%) contrast(102%)',
              }}
            />
            <span> {videoDesc?.scoreInfo.sentenceScoreInfo[5]}</span>
          </div>
          <div>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(32%) sepia(74%) saturate(6084%) hue-rotate(269deg) brightness(106%) contrast(102%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[6]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(76%) sepia(11%) saturate(861%) hue-rotate(348deg) brightness(92%) contrast(89%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[7]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(100%) sepia(1%) saturate(1139%) hue-rotate(69deg) brightness(90%) contrast(90%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[8]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(67%) sepia(8%) saturate(5821%) hue-rotate(9deg) brightness(117%) contrast(115%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[9]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(0%) sepia(0%) saturate(1%) hue-rotate(152deg) brightness(101%) contrast(102%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[10]}</span>
          </div>
          <div>
            현재 영상의 레벨은 문장들의 score를 평균내서 선정한 것입니다.
            <br />
            빨, 주, 노, 초, 파, 남, 보, 동, 은, 금 순으로 레벨이 높아집니다.
            <br />그 외 unranked 문장은 검정색으로 표시 됩니다
          </div>
        </ScoreChart>
        <p>{videoDesc?.title}</p>
      </TitleBox>
      <ContentBox>
        <ContentLeft>
          <YoutubeBox>
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
            {!videoBookmark ? (
              <BookmarkImg src={BookmarkEmpty} onClick={onBookmark} />
            ) : (
              <BookmarkImg src={BookmarkFull} onClick={onBookmark} />
            )}
          </YoutubeBox>
          <SpeakBox>
            {!sentenceBookmark ? (
              <BookmarkImg
                src={BookmarkEmpty}
                onClick={() => onSentenceBookmark(senetenceId)}
              />
            ) : (
              <BookmarkImg
                src={BookmarkFull}
                onClick={() => onSentenceBookmark(senetenceId)}
              />
            )}
            <div>
              <SentenceBox>
                <p>{videoDesc?.sentenceInfoList[selected].content}</p>
              </SentenceBox>
              <MicBox result={result}>
                <p>{transcript}</p>
                <div>
                  {listening ? (
                    <>
                      {/* <LearningPauseImg src={LearningPause} onClick={onStop} /> */}
                      <LearningReplayImg
                        src={LearningReplay}
                        onClick={onReplay}
                      />
                      <LearningStopImg src={LearningStop} onClick={onStop} />
                    </>
                  ) : (
                    <LearningMicImg src={LearningMic} onClick={onStart} />
                  )}
                </div>
              </MicBox>
            </div>
          </SpeakBox>
        </ContentLeft>
        <ContentRight>
          <ContentRightTop>
            <div>
              <p>KOR</p>
              <ToggleBtn toggle={toggle} onClick={clickedToggle}>
                <Circle toggle={toggle}></Circle>
              </ToggleBtn>
              <div>
                <DotImg src={Dot} />
              </div>
            </div>
          </ContentRightTop>
          <ContentRightMiddle>
            {videoDesc?.sentenceInfoList.map((el, index) => {
              return (
                <ScriptEl key={index} selected={selected} highlight={highlight}>
                  <English
                    onClick={() => onSentenceClick(index, el.startTime, el.no)}
                  >
                    {el.content}
                  </English>
                  {toggle && <Korean>{el.translation}</Korean>}
                </ScriptEl>
              );
            })}
          </ContentRightMiddle>
          <ContentRightFooter>
            <CompleteBtn onClick={onComplete}>학습 완료</CompleteBtn>
          </ContentRightFooter>
        </ContentRight>
      </ContentBox>
      {modalOpen && <DictionaryModal setOpenModal={setModalOpen} />}
      <DictionaryImg src={Dictionary} onClick={onDicModalOpen} />
    </Wrapper>
  );
};

export default LearningPage;
