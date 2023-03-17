import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

//style
const Bookmark = styled.div`
  margin-left: 10vw;
  margin-top: 10vh;
  .unclicked-button {
    background: ${props => props.theme.mainLightColor};
  }
  .clicked-button {
    background: ${props => props.theme.mainColor};
  }
  .button-wrapper {
    display: flex;
    flex-direction: column;
  }
  .button-paper-wrapper {
    display: flex;
    button {
      width: 5vw;
      border-radius: 3px 0px 0px 3px;
      font-size: 150%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
  }
  .stric-wrapper {
    display: flex;
    height: 10vh;
  }
  .paper {
    width: 75vw;
    background-color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .statistics {
    background-color: blue;
    width: 35vw;
  }
  .stric {
    background-color: red;
    width: 45vw;
  }
`;

//onClick
// const handleVideoBookmark = () => {
//   console.log('영상 북마크 열기');
// };
// const handleSentenceBookmark = () => {
//   console.log('문장 북마크 열기');
// };
// const handleWordBookmark = () => {
//   console.log('단어 북마크 열기');
// };

const BookmarkBoard = () => {
  const [buttonStatus, setButtonStatus] = useState<Array<boolean>>([
    true,
    false,
    false,
  ]);

  const handleButtons = (idx: number) => {
    console.log(idx);
    const temp: Array<boolean> = [false, false, false];
    temp[idx] = true;
    setButtonStatus(temp);
  };

  return (
    <Bookmark>
      <div className="stric-wrapper">
        <div className="statistics">통계</div>
        <div className="stric">스트릭</div>
      </div>
      <div className="button-paper-wrapper ">
        <div className="button-wrapper">
          <button
            className={buttonStatus[0] ? 'clicked-button' : 'unclicked-button'}
            onClick={() => handleButtons(0)}
          >
            단어
          </button>
          <button
            className={buttonStatus[1] ? 'clicked-button' : 'unclicked-button'}
            onClick={() => handleButtons(1)}
          >
            문장
          </button>
          <button
            className={buttonStatus[2] ? 'clicked-button' : 'unclicked-button'}
            onClick={() => handleButtons(2)}
          >
            영상
          </button>
        </div>
        <div className="paper">
          So Id like to ask you all a question that Ive pondered for these past
          few years
        </div>
      </div>
    </Bookmark>
  );
};

export default BookmarkBoard;

{
  /* <Bookmark>
<Box>
  <Stack>
    <Button
      className="unclicked-button"
      variant="contained"
      size="large"
      onClick={handleVideoBookmark}
      style={{
        margin: '0px 0px 0px 50px',
        borderRadius: '30px 0px 0px 30px',
        width: '1em',
        height: '8em',
        // position: 'absolute',
        left: '5%',
        // top: '60%',
        transform: 'translate(-95%, 280%)',
      }}
    >
      {' '}
      <Typography align="center" color="white" fontSize={'20px'}>
        영상
      </Typography>
    </Button>
    <Button
      className="clicked-button"
      variant="contained"
      size="large"
      onClick={handleSentenceBookmark}
      style={{
        margin: '0px 0px 0px 50px',
        borderRadius: '30px 0px 0px 30px',
        width: '1em',
        height: '8em',
        // position: 'absolute',
        left: '5%',
        // top: '73.5%',
        transform: 'translate(-95%, 280%)',
      }}
    >
      <Typography align="center" color="white" fontSize={'20px'}>
        문장
      </Typography>
    </Button>
    <Button
      className="unclicked-button"
      variant="contained"
      size="large"
      onClick={handleWordBookmark}
      style={{
        margin: '0px 0px 0px 50px',
        borderRadius: '30px 0px 0px 30px',
        width: '1em',
        height: '8em',
        // position: 'absolute',
        left: '5%',
        // top: '87%',
        transform: 'translate(-95%, 280%)',
      }}
    >
      {' '}
      <Typography align="center" color="white" fontSize={'20px'}>
        단어
      </Typography>
    </Button>
  </Stack>
  <Paper
    elevation={3}
    style={{
      width: '1300px',
      height: '360px',
      padding: 10,
      margin: '0px 0px 0px 0px',
      // position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(9.7%, -6.5%)',
    }}
  >
    <Typography
      align="left"
      color="black"
      fontSize={'30px'}
      style={{
        // padding: 10,
        margin: '10px 0px 0px 20px',
      }}
    >
      Bookmarked Sentences
    </Typography>
    <Typography
      align="left"
      color="black"
      fontSize={'20px'}
      style={{
        // padding: 10,
        margin: '10px 0px 0px 20px',
      }}
    >
      Why is it that for-profit organizations and nonprofits, or those
      that work in the development space, are quite different with the
      type of impact that they have?
    </Typography>
  </Paper>
</Box>
</Bookmark> */
}
