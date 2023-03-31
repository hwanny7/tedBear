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
import styled from 'styled-components';

interface BadgeProps {
  score: number;
}

const ViedoLevelImg = styled.img<BadgeProps>`
  height: 12%;
  position: absolute;
  top: 4%;
  left: 4%;
  filter: ${props => {
    if (props.score == 0) {
      return `${props.theme.badgeRed}`;
    } else if (props.score == 1) {
      return `${props.theme.badgeOrange}`;
    } else if (props.score == 2) {
      return `${props.theme.badgeYellow}`;
    } else if (props.score == 3) {
      return `${props.theme.badgeGreen}`;
    } else if (props.score == 4) {
      return `${props.theme.badgeBlue}`;
    } else if (props.score == 5) {
      return `${props.theme.badgeIndigo}`;
    } else if (props.score == 6) {
      return `${props.theme.badgePurple}`;
    } else if (props.score == 7) {
      return `${props.theme.badgeBronze}`;
    } else if (props.score == 8) {
      return `${props.theme.badgeSilver}`;
    } else if (props.score == 9) {
      return `${props.theme.badgGold}`;
    } else {
      return `${props.theme.badgeUnlank}`;
    }
  }};
`;

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
        <ViedoLevelImg src={VideoLevel} score={card.score} />
        <img
          src={card.bookMarked ? BookmarkFull : BookmarkEmpty}
          style={{ height: '15%', position: 'absolute', left: '90%' }}
        ></img>
        <CardMedia
          component="img"
          image={card.thumbnailUrl}
          style={{ height: '200px' }}
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
