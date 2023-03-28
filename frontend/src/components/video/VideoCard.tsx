import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import VideoLevel from 'assets/img/videoLevel.svg';
import { SearchedVideo } from 'utils/api/searchApi';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ card }: { card: SearchedVideo }) => {
  const navigate = useNavigate();
  const handleClick = (watchId: string) => {
    navigate(`/learning/${watchId}`);
  };

  return (
    <Card
      sx={{ height: '100%', position: 'relative' }}
      onClick={() => {
        handleClick(card.watchId);
      }}
    >
      <CardActionArea>
        <img
          src={VideoLevel}
          style={{ height: '12%', position: 'absolute', top: '4%', left: '4%' }}
        ></img>
        <img
          src={BookmarkFull}
          style={{ height: '15%', position: 'absolute', left: '90%' }}
        ></img>
        <CardMedia component="img" image={card.thumbnailUrl} alt="" />
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
