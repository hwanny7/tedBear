import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import VideoLevel from 'assets/img/videoLevel.svg';
import { styled } from '@mui/system';

interface card {
  title: string;
  id: string;
}

// const StyledCard = styled.div`
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
//   transition: 0.4s;
//   &:hover {
//     scale: 1.04;
//     box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
//     transition: 0.4s;
//   }
//   > img {
//     width: 100%;
//     border-radius: 16px;
//   }
// `;

const VideoCard = ({ card }: { card: card }) => {
  return (
    <Card>
      <CardHeader
        style={{ padding: '0' }}
        avatar={
          <IconButton aria-label="settings">
            <img src={VideoLevel} style={{ height: '80%' }}></img>
          </IconButton>
        }
        action={
          <IconButton aria-label="settings" style={{ paddingTop: '0' }}>
            <img src={BookmarkFull} style={{ height: '80%' }}></img>
          </IconButton>
        }
      />
      <CardActionArea>
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
            style={{ fontSize: '80%' }}
          >
            {card.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
