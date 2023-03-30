import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import { useInView } from 'react-intersection-observer';
import { authApi } from 'utils/api/customAxios';

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

  .content-container {
    max-width: 50%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
  }

  .mean-container {
    max-width: 50%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-left: 10px;
  }
`;

// jsx 로 변환

const BookmarkWord = () => {
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [wordBookmarkList, setWordBookmarkList] = useState([]);
  const [wordInfo, setWordInfo] = useState();
  const [sentenceContentList, setSentenceContentList] = useState();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      await authApi
        .get(`word/bookmark/list`)
        .then(response => {
          console.log('then');
          console.log(response.data);

          const listData = response.data.wordBookmarkList.map((item, index) => {
            return { ...item, bookmarked: true, id: index };
          });
          // setWordBookmarkList(listData);

          if (mounted) {
            // only update state if component is still mounted
            setWordBookmarkList(listData);
            setLoading(false);
          }

          // const wordData = response.data.wordBookmarkList.wordInfo.map(
          //   (item, index) => {
          //     return { ...item, bookmarked: true, id: index };
          //   },
          // );
          // setWordInfo(wordData);

          // const senData =
          //   response.data.wordBookmarkList.sentenceContentList.map(
          //     (item, index) => {
          //       return { ...item, bookmarked: true, id: index };
          //     },
          //   );
          // setSentenceContentList(senData);
        })
        .catch(error => {
          console.log(error.data);
          if (mounted) {
            setLoading(false);
          }
        });
      // setLoading(false);
    }
    fetchData();
    return () => {
      mounted = false; // update mounted variable when component is unmounted
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  // useEffect(() => {
  //   console.log('fetchData');
  //   console.log(wordInfo);
  //   console.log(sentenceContentList);
  // }, [page]);

  useEffect(() => {
    console.log('Loading');
    if (inView && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, loading]);

  return (
    <BookIn>
      <div className="words">
        <div className="word">
          {wordBookmarkList.length > 0 &&
            wordBookmarkList.map(item => (
              <div className="row" key={item.id}>
                <div className="bookmark-container">
                  <img
                    className="book-mark"
                    src={item.bookMarked ? BookmarkFull : BookmarkEmpty}
                    style={{
                      height: '50%',
                      position: 'absolute',
                      left: '20%',
                    }}
                  ></img>
                </div>
                <div className="cotent-container">
                  <p>{item.wordInfo.content}</p>
                </div>
                <div className="mean-container">
                  <p>{item.wordInfo.mean}</p>
                </div>
                <div className="sens">
                  {' '}
                  <ul>
                    {item.sentenceContentList.map((sentence, index) => (
                      <li key={index}>{sentence}</li>
                    ))}
                  </ul>
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

export default BookmarkWord;
