import React, { useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import styled from 'styled-components';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  shorts: string;
}

const DarkBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9998;
`;

const CustomYoutube = styled(YouTube)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  border: 3px red solid;
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.26%;
`;

const YoutubeBox = styled.div`
  min-width: 50%;
  min-height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  align-items: center;
`;

const ShortsModal = ({ setOpenModal, shorts }: Props) => {
  <DarkBackground onClick={() => setOpenModal(false)} />;
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    const player = event.target;
    player.playVideo();
  };

  const onPlayerStateChange: YouTubeProps['onStateChange'] = event => {
    if (!event.data) {
      const player = event.target;
      player.seekTo(0);
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
      start: 5,
      end: 10,
      controls: 0,
      disablekb: 1,
      // autoplay: 1,
      // mute: 1,
      rel: 0, // 해당 채널의 관련 영상만 띄어줌
    },
  };

  return (
    <div>
      <DarkBackground onClick={() => setOpenModal(false)} />
      <YoutubeBox>
        <Wrapper>
          <CustomYoutube
            videoId={shorts}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
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
