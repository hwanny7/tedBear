import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getSentenceBookmark } from 'utils/api/bookmarkApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoLevel from 'assets/img/videoLevel.svg';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import { ReactComponent as Play } from ' assets/img/play.svg';

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
  margin: 20px;
  padding: 20px;
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
    background-color: ${props => props.theme.mainLightColor};
    border-radius: 20px;
  }
`;

const BookmarkSentence = () => {
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

  return (
    <BookIn>
      <div>
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
