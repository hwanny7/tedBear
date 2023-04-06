import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getSentenceBookmark } from 'utils/api/bookmarkApi';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import Play from 'assets/img/play.svg';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import ShortsModal from 'components/short/ShortsModal';
import {
  postSentenceBookmark,
  deleteSentenceBookmark,
} from 'utils/api/learningApi';

interface IBookmarkSentence {
  no: number;
  content: string;
  translation: string;
  bookmarked: boolean;
  score: number;
  watchId: string;
  startTime: number;
  endTime: number;
}

const BookIn = styled.div`
  background-color: ${props => props.theme.learningBoxColor};
  background-color: ${props => props.theme.learningBoxColor};
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    padding: 10px;
  }

  @media (min-width: 450px) {
    padding: 20px;
  }

  @media (min-width: 700px) {
    padding: 30px;
  }
  /* right: 0%; */
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
  .play-shorts:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  .book-mark:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  .row {
    position: relative;
    width: 100%;
    /* height: 100%; */
    background-color: ${props => props.theme.learningBoxColor2};
    display: flex;

    margin-bottom: 20px;
    border-radius: 16px;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.203);
    padding: 24px;

    @media (max-width: 600px) {
      flex-direction: column;
    }
    @media (min-width: 600px) {
      flex-direction: row;
    }
  }
  .bookmark-container {
    position: absolute;
    top: 0;
    left: 10px;
    width: 24px;
    /* width: 5%; */
    /* height: 40px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    /* margin-right: 10px; */
    /* margin-bottom: 20px; */
  }
  .play-shorts-container {
    /* height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 20px; */
    /* width: 20%; */
    /* max-width: 100%; */
    /* height: 100%; */
    display: flex;

    /* margin-right: 10px; */
    /* border-radius: 4px; */
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
    /* transition: box-shadow 0.3s ease-in-out; */
    padding: 0px 24px;

    @media (max-width: 500px) {
      flex-direction: row;
      justify-content: end;
      align-items: end;

      img {
        width: 32px;
      }
    }

    @media (min-width: 500px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: start;
    }
  }

  .content-translation-wrapper {
    display: flex;
    flex-direction: column;
  }

  .content-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
    /* border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out; */
    padding: 10px;
    font-weight: bold;
    color: #1a1a1a;
    @media (max-width: 500px) {
      p {
        font-size: 14px;
      }
    }

    @media (min-width: 500px) {
      p {
        font-size: 16px;
      }
    }
  }
  .translation-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out; */
    padding: 10px;
    color: #1a1a1a;
    @media (max-width: 500px) {
      p {
        font-size: 14px;
      }
    }

    @media (min-width: 500px) {
      p {
        font-size: 16px;
      }
    }
  }
  .empty-caution {
    text-align: center;
    color: ${props => props.theme.textColor2};

    @media (max-width: 450px) {
      font-size: 20px;
    }

    @media (min-width: 450px) {
      font-size: 28px;
    }

    @media (min-width: 700px) {
      font-size: 40px;
    }
  }
  .study-btn {
    margin-top: 24px;
    color: white;
    border-radius: 50px;
    background-color: ${props => props.theme.pointColor};
    box-shadow: 2px 3px 6px #999999;
    cursor: pointer;

    &:hover {
      background-color: #e86e35;
      transition: all 0.3s;
      transform: translateY(3px);
    }

    @media (max-width: 450px) {
      padding: 16px 32px;
      font-size: 1rem;
    }

    @media (min-width: 450px) {
      padding: 24px 48px;
      font-size: 1.2rem;
    }

    @media (min-width: 700px) {
      padding: 24px 48px;
      font-size: 1.5rem;
    }
  }
  .button-set {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .sentences {
    padding: 24px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
  }
`;

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const BookmarkSentence = () => {
  const navigate = useNavigate();
  const [shorts, setShorts] = useState(null);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const [sentenceBookmark, setSentenceBookmark] = useState<IBookmarkSentence[]>(
    [],
  );
  const [ref, inView] = useInView({ threshold: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    const data: IBookmarkSentence[] = await getSentenceBookmark(page + 1);
    if (data.length) {
      // setSentenceBookmark(data);
      setSentenceBookmark(sentenceBookmark.concat(...data));
      // console.log(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log('fetch');
    fetchData();
  }, [page]);

  useEffect(() => {
    // console.log('inviewloading');
    if (inView && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, loading]);

  const handlePlay = (shorts: any) => {
    setShorts(shorts);
    setModalOpen(true);
  };

  const handleBookmark = () => {
    navigate('/home');
  };

  const handleMark = (sen: IBookmarkSentence, idx: number) => {
    // console.log('북마크를 켜고 끄고');
    const copy = [...sentenceBookmark];
    copy[idx].bookmarked = !copy[idx].bookmarked;
    // console.log(sen.bookmarked);
    if (copy[idx].bookmarked) {
      postSentenceBookmark({ sentenceNo: sen.no });
    } else {
      deleteSentenceBookmark({ sentenceNo: sen.no });
    }
    // console.log(sen.no, copy[idx].bookmarked);
    setSentenceBookmark(copy);
  };

  return (
    <BookIn>
      <div className="sentences">
        {sentenceBookmark.length === 0 ? (
          <div className="button-set">
            <p className="empty-caution">문장 북마크가 비어있어요!</p>
            <button className="study-btn" onClick={handleBookmark}>
              학습하러 가기
            </button>
            {/* <Button
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
            </Button> */}
          </div>
        ) : (
          <div className="sentence">
            {sentenceBookmark.map((sen, idx) => (
              <div className="row" key={sen.no}>
                <div className="bookmark-container">
                  <img
                    className="book-mark"
                    src={sen.bookmarked ? BookmarkFull : BookmarkEmpty}
                    onClick={() => {
                      handleMark(sen, idx);
                    }}
                    style={{ zIndex: 999 }} // 쇼츠보다는 아래로
                  ></img>
                </div>
                <div className="play-shorts-container">
                  <img
                    className="play-shorts"
                    onClick={() => handlePlay(sen)}
                    src={sen.no ? Play : Play}
                  ></img>
                </div>
                <div className="content-translation-wrapper">
                  <div className="content-container">
                    <p>{sen.content}</p>
                    {/* <br></br> */}
                  </div>
                  <div className="translation-container">
                    <p>{sen.translation}</p>
                    {/* <br></br> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={ref} style={{ height: '10vh' }}></div>
      </div>
      {modalOpen && <ShortsModal shorts={shorts} setOpenModal={setModalOpen} />}
    </BookIn>
  );
};

export default BookmarkSentence;
