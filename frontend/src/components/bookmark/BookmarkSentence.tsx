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

interface IBookmarkSentence {
  no: number;
  content: string;
  translation: string;
  bookMarked: boolean;
  score: number;
  watchId: string;
  startTime: number;
  endTime: number;
}

const BookIn = styled.div`
  height: 80vh;
  padding: 30px;
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
  .play-shorts:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  .book-mark:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
  .bookmark-container {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: left;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .play-shorts-container {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .content-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out;
    padding: 10px;
  }
  .translation-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out;
    padding: 10px;
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

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const BookmarkSentence = () => {
  const [shorts, setShorts] = useState(null);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const navigate = useNavigate();
  const [sentenceBookmark, setSentenceBookmark] = useState<IBookmarkSentence[]>(
    [],
  );
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    const data: IBookmarkSentence[] = await getSentenceBookmark(page);
    if (data.length) {
      setSentenceBookmark(data);
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

  const handlePlay = (shorts: any) => {
    delete shorts.bookmaked;
    setShorts(shorts);
    setModalOpen(true);
  };

  const handleBookmark = () => {
    // navigate('/home');
  };

  const handleMark = () => {
    console.log('북마크를 켜고 끄고');
  };

  return (
    <BookIn>
      <div className="sentences">
        {sentenceBookmark.length === 0 ? (
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
          <div className="sentence">
            {sentenceBookmark.map(sen => (
              <div className="row" key={sen.no}>
                <div className="bookmark-container">
                  <img
                    className="book-mark"
                    src={sen.bookMarked ? BookmarkEmpty : BookmarkFull}
                    onClick={handleMark}
                  ></img>
                </div>
                <div className="play-shorts-container">
                  <img
                    className="play-shorts"
                    onClick={() => handlePlay(sen)}
                    src={sen.no ? Play : Play}
                  ></img>
                </div>
                <div className="content-container">
                  <p>{sen.content}</p>
                  <br></br>
                </div>
                <div className="translation-container">
                  <p>{sen.translation}</p>
                  <br></br>
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
