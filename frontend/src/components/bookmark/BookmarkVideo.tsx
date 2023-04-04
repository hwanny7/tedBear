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
import Grid from '@mui/material/Grid';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';
import { postVideoBookmark, deleteVideoBookmark } from 'utils/api/learningApi';

interface IBookmarkVideo {
  no: number;
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

const BookIn = styled.div`
  height: 100%;
  width: 100%;
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
    height: 100%;
    width: 100%;
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

  const handleMark = (Thumnail: IBookmarkVideo, idx: number) => {
    console.log('북마크를 켜고 끄고');
    const copy = [...videoBookmark];
    copy[idx].bookMarked = !copy[idx].bookMarked;
    console.log(Thumnail.bookMarked);
    if (copy[idx].bookMarked) {
      postVideoBookmark({ videoNo: Thumnail.no });
    } else {
      deleteVideoBookmark({ videoNo: Thumnail.no });
    }
    console.log(Thumnail.no, copy[idx].bookMarked);
    setVideoBookmark(copy);
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
            style={{ height: '100%', width: '100%' }}
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
                    width: '100%',
                  }}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  key={idx}
                >
                  <Card
                    key={idx}
                    sx={{
                      // height: '100%',
                      width: '100%',
                      position: 'relative',
                    }}
                    // onClick={() => handleClick(Thumnail.watchId)}
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
                      src={Thumnail.bookMarked ? BookmarkFull : BookmarkEmpty}
                      className="book-mark"
                      onClick={() => {
                        handleMark(Thumnail, idx);
                      }}
                      style={{
                        height: '15%',
                        position: 'absolute',
                        right: '5%',
                        zIndex: 9999,
                        cursor: 'pointer',
                      }}
                    ></img>
                    <CardMedia
                      component="img"
                      image={
                        'https://i.ytimg.com/vi/' +
                        Thumnail.watchId +
                        '/maxresdefault.jpg'
                      }
                      alt=""
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: 'green',
                      }}
                      onClick={() => handleClick(Thumnail.watchId)}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        height="30px"
                        style={{ fontSize: '90%' }}
                      >
                        {Thumnail.title}
                      </Typography>
                    </CardContent>
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
