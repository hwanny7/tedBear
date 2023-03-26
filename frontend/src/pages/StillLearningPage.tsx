import Card from 'components/video/VideoCard';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
<<<<<<< HEAD
import Typography from '@mui/material/Typography';
import { getLearningVideo } from 'utils/api/recordVideo';
=======
import { useInView } from 'react-intersection-observer';
>>>>>>> be3987588a1ccaa058e36bffe0e2b57944c47419

interface card {
  title: string;
  id: string;
}

const StillLearningPage = () => {
  const [video, setVideo] = useState<card[]>([]);
<<<<<<< HEAD
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
=======
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
>>>>>>> be3987588a1ccaa058e36bffe0e2b57944c47419

  useEffect(() => {
    console.log('hi');
    setLoading(true);
    setVideo(prev =>
      prev.concat([
        {
          title:
            'How to Calm Your Anxiety, From a Neuroscientist | The Way We Work, a TED series',
          id: '6Af6b_wyiwI',
        },
        {
          title:
            'The skill of self confidence | Dr. Ivan Joseph | TEDxRyersonU',
          id: 'RLESBHduKBs',
        },
        {
          title:
            'The skill of self confidence | Dr. Ivan Joseph | TEDxRyersonU',
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
      ]),
    );
    setLoading(false);
  }, [page]);

  useEffect(() => {
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
