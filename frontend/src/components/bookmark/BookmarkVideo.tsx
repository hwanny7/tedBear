import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getVideoBookmark } from 'utils/api/bookmarkApi';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';

interface IBookmarkVideo {
  no: number;
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

const BookIn = styled.div`
  height: 80vh;
  padding: 10px;
  right: 0%;
  overflow: auto;
  /* paper's scroll */
  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: ${props => props.theme.mainLightColor};
    border-radius: 20px;
  }
  scroll-behavior: auto;
  //
  .videoes {
    position: relative;
    margin: 0;
    padding: 0;
  }
  .empty-caution {
    font-size: 50px;
    color: ${props => props.theme.mainLightColor};
  }
  .study-button {
    background: ${props => props.theme.pointLightColor};
  }
  .button-set {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const BookmarkVideo = () => {
  const navigate = useNavigate();
  const [videoBookmark, setVideoBookmark] = useState<IBookmarkVideo[]>([]);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const handleClick = (watchId: string): void => {
    navigate(`/learning/${watchId}`);
  };

  const fetchData = async () => {
    setLoading(true);
    const data: IBookmarkVideo[] = await getVideoBookmark(page + 1);
    if (data.length) {
      setVideoBookmark(videoBookmark.concat(...data));
      console.log(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    console.log('useEffect!');
    if (inView && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, loading]);

  const handleBookmark = () => {
    navigate('/home');
  };

  const handleMark = () => {
    console.log('북마크를 켜고 끄고');
  };

  return (
    <BookIn>
      <div className="videoes">
        {videoBookmark.length === 0 ? (
          <div className="button-set">
            <p className="empty-caution">북마크가 비어있어요!</p>
            <Button
              className="study-button"
              onClick={handleBookmark}
              variant="contained"
              size="large"
              style={{
                margin: '40px',
                padding: '10px',
                width: '15vw',
                height: '10vh',
                borderRadius: '15px',
                fontSize: '30px',
              }}
            >
              학습하러가기
            </Button>
          </div>
        ) : (
          <Grid
            container
            justifyContent={'flex-start'}
            style={{ height: '1%', width: '100%' }}
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
                    width: '80vw',
                    height: '80vh',
                  }}
                  lg={4}
                  md={6}
                  sm={8}
                  xs={12}
                  key={idx}
                >
                  <Card
                    key={idx}
                    sx={{
                      width: '80vw',
                      height: '80vh',
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                    }}
                    onClick={() => handleClick(Thumnail.watchId)}
                  >
                    <CardActionArea
                      sx={{
                        height: '100%',
                        width: '100',
                      }}
                    >
                      {/* <img
                        className="video-level"
                        src={VideoLevel}
                        style={{
                          height: '40%',
                          position: 'absolute',
                          top: '4%',
                          left: '4%',
                        }}
                      ></img> */}
                      <img
                        className="book-mark"
                        src={Thumnail.bookMarked ? BookmarkFull : BookmarkEmpty}
                        onClick={handleMark}
                        style={{
                          height: '50%',
                          position: 'absolute',
                          left: '20%',
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
                          height: '220px',
                          width: '380px',
                        }}
                      />
                      <CardContent
                        key={idx}
                        sx={{
                          width: '100vw',
                          height: '100vh',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            // position: 'absolute',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            width: '360px',
                            height: '80vh',
                          }}
                        >
                          {Thumnail.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
        <div ref={ref} style={{ height: '10vh' }}></div>
      </div>
    </BookIn>
  );
};

export default BookmarkVideo;
