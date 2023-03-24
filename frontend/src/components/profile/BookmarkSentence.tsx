import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { authApi } from 'utils/api/customAxios';

const BookIn = styled.div`
  position: absolute;
  max-height: 800px;
  overflow: auto;
  margin: 20px;
`;

// const [words, setWords] = useState([]);
// { id: 1, text: 'Word 1', isBookmarked: false },
// { id: 2, text: 'Word 2', isBookmarked: true },

const BookmarkSentence = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     await authApi
  //       .get('your_api_endpoint') // api
  //       .then(response => {
  //         setWords(response.data.words);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  //   fetchData();
  // }, []);

  // const toggleBookmark = id => {
  //   const updatedWords = words.map(word => {
  //     if (word.id === id) {
  //       return { ...word, isBookmarked: !word.isBookmarked };
  //     }
  //     return word;
  //   });
  //   setWords(updatedWords);
  // };

  return (
    <BookIn>
      <div>
        <h2>BookmarkSentence</h2>
        {/* <ul>
          {words.map(word => (
            <li key={word.id}>
              <img
                src={word.isBookmarked ? bookmarkOn : bookmarkOff}
                alt="Bookmark"
                onClick={() => toggleBookmark(word.id)}
              />
              {word.text}
            </li>
          ))}
        </ul> */}
      </div>
    </BookIn>
  );
};

export default BookmarkSentence;
