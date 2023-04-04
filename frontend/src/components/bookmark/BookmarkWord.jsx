import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import { useInView } from 'react-intersection-observer';
import { authApi } from 'utils/api/customAxios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postWordBookmark, deleteWordBookmark } from 'utils/api/learningApi';

const BookIn = styled.div`
  max-height: 80vh;
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
    flex-direction: row;
    justify-content: flex-start;
    align-items: left;
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
  .mean-container {
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
  .sentence-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
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

const BookmarkWord = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [wordBookmarkList, setWordBookmarkList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    await authApi
      .get(`word/bookmark/list`, {
        params: {
          page: page,
          size: 10,
        },
      })
      .then(response => {
        const listData = response.data.wordBookmarkList.map((item, index) => {
          return { ...item, bookmarked: true, id: index };
        });
        if (listData.length) {
          setWordBookmarkList(wordBookmarkList.concat(...listData));
          // setWordBookmarkList(prevList => [...prevList, ...listData]);
          // setPage(prevPage => prevPage + 1);
          console.log(listData);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  useEffect(() => {
    console.log('fetch');
    fetchData();
  }, [page]);

  useEffect(() => {
    console.log('inviewloading');
    console.log(inView, loading);
    if (inView && !loading) {
      console.log('여기!');
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, loading]);

  const handleBookmark = () => {
    navigate('/home');
  };

  const handleMark = (item, idx) => {
    console.log('북마크를 켜고 끄고');
    const copy = [...wordBookmarkList];
    copy[idx].bookmarked = !copy[idx].bookmarked;
    console.log(item.bookmarked);
    if (copy[idx].bookmarked) {
      postWordBookmark({ wordNumber: item.wordNo });
      console.log(item.wordNo);
    } else {
      deleteWordBookmark({ wordNumber: item.wordNo });
      console.log(item.wordNo);
    }
    console.log(item.wordNo, copy[idx].bookmarked);
    setWordBookmarkList(copy);
  };

  return (
    <BookIn>
      <div className="words">
        {wordBookmarkList.length === 0 ? (
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
          <div className="word">
            <div>
              {wordBookmarkList.length > 0 &&
                wordBookmarkList.map((item, idx) => (
                  <div className="row" key={idx}>
                    <div className="bookmark-container">
                      <img
                        className="book-mark"
                        src={item.bookmarked ? BookmarkFull : BookmarkEmpty}
                        onClick={() => {
                          console.log(item, idx);
                          handleMark(item, idx);
                        }}
                        style={{ zIndex: 9999 }}
                      ></img>
                    </div>
                    <div className="content-container">
                      <span>{item.wordInfo.content}</span>
                    </div>
                    <div className="mean-container">
                      <span>{item.wordInfo.mean}</span>
                    </div>
                    <div className="sentence-container">
                      {' '}
                      <ul>
                        {item.sentenceContentList.map((sentence, index) => (
                          <li key={index}>
                            {index + 1} . {sentence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div ref={ref} style={{ height: '10vh' }}></div>
      </div>
    </BookIn>
  );
};

export default BookmarkWord;
