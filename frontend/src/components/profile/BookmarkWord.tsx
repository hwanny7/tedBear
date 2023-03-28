import styled from 'styled-components';
// import { useState, useEffect } from 'react';
// import { getWordBookmark } from 'utils/api/bookmarkApi';

// interface IBookmarkWord {
//   thumbnailUrl: string;
//   title: string;
//   watchId: string;
//   score: number;
//   bookMarked: boolean;
// }

const BookIn = styled.div`
  position: absolute;
  max-height: 800px;
  overflow: auto;
  margin: 20px;
`;

const BookmarkWord = () => {
  // const [wordBookmark, setWordBookmark] = useState<IBookmarkWord[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data: IBookmarkWord[] = await getWordBookmark();
  //     setWordBookmark(data);
  //     console.log(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <BookIn>
      <div>
        <h2>Bookmarked Word</h2>
        {/* {wordBookmark} */}
      </div>
    </BookIn>
  );
};

export default BookmarkWord;
