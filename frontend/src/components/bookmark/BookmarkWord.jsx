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
    /* border: 1px solid #ccc; // Add a border */
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); // Add a shadow to bookmark-container
    transition: box-shadow 0.3s ease-in-out; // Add a transition effect on hover
    padding: 10px;
    /* &:hover {
      border: 1px solid ${props => props.theme.pointLightColor};
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    } */
  }
  .mean-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    /* border: 1px solid #ccc; // Add a border */
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); // Add a shadow to bookmark-container
    transition: box-shadow 0.3s ease-in-out; // Add a transition effect on hover
    padding: 10px;
    /* &:hover {
      border: 1px solid ${props => props.theme.pointLightColor};
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    } */
  }
  .sentence-container {
    max-width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    /* border: 1px solid #ccc; // Add a border */
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); // Add a shadow to bookmark-container
    transition: box-shadow 0.3s ease-in-out; // Add a transition effect on hover
    padding: 10px;
    /* &:hover {
      border: 1px solid ${props => props.theme.pointLightColor};
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    } */
  }
`;

const BookmarkWord = () => {
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [wordBookmarkList, setWordBookmarkList] = useState([]);

  useEffect(() => {
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
          setWordBookmarkList(listData);
        })
        .catch(error => {
          console.log(error.data);
        });
      setLoading(false);
    }
    fetchData();
  }, []);

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
                    src={item.bookMarked ? BookmarkEmpty : BookmarkFull}
                  ></img>
                </div>
                <div className="content-container">
                  <p>{item.wordInfo.content}</p>
                </div>
                <div className="mean-container">
                  <p>{item.wordInfo.mean}</p>
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
        <div ref={ref} style={{ height: '10vh' }}></div>
      </div>
    </BookIn>
  );
};

export default BookmarkWord;
