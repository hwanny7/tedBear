import YouTube, { YouTubeProps } from 'react-youtube';
import styled from 'styled-components';
import { Shorts } from 'utils/api/recommApi';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import { ReactComponent as Shortcut } from 'assets/img/shortcut.svg';
import { device } from 'utils/mediaQuery';
import { useNavigate } from 'react-router-dom';
import {
  deleteSentenceBookmark,
  postSentenceBookmark,
} from 'utils/api/learningApi';
import { useSelector } from 'react-redux';

interface Props {
  shorts: Shorts | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShortsData?: React.Dispatch<React.SetStateAction<Shorts[]>>;
}

const CustomYoutube = styled(YouTube)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  iframe {
    border-radius: 12px;
  }
`;

const Wrapper = styled.div`
  border: 5px #e6e4f4 solid;
  border-radius: 16px;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  align-items: center;
`;

const SentenceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 12px;
  color: white;
  width: 100%;
  height: 20%;
  left: 0%;
  padding: 2%;
  bottom: 0%;
  background-color: #333;
  overflow-y: hidden;
  cursor: pointer;
  &:hover .text {
    text-decoration: underline;
    color: ${props => props.theme.mainLightColor};
    transition: all 0.3s;
    transform: translateY(3px);
  }
  &:hover .shortcut {
    fill: ${props => props.theme.mainLightColor};
    transition: all 0.3s;
    transform: translateY(3px);
  }

  .text {
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
  }
  .shortcut {
    width: 3%;
    height: 3%;
    fill: white;
    margin-left: 1%;
  }
`;

const ShortsModal = ({ shorts, setOpenModal, setShortsData }: Props) => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: any) => state.auth);

  const handleClick = (watchId: string | undefined) => {
    setOpenModal(false);
    navigate(`/learning/${watchId}`);
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

  const handleBookMark = (bookMark: any) => {
    const status = bookMark.bookmarked;
    if (setShortsData) {
      setShortsData(prev =>
        prev.map(item => {
          if (item === bookMark) {
            item.bookmarked = !item.bookmarked;
          }
          return item;
        }),
      );
      if (status) {
        deleteSentenceBookmark({ sentenceNo: bookMark.no });
      } else {
        postSentenceBookmark({ sentenceNo: bookMark.no });
      }
    }
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
          {shorts?.no && isLogin && (
            <img
              src={shorts?.bookmarked ? BookmarkFull : BookmarkEmpty}
              style={{
                height: '15%',
                position: 'absolute',
                left: '93%',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleBookMark(shorts);
              }}
            ></img>
          )}
          {shorts?.content && (
            <SentenceBox
              onClick={() => {
                handleClick(shorts?.watchId);
              }}
            >
              <p className="text">
                {shorts?.content}
                <Shortcut className="shortcut"></Shortcut>
              </p>
            </SentenceBox>
          )}
        </Wrapper>
      </YoutubeBox>
    </div>
  );
};

export default ShortsModal;
