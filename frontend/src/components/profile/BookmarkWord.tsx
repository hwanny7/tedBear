import styled from 'styled-components';
const BookIn = styled.div`
  position: absolute;
  max-height: 800px;
  overflow: auto;
  margin: 20px;
`;
const BookmarkWord = () => {
  return (
    <BookIn>
      <div>
        <h2>BookmarkWord</h2>
      </div>
    </BookIn>
  );
};

export default BookmarkWord;
