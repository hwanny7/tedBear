import Card from 'components/video/VideoCard';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useInView } from 'react-intersection-observer';
import { completedVideo } from 'utils/api/searchApi';
import { SearchedVideo } from './../utils/api/searchApi';
import styled from 'styled-components';
import { device } from 'utils/mediaQuery';

const VideoTitle = styled.h1`
  text-align: center;
  margin-top: 2%;

  color: ${props => props.theme.textColor1};

  @media ${device.mobile} {
    font-size: 10px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }

  @media ${device.laptop} {
    font-size: 30px;
  }

  @media ${device.desktop} {
    font-size: 30px;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.bgColor};
`;

const BottomDiv = styled.div`
  height: '10vh';
  background-color: ${props => props.theme.bgColor};
`;

const StillLearningPage = () => {
  const [video, setVideo] = useState<SearchedVideo[]>([]);

  const fetchData = async () => {
    const data = await completedVideo();
    setVideo(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <VideoTitle>
        {video.length ? '학습 완료 영상' : '학습 중인 영상이 없습니다.'}
      </VideoTitle>
      <ContentDiv>
        <Grid
          container
          justifyContent={'start'}
          style={{ height: '1%', marginTop: '1%', width: '90%' }}
        >
          {video.map((card, idx) => {
            return (
              <Grid
                item
                display="flex"
                justifyContent={'center'}
                alignItems={'center'}
                style={{
                  padding: '0px',
                  marginTop: '2%',
                  paddingLeft: '1%',
                  paddingRight: '1%',
                }}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                key={idx}
              >
                <Card card={card} key={idx} setVideo={setVideo}></Card>
              </Grid>
            );
          })}
        </Grid>
      </ContentDiv>
    </div>
  );
};

export default StillLearningPage;
