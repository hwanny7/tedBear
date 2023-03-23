import Card from 'components/video/Card';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

interface card {
  title: string;
  id: string;
}

const StillLearningPage = () => {
  const [video, setVideo] = useState<card[]>([]);
  useEffect(() => {
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

  return (
    <Grid
      container
      justifyContent={'start'}
      style={{ height: '1vh', marginTop: '1vh' }}
    >
      {video.map((card, idx) => {
        return (
          <Grid
            item
            display="flex"
            justifyContent={'center'}
            alignItems={'center'}
            style={{ padding: '0px' }}
            lg={3}
            md={4}
            sm={6}
            xs={12}
            key={idx}
            // xs, extra-small: 0px
            // sm, small: 600px
            // md, medium: 900px
            // lg, large: 1200px
            // xl, extra-large: 1536px
          >
            <Card card={card} key={idx}></Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StillLearningPage;
