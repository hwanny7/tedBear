import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import VideoLevel from 'assets/img/videoLevel.svg';
import { styled } from '@mui/system';

interface card {
  title: string;
  id: string;
}

const VideoCard = ({ card }: { card: card }) => {
  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <CardActionArea>
        <img
          src={VideoLevel}
          style={{ height: '12%', position: 'absolute', top: '4%', left: '4%' }}
        ></img>
        <img
          src={BookmarkFull}
          style={{ height: '15%', position: 'absolute', left: '90%' }}
        ></img>
        <CardMedia
          component="img"
          image={'https://i.ytimg.com/vi/' + card.id + '/maxresdefault.jpg'}
          alt=""
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: '90%' }}
          >
            {card.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
