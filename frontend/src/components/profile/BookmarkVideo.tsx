import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getVideoBookmark } from 'utils/api/bookmarkApi';
import VideoLevel from 'assets/img/videoLevel.svg';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

interface IBookmarkVideo {
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

const BookIn = styled.div`
  position: absolute;
  max-height: 800px;
  overflow: auto;
  margin: 20px;
  overflow: auto;

  /* 스크롤 */
  /* border: 1px solid black; */

  height: 80%;
  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: ${props => props.theme.pointColor};
    border-radius: 20px;
  }
`;

const BookmarkVideo = () => {
  const navigate = useNavigate();
  const [videoBookmark, setVideoBookmark] = useState<IBookmarkVideo[]>([]);

  const handleClick = (watchId: string): void => {
    navigate(`/learning/${watchId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: IBookmarkVideo[] = await getVideoBookmark();
      setVideoBookmark(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <BookIn>
      <div>
        {/* {videoBookmark} */}
        <Grid
          container
          justifyContent={'start'}
          style={{ height: '1%', marginTop: '1%', width: '90%' }}
        >
          {videoBookmark.map((Thumnail, idx) => {
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
                <Card
                  key={idx}
                  sx={{
                    width: '100vw',
                    height: '50vh',
                    position: 'relative',
                    justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: 'pink',
                  }}
                  onClick={() => handleClick(Thumnail.watchId)}
                >
                  <CardActionArea>
                    <img
                      src={VideoLevel}
                      style={{
                        height: '40%',
                        position: 'absolute',
                        top: '4%',
                        left: '4%',
                      }}
                    ></img>
                    <img
                      src={Thumnail.bookMarked ? BookmarkFull : BookmarkEmpty}
                      className="book-mark"
                      style={{
                        height: '40%',
                        position: 'absolute',
                        left: '95%',
                      }}
                    ></img>
                    <CardMedia
                      className="main-img"
                      component="img"
                      image={
                        'https://i.ytimg.com/vi/' +
                        Thumnail.watchId +
                        '/maxresdefault.jpg'
                      }
                      alt=""
                      sx={{
                        height: '200px', // adjust the height as needed
                        width: '400px',
                      }}
                    />
                    <CardContent
                      key={idx}
                      sx={{
                        width: '100vw',
                        height: '30vh',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'auto',
                      }}
                    >
                      <Typography component="div">{Thumnail.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </BookIn>
  );
};

export default BookmarkVideo;
