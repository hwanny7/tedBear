import Card from 'components/video/VideoCard';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getLearningVideo } from 'utils/api/recordVideo';

interface card {
  title: string;
  id: string;
}

const StillLearningPage = () => {
  const [video, setVideo] = useState<card[]>([]);
  useEffect(() => {
    getLearningVideo();
    setVideo([
      {
        title:
          'How to Calm Your Anxiety, From a Neuroscientist | The Way We Work, a TED series',
        id: '6Af6b_wyiwI',
      },
      {
        title: 'The skill of self confidence | Dr. Ivan Joseph | TEDxRyersonU',
        id: 'RLESBHduKBs',
      },
      {
        title: 'The skill of self confidence | Dr. Ivan Joseph | TEDxRyersonU',
        id: 'wL8X31XWZW8',
      },
      {
        title:
          'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
        id: 'BEBKC7Hqfr0',
      },
      {
        title:
          'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
        id: 'LDVyOnf0t9M',
      },
      {
        title:
          'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
        id: 'JH_Pa1hOEVc',
      },
      {
        title:
          'How to motivate yourself to change your behavior | Tali Sharot | TEDxCambridge',
        id: '9XGm_uHit5g',
      },
    ]);
  }, []);

  const handleApi = () => {
    console.log('hi');
    let copy = video;
    copy = copy.concat(copy);
    console.log(copy);
    setVideo(copy);
  };

  return (
    <>
      <button onClick={() => handleApi()}>click!!</button>
      <h1 style={{ textAlign: 'center' }}>학습 중인 페이지</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
    </>
  );
};

export default StillLearningPage;
