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

  /* max-height: 80vh; */

  /* right: 0%; */
  /* overflow: auto; */
  /* paper's scroll */

  //

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
  .content-container {
    /* width: 20%; */
    /* max-width: 100%; */
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    /* margin-right: 10px; */
    /* border-radius: 4px; */
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
    /* transition: box-shadow 0.3s ease-in-out; */
    padding: 24px 16px 10px;
    font-size: 24px;

    span {
      font-weight: bold;
      color: #1a1a1a;
    }
  }

  .mean-senetence-wrapper {
    display: flex;
    flex-direction: column;
  }

  .title {
    padding-left: 16px;
    display: flex;
    div {
      cursor: pointer;
      width: 72px;
      text-align: center;
      padding: 8px 16px;
      margin-bottom: 8px;
      margin-right: 16px;
      border-radius: 50px;
    }

    div:nth-child(1) {
      background-color: ${props =>
        props.toggle == 1 ? `${props.theme.pointLigntGrdColor3}` : ' #ebebeb;'};
      &:hover {
        background-color: ${props => props.theme.pointLigntGrdColor3};
      }
    }

    div:nth-child(2) {
      background-color: ${props =>
        props.toggle == 2 ? `${props.theme.pointLigntGrdColor3}` : ' #ebebeb;'};
      &:hover {
        background-color: ${props => props.theme.pointLigntGrdColor3};
      }
    }
  }

  .mean-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: center; */
    border-radius: 4px;
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out; */

    @media (max-width: 450px) {
      span {
        font-size: 14px;
        line-height: 32px;
      }
    }

    @media (min-width: 450px) {
      span {
        font-size: 16px;
        line-height: 32px;
        padding: 16px 24px;
      }
    }
  }

  .sentence-container {
    color: #1a1a1a;
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    /* align-items: center; */
    margin-left: 10px;
    /* border-radius: 4px; */
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out; */

    @media (max-width: 450px) {
      /* span { */
      font-size: 14px;
      line-height: 32px;
      /* } */
    }

    @media (min-width: 450px) {
      /* span { */
      font-size: 16px;
      line-height: 24px;
      padding: 16px 24px;
      /* } */
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
    cursor: pointer;
    margin-top: 24px;
    color: white;
    border-radius: 50px;
    background-color: ${props => props.theme.pointColor};
    box-shadow: 2px 3px 6px #999999;

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

  .words {
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

  .button-set {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .word {
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
          // console.log(listData);
          setLoading(false);
        }
      })
      .catch(error => {
        // console.log(error.data);
      });
  };

  useEffect(() => {
    // console.log('fetch');
    fetchData();
  }, [page]);

  useEffect(() => {
    // console.log('inviewloading');
    // console.log(inView, loading);
    if (inView && !loading) {
      // console.log('여기!');
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, loading]);

  const handleBookmark = () => {
    navigate('/home');
  };

  const handleMark = (item, idx) => {
    // console.log('북마크를 켜고 끄고');
    const copy = [...wordBookmarkList];
    copy[idx].bookmarked = !copy[idx].bookmarked;
    console.log(item.bookmarked);
    if (copy[idx].bookmarked) {
      postWordBookmark({ wordNo: item.wordInfo.wordNo });
      // console.log(item.wordInfo.wordNo);
      // console.log(item);
    } else {
      deleteWordBookmark({ wordNo: item.wordInfo.wordNo });
      // console.log(item.wordInfo.wordNo);
      // console.log(item);
    }
    // console.log(item.wordInfo.wordNo, copy[idx].bookmarked);
    setWordBookmarkList(copy);
  };

  // 메뉴 토글
  const [toggle, setToggle] = useState(1);
  const [selected, setSelected] = useState(0);

  const onSelectMeun = (tog, idx) => {
    setToggle(tog);
    setSelected(idx);
  };

  return (
    <BookIn toggle={toggle}>
      <div className="words">
        {wordBookmarkList.length === 0 ? (
          <div className="button-set">
            <p className="empty-caution">단어 북마크가 비어있어요!</p>
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
          <div className="word">
            {/* <div> */}
            {wordBookmarkList.length > 0 &&
              wordBookmarkList.map((item, idx) => (
                <div className="row" key={idx}>
                  <div className="bookmark-container">
                    <img
                      className="book-mark"
                      src={item.bookmarked ? BookmarkFull : BookmarkEmpty}
                      onClick={() => {
                        // console.log(item, idx);
                        handleMark(item, idx);
                      }}
                      style={{ zIndex: 9999 }}
                    ></img>
                  </div>
                  <div className="content-container">
                    <span>{item.wordInfo.content}</span>
                  </div>
                  <div className="mean-senetence-wrapper">
                    <div className="title">
                      <div onClick={() => onSelectMeun(1, idx)}>의미</div>
                      <div onClick={() => onSelectMeun(2, idx)}>예문</div>
                    </div>
                    <div className="change-box">
                      {idx == selected ? (
                        toggle == 1 ? (
                          <div className="mean-container">
                            <span>{item.wordInfo.mean}</span>
                          </div>
                        ) : (
                          <div className="sentence-container">
                            <ul>
                              {item.sentenceContentList.map(
                                (sentence, index) => (
                                  <li key={index}>
                                    {index + 1} . {sentence}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )
                      ) : (
                        <div className="mean-container">
                          <span>{item.wordInfo.mean}</span>
                        </div>
                      )}
                      {/* {toggle == 1 ? (
                        <div className="mean-container">
                          <span>{item.wordInfo.mean}</span>
                        </div>
                      ) : (
                        <div className="sentence-container">
                          <ul>
                            {item.sentenceContentList.map((sentence, index) => (
                              <li key={index}>
                                {index + 1} . {sentence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
            {/* </div> */}
          </div>
        )}
        <div ref={ref} style={{ height: '10vh' }}></div>
      </div>
    </BookIn>
  );
};

export default BookmarkWord;
