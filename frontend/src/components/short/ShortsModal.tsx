import YouTube, { YouTubeProps } from 'react-youtube';
import styled from 'styled-components';
import { Shorts } from 'utils/api/recommApi';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import { device } from 'utils/mediaQuery';
import { useNavigate } from 'react-router-dom';

interface Props {
  shorts: Shorts | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShortsData: React.Dispatch<React.SetStateAction<Shorts[]>>;
}

const CustomYoutube = styled(YouTube)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.26%;
  .btn {
    position: absolute;
    background: #f08e25;
    left: 86%;
    width: 8%;
    height: 8%;
    color: white;
    border-radius: 16px;
    bottom: 0%;
    z-index: 999;
    &:hover {
      background-color: #e67f51;
      transition: all 0.3s;
      transform: translateY(3px);
    }
  }
`;

const YoutubeBox = styled.div`
  min-width: 60%;
  min-height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  align-items: center;
`;

const SentenceBox = styled.div`
  text-align: center;
  position: absolute;
  color: white;
  width: 80%;
  border-radius: 16px;
  left: 10%;
  padding: 1%;
  bottom: 2%;
  background-color: black;
  /* background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  ); */
  @media ${device.mobile} {
    font-size: 5px;
  }

  @media ${device.tablet} {
    font-size: 8px;
  }

  @media ${device.laptop} {
    font-size: 16px;
  }

  @media ${device.desktop} {
    font-size: 20px;
  }
`;

const ShortsModal = ({ shorts, setOpenModal, setShortsData }: Props) => {
  const navigate = useNavigate();

  const handleClick = (watchId: string | undefined) => {
    setOpenModal(false);
    navigate('/learning', { state: watchId });
  };

  const onPlayerReady: YouTubeProps['onReady'] = event => {
    const player = event.target;
    player.unloadModule('captions'); //Works for html5 ignored by AS3
    player.unloadModule('cc'); //Works for AS3 ignored by html5
    // playRef.current = player;
    player.playVideo();
  };

  const onPlayerStateChange: YouTubeProps['onStateChange'] = event => {
    if (!event.data) {
      const player = event.target;
      player.seekTo(shorts?.startTime);
      player.playVideo();
    }
    // 1 재생 중, 2 일시중지, 0 종료 https://developers.google.com/youtube/iframe_api_reference?hl=ko#onPlaybackRateChange
    // https://github.com/tjallingt/react-youtube/issues/187 재생시간 바꾸기
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: shorts?.startTime,
      end: shorts?.endTime,
      controls: 0,
      disablekb: 1,
      cc_load_policy: 0,
      // autoplay: 1,
      // mute: 1,
      rel: 0, // 해당 채널의 관련 영상만 띄어줌
    },
  };

  return (
    <div>
      <YoutubeBox>
        <Wrapper>
          <CustomYoutube
            videoId={shorts?.watchId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
          <img
            src={shorts?.bookmarked ? BookmarkFull : BookmarkEmpty}
            style={{
              height: '15%',
              position: 'absolute',
              left: '93%',
              cursor: 'pointer',
            }}
          ></img>
          <button
            className="btn"
            onClick={() => {
              handleClick(shorts?.watchId);
            }}
          >
            Watch
          </button>
          <SentenceBox>{shorts?.content}</SentenceBox>
        </Wrapper>
      </YoutubeBox>
    </div>
  );
};

export default ShortsModal;

// https://codesandbox.io/s/react-youtube-demo-f6l29?file=/src/App.js:1047-1049 관련 영상 숨기는 방법
// https://www.npmjs.com/package/react-youtube
// https://codepen.io/hwanny7/pen/RwYBjWW?editors=1000 자동재생 방법

//   const playerRef = useRef<any>();
// ref={playerRef}
