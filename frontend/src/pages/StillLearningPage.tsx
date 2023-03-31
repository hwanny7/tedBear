import Card from 'components/video/VideoCard';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useInView } from 'react-intersection-observer';
import { learningVideo } from 'utils/api/searchApi';
import { SearchedVideo } from './../utils/api/searchApi';
import styled from 'styled-components';

const ContentDiv = styled.div`
  display: 'flex';
  justify-content: 'center';
  background-color: ${props => props.theme.bgColor};
`;

const BottomDiv = styled.div`
  height: '10vh';
  background-color: ${props => props.theme.bgColor};
`;

const StillLearningPage = () => {
  const [video, setVideo] = useState<SearchedVideo[]>([]);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    const data = await learningVideo(page);
    if (data.length) {
      setVideo(prev => prev.concat(data));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    console.log('useEffect!');
    if (inView && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, loading]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2%' }}>
        {video.length ? '학습 중인 영상' : '학습 중인 영상이 없습니다.'}
      </h1>
      <ContentDiv ref={ref}>
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
                <Card card={card} key={idx}></Card>
              </Grid>
            );
          })}
        </Grid>
      </ContentDiv>
      <BottomDiv ref={ref}></BottomDiv>
    </div>
  );
};

export default StillLearningPage;
