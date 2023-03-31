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
// import VideoLevel from 'assets/img/videoLevel.svg';

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
  margin: 10px;
  padding: 10px;
  overflow-y: auto;

  /* 스크롤 */
  /* border: 1px solid black; */
  height: 90%;
  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: ${props => props.theme.mainLightColor};
    border-radius: 20px;
  }
  .videoes {
    position: relative;
    margin: 0;
    padding: 0;
  }
  .empty-caution {
    font-size: 50px;
    color: ${props => props.theme.mainLightColor};
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
    const data: IBookmarkVideo[] = await getVideoBookmark(page);
    if (data.length) {
      setVideoBookmark(data);
      console.log(data);
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

  return (
    <BookIn>
      <div className="videoes">
        {videoBookmark.length === 0 ? (
          <p className="empty-caution">북마크가 비어있어요!</p>
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
                      width: '100%',
                      height: '45vh',
                      position: 'relative',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                    }}
                    onClick={() => handleClick(Thumnail.watchId)}
                  >
                    <CardActionArea
                      sx={{
                        height: '200px',
                        width: '380px',
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
                          height: '200px',
                          width: '380px',
                        }}
                      />
                      <CardContent
                        key={idx}
                        sx={{
                          width: '100vw',
                          height: '30vh',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'auto',
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            position: 'absolute',
                            width: '350px',
                            justifyContent: 'center',
                            alignItems: 'center',
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
