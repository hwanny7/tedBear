import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import { SearchedVideo } from 'utils/api/searchApi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Badge from 'components/common/Badge';
import { deleteVideoBookmark, postVideoBookmark } from 'utils/api/learningApi';

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.learningBoxColor2};
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledCardContent = styled(CardContent)`
  background-color: ${props => props.theme.learningBoxColor};
  color: ${props => props.theme.textColor1};
  height: 100%;
`;

const ViedoLevelImg = styled.div`
  height: 12%;
  position: absolute;
  top: 4%;
  left: 4%;
`;

const StyledCardActionArea = styled(CardActionArea)`
  height: 100%;
`;

const VideoCard = ({
  card,
  setVideo,
}: {
  card: SearchedVideo;
  setVideo: React.Dispatch<React.SetStateAction<SearchedVideo[]>>;
}) => {
  const navigate = useNavigate();
  const handleClick = (watchId: string) => {
    navigate(`/learning/${watchId}`);
  };

  const handleVideoBm = (video: any) => {
    if (video.bookMarked) {
      deleteVideoBookmark({ videoNo: video.no });
    } else {
      postVideoBookmark({ videoNo: video.no });
    }
    setVideo(prev => {
      return prev.map(item => {
        if (item.no === video.no) {
          item.bookMarked = !item.bookMarked;
        }
        return item;
      });
    });
  };

  // sx={{
  //   height: '100%',
  //   width: '100%',
  //   position: 'relative',
  // }}
  return (
    <StyledCard>
      <StyledCardActionArea>
        <ViedoLevelImg>
          <Badge score={card.score} />
        </ViedoLevelImg>
        <img
          onClick={() => {
            handleVideoBm(card);
          }}
          src={card.bookMarked ? BookmarkFull : BookmarkEmpty}
          style={{
            height: '15%',
            position: 'absolute',
            left: '90%',
            cursor: 'pointer',
          }}
        ></img>
        <CardMedia
          component="img"
          image={card.thumbnailUrl}
          style={{ height: '200px' }}
          alt=""
          onClick={() => {
            handleClick(card.watchId);
          }}
        />
        <StyledCardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: '90%' }}
          >
            {card.title}
          </Typography>
        </StyledCardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default VideoCard;
