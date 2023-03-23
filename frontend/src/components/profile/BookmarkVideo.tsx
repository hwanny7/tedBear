import styled from 'styled-components';
const BookIn = styled.div`
  position: absolute;
  max-height: 800px;
  overflow: auto;
  margin: 20px;
`;
const BookmarkVideo = () => {
  return (
    <BookIn>
      <div>
        {/* {setVideo} */}
        <h2>BookmarkVideo</h2>
      </div>
    </BookIn>
  );
};

export default BookmarkVideo;
