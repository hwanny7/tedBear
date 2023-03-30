import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getSentenceBookmark } from 'utils/api/bookmarkApi';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import Play from 'assets/img/play.svg';
import { useNavigate } from 'react-router-dom';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { useInView } from 'react-intersection-observer';

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
  position: absolute;
  max-height: 800px;
  margin: 30px 30px 30px 30px;
  padding: 30px 30px 30px 30px;
  overflow-y: auto;

  /* 스크롤 */
  /* border: 1px solid black; */

  right: 0%;
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
  .play-shorts:hover {
    opacity: 0.5; /* change opacity when hovered */
    cursor: pointer; /* change cursor to pointer when hovered */
  }
  .book-mark:hover {
    opacity: 0.5; /* change opacity when hovered */
    cursor: pointer; /* change cursor to pointer when hovered */
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .bookmark-container {
    height: 40px;
    display: flex;
    justify-content: left;
    align-items: left;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .play-shorts-container {
    height: 40px;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .content-container {
    max-width: 50%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
  }

  .translation-container {
    max-width: 50%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-left: 10px;
  }
`;

const BookmarkSentence = () => {
  const navigate = useNavigate();
  const [sentenceBookmark, setSentenceBookmark] = useState<IBookmarkSentence[]>(
    [],
  );
  const [hasMore, setHasMore] = useState(true);
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

  // const fetchMore = async () => {
  //   const data: IBookmarkSentence[] = await getSentenceBookmark();
  //   // setSentenceBookmark(data);
  //   console.log(data);
  //   setSentenceBookmark([...sentenceBookmark, ...data]);
  //   setHasMore(data.length > 0); // true
  // };

  const handlePlay = () => {
    navigate('/home');
  };
  return (
    <BookIn>
      <div className="sentences">
        {/* <InfiniteScroll
          dataLength={sentenceBookmark.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        > */}
        <div className="sentence">
          {sentenceBookmark.map(sen => (
            <div className="row" key={sen.no}>
              <div className="bookmark-container">
                <img
                  className="book-mark"
                  src={sen.bookMarked ? BookmarkEmpty : BookmarkFull}
                ></img>
              </div>
              <div className="play-shorts-container">
                <img
                  className="play-shorts"
                  onClick={handlePlay}
                  src={sen.no ? Play : Play}
                ></img>
              </div>
              <div className="cotent-container">
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
        {/* </InfiniteScroll> */}
        <div ref={ref} style={{ height: '10vh' }}></div>
      </div>
    </BookIn>
  );
};

export default BookmarkSentence;
