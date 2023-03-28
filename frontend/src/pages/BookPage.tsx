import { useState } from 'react';
import styled from 'styled-components';
import BookmarkSentence from 'components/profile/BookmarkSentence';
import BookmarkVideo from 'components/profile/BookmarkVideo';
import BookmarkWord from 'components/profile/BookmarkWord';
//style
const Bookmark = styled.div`
  position: relative;
  margin-left: 5vw;
  margin-top: 10vh;
  .unclicked-button {
    background: ${props => props.theme.mainLightColor};
  }
  .clicked-button {
    background: ${props => props.theme.mainColor};
  }
  .button-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  .button-paper-wrapper {
    display: flex;
    button {
      height: 13vh;
      width: 5vw;
      border-radius: 20px 0px 0px 20px;
      font-size: 130%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      :hover {
        background-color: #c1bbe4; /* add a hover effect */
        cursor: pointer; /* change cursor to pointer on mouse over */
      }
    }
  }
  .stric-wrapper {
    display: flex;
    height: 10vh;
  }
  .paper {
    overflow: auto;
    max-height: 800px;
    border-radius: 20px;
    width: 80vw;
    height: 80vh;
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

const BookPage = () => {
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
          <p>{buttonStatus[0] ? <BookmarkWord></BookmarkWord> : ''}</p>
          <p>{buttonStatus[1] ? <BookmarkSentence></BookmarkSentence> : ''}</p>
          <p>{buttonStatus[2] ? <BookmarkVideo></BookmarkVideo> : ''}</p>
        </div>
      </div>
    </Bookmark>
  );
};

export default BookPage;
