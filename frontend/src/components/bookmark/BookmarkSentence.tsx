import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getSentenceBookmark } from 'utils/api/bookmarkApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import Play from 'assets/img/play.svg';
import { useNavigate } from 'react-router-dom';
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
  margin: 30px 30px 30px 80px;
  padding: 30px 30px 30px 30px;
  overflow-y: auto;

  /* 스크롤 */
  /* border: 1px solid black; */

  right: 5%;
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
  .image-hover:hover {
    opacity: 0.5; /* change opacity when hovered */
    cursor: pointer; /* change cursor to pointer when hovered */
  }
  .book-mark:hover {
    opacity: 0.5; /* change opacity when hovered */
    cursor: pointer; /* change cursor to pointer when hovered */
  }
`;

const BookmarkSentence = () => {
  const navigate = useNavigate();
  const [sentenceBookmark, setSentenceBookmark] = useState<IBookmarkSentence[]>(
    [],
  );
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data: IBookmarkSentence[] = await getSentenceBookmark();
      setSentenceBookmark(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const fetchMore = async () => {
    const data: IBookmarkSentence[] = await getSentenceBookmark();
    // setSentenceBookmark(data);
    console.log(data);
    setSentenceBookmark([...sentenceBookmark, ...data]);
    setHasMore(data.length > 0); // true
  };

  const handlePlay = () => {
    navigate('/home');
  };
  return (
    <BookIn>
      <div className="sentences">
        <InfiniteScroll
          dataLength={sentenceBookmark.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="context">
            {/* {sentenceBookmark} */}

            {sentenceBookmark.map(sen => (
              <div key={sen.no}>
                <img
                  className="book-mark"
                  src={sen.bookMarked ? BookmarkEmpty : BookmarkFull}
                  style={{
                    height: '10%',
                    position: 'absolute',
                    left: '3%',
                  }}
                ></img>
                <img
                  className="image-hover"
                  onClick={handlePlay}
                  src={sen.no ? Play : Play}
                  style={{
                    height: '10%',
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                  }}
                ></img>
                <h2>{sen.content}</h2>
                <p>{sen.translation}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </BookIn>
  );
};

export default BookmarkSentence;
