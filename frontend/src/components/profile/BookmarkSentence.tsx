import styled from 'styled-components';
const BookIn = styled.div`
  position: absolute;
  max-height: 800px;
  overflow: auto;
  margin: 20px;
`;
const BookmarkSentence = () => {
  return (
    <BookIn>
      <div>
        <h2>BookmarkSentence</h2>
      </div>
    </BookIn>
  );
};

export default BookmarkSentence;
