import styled, { css } from 'styled-components';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import LearningMic from 'assets/img/learningMic.svg';
import LearningStop from 'assets/img/learningStop.svg';
import Dot from 'assets/img/dot.svg';
import VideoLevel from 'assets/img/videoLevel.svg';
import Dictionary from 'assets/img/dictionary.svg';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import {
  deleteSentenceBookmark,
  deleteVideoBookmark,
  getSentenceBookmarkState,
  getVideoDesc,
  postCompletedVideo,
  postCurrentVideo,
  postSentenceBookmark,
  postVideoBookmark,
  VideoDesc,
} from 'utils/api/learningApi';
import YouTube, { YouTubeProps } from 'react-youtube';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import DictionaryModal from 'components/learning/dictionaryModal';

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
`;

const YoutubeBox = styled.div`
  /* background-color: red; */
  height: 60%;
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
  }
`;

const SpeakBox = styled.div`
  background-color: ${props => props.theme.pointLigntGrdColor8};
  border-radius: 16px;
  height: 40%;
  padding: 24px;
  box-shadow: 2px 3px 3px ${props => props.theme.shadowColor};

  > div {
    background-color: ${props => props.theme.whiteColor};
    border-radius: 10px;
    width: 100%;
    height: 100%;
    padding: 16px;
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

  p {
    /* border: 1px solid blue; */
    font-weight: bold;
    font-size: 14px;
    width: 90%;
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
      console.log('기본');
      return `${props.theme.learningBoxDefaultColor}`;
    }
  }};
  height: 50%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  p {
    /* border: 1px solid blue; */
    font-size: 14px;
    width: 90%;
  }
`;

const LearningMicImg = styled.img`
  width: 24px;
  cursor: pointer;
`;

const LearningStopImg = styled(LearningMicImg)``;

const ContentRight = styled.div`
  /* border: 1px solid purple; */
  background-color: white;
  width: 40%;
  height: 100%;
  border-radius: 16px;
  box-shadow: 2px 3px 3px ${props => props.theme.shadowColor};
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
  margin-right: 16px;
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

  ${HighlightStyledProps => {
    if (HighlightStyledProps.highlight) {
      return `
      &:nth-child(${HighlightStyledProps.selected + 1}) > ${English}{
        background-color: #FFE4C6;
      }
      `;
    } else {
      return `
      &:nth-child(1) > ${English}{
        background-color: #FFE4C6;
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
  box-shadow: 2px 3px 3px ${props => props.theme.shadowColor};

  &:hover {
    background-color: #f08e25;
    transition: all 0.3s;
    transform: translateY(3px);
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

  // 유튜브 아이디 ==================================================
  const { videoId } = useParams() as { videoId: string };

  // VIDEO 아이디 Number ==================================================
  const [videoNumber, setVideoNumber] = useState<number>(0);

  // 받아온 data ===================================================
  const [videoDesc, setVideoDesc] = useState<VideoDesc>();

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
      '#FFA564',
      '#F6FF8E',
      '#ACFF8F',
      '#A6DFFF',
      '#9F9DFF',
      '#E9BAFF',
      '#FFD700',
      '#DBDBDB',
      '#CDAB8B',
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

    // video number
    if (videoDesc?.no !== undefined) {
      setVideoNumber(videoDesc?.no);
    }
  }, [videoDesc]);

  // 북마크  ===================================================
  // 영상
  const [bookmark, setBookmark] = useState<boolean | undefined>(
    videoDesc?.bookMarked,
  );
  // 북마크 클릭시 (등록 및 해제)
  const onBookmark = () => {
    setBookmark(!bookmark);

    const data = {
      videoNo: videoNumber,
    };
    if (bookmark) {
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
  };
  // 문장
  const [sentenceBookmark, setSentenceBookmark] = useState<boolean | undefined>(
    false,
  );
  const [senetenceId, setSentenceId] = useState<number>(0);

  // 유튜브 영상 설정  ===================================================
  const opts = {
    height: '560',
    width: '315',
    playerVars: {
      autoplay: 0,
    },
  };

  // 하이라이팅  ===================================================
  const [highlight, setHighlight] = useState<boolean>(false);
  const [selected, setSelected] = useState(0);
  const [youtubePlayer, setYoutubePlayer] = useState<any>();

  // player 준비시
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    const player = event.target;
    setYoutubePlayer(player);
  };

  // 문장 클릭
  const onSentenceClick = (
    index: any,
    startTime: number,
    sentenceIdx: number,
  ) => {
    setHighlight(true);
    setSelected(index);
    setSentenceId(sentenceIdx);

    // 유튜브 해당 시간으로 이동
    youtubePlayer?.seekTo(startTime);

    // 문장 북마크 여부 가져오기
    const getSentenceBookmark = async () => {
      const data = await getSentenceBookmarkState(sentenceIdx);
      setSentenceBookmark(data.bookmarked);
    };
    getSentenceBookmark();
  };

  const onSentenceBookmark = (id: number) => {
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
  };

  // 학습 시간 기록  ===================================================
  const [videoTime, setVideoTime] = useState(0);
  // 1초마다 영상 실행 시간 가져오기
  useEffect(() => {
    const watchTime = setInterval(() => {
      // 현재 시청 시간 state 저장
      setVideoTime(Math.floor(Number(youtubePlayer?.getCurrentTime())));
      // 실시간 하이라이팅
      let flag = false;
      let idx = 0;
      while (!flag) {
        if (
          videoDesc?.sentenceInfoList[idx].startTime &&
          videoDesc?.sentenceInfoList[idx].startTime <= videoTime &&
          videoTime <= videoDesc?.sentenceInfoList[idx + 1].startTime
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
      const data = {
        videoNo: videoId,
        videoProgressTime: videoTime.toString(),
      };
      const onRecordWatching = async () => {
        await postCurrentVideo(data);
      };
      onRecordWatching();
      clearInterval(watchTime);
    };
  });
  // 학습 완료
  const onComplete = () => {
    if (window.confirm('학습 완료 하시겠습니까?')) {
      // 학습 왼료 정보 보내기
      const data = {
        videoNo: videoId,
        videoProgressTime: videoTime.toString(),
      };
      const onCompleteVideo = async () => {
        await postCompletedVideo(data);
      };
      onCompleteVideo();
    }
  };

  // STT
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [micStatus, setMicStatus] = useState<boolean>(false);
  const [result, setResult] = useState(2); // 기본: 2, 맞:1, 틀: 0

  const onStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en' });
    setMicStatus(true);
  };

  const onStop = () => {
    SpeechRecognition.stopListening();
    onMatching();
    onReset();
    setMicStatus(false);
  };

  const onReset = () => {
    resetTranscript();
  };

  // 정답 매칭

  // 문자열 배열에 담기
  const onMatching = () => {
    // 스크립트 특수문자 제거하기
    // [\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.\\{}<>/]/gim;
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
                  'invert(81%) sepia(39%) saturate(1565%) hue-rotate(314deg) brightness(103%) contrast(101%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[1]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(87%) sepia(32%) saturate(529%) hue-rotate(20deg) brightness(110%) contrast(102%)',
              }}
            />
            <span> {videoDesc?.scoreInfo.sentenceScoreInfo[2]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(91%) sepia(13%) saturate(1340%) hue-rotate(47deg) brightness(101%) contrast(101%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[3]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(77%) sepia(31%) saturate(412%) hue-rotate(169deg) brightness(101%) contrast(103%)',
              }}
            />
            <span>{videoDesc?.scoreInfo.sentenceScoreInfo[4]}</span>
            <ViedoLevelImg
              src={VideoLevel}
              score={score}
              style={{
                filter:
                  'invert(69%) sepia(14%) saturate(6678%) hue-rotate(203deg) brightness(101%) contrast(101%)',
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
                  'invert(100%) sepia(99%) saturate(5796%) hue-rotate(215deg) brightness(103%) contrast(102%)',
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
            <br />그 외 unlanked 된 문장은 검정색으로 표시 됩니다
          </div>
        </ScoreChart>
        <p>{videoDesc?.title}</p>
      </TitleBox>
      <ContentBox>
        <ContentLeft>
          <YoutubeBox>
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
            {!bookmark ? (
              <BookmarkImg src={BookmarkEmpty} onClick={onBookmark} />
            ) : (
              <BookmarkImg src={BookmarkFull} onClick={onBookmark} />
            )}
          </YoutubeBox>
          <SpeakBox>
            <div>
              <SentenceBox>
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
                <p>{videoDesc?.sentenceInfoList[selected].content}</p>
              </SentenceBox>
              <MicBox result={result}>
                {!micStatus ? (
                  <LearningMicImg src={LearningMic} onClick={onStart} />
                ) : (
                  <LearningStopImg src={LearningStop} onClick={onStop} />
                )}
                <p>{transcript}</p>
              </MicBox>
            </div>
          </SpeakBox>
        </ContentLeft>
        <ContentRight>
          <ContentRightTop>
            <div>
              <p>KOR</p>
              <ToggleBtn toggle={toggle}>
                <Circle onClick={clickedToggle} toggle={toggle}></Circle>
              </ToggleBtn>
              <DotImg src={Dot} />
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
            <CompleteBtn onClick={onComplete}>Complete</CompleteBtn>
          </ContentRightFooter>
        </ContentRight>
      </ContentBox>
      {modalOpen && <DictionaryModal setOpenModal={setModalOpen} />}
      <DictionaryImg src={Dictionary} onClick={onDicModalOpen} />
    </Wrapper>
  );
};

export default LearningPage;
