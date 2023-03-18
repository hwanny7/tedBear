import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const SeungPage = () => {
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
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
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: 0,
      end: 10,
      controls: 0,
      autoplay: 1,
      rel: 0, // 해당 채널의 관련 영상만 띄어줌
    },
  };

  return (
    <YouTube
      videoId="6Af6b_wyiwI"
      opts={opts}
      onReady={onPlayerReady}
      onStateChange={onPlayerStateChange}
    />
  );
};

export default SeungPage;

// https://codesandbox.io/s/react-youtube-demo-f6l29?file=/src/App.js:1047-1049 관련 영상 숨기는 방법
// https://www.npmjs.com/package/react-youtube
// https://codepen.io/hwanny7/pen/RwYBjWW?editors=1000 자동재생 방법
