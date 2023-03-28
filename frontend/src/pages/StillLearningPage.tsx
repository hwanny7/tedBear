import Card from 'components/video/VideoCard';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useInView } from 'react-intersection-observer';
import { learningVideo } from 'utils/api/searchApi';
import { SearchedVideo } from './../utils/api/searchApi';

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
    console.log('use!');
    if (inView && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, loading]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>학습 중인 페이지</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }} ref={ref}>
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
      </div>
      <div ref={ref} style={{ height: '10vh' }}></div>
    </div>
  );
};

export default StillLearningPage;
