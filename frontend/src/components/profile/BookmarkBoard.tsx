import { useState } from 'react';
import styled from 'styled-components';
import BookmarkSentence from './BookmarkSentence';
import BookmarkVideo from './BookmarkVideo';
import BookmarkWord from './BookmarkWord';

//style
const Bookmark = styled.div`
  padding: 10;
  overflow: auto;
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
    padding: 30;
    margin: 30;
    overflow: auto;
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
// true 인 게 열림, default 는 맨 위에 꺼(영상)가 true로 열려있음
const BookmarkBoard = () => {
  const [buttonStatus, setButtonStatus] = useState<Array<boolean>>([
    true,
    false,
    false,
  ]);

  // 버튼 누르면 true로 열림
  const handleButtons = (idx: number) => {
    console.log(idx);
    const temp: Array<boolean> = [false, false, false];
    temp[idx] = true;
    setButtonStatus(temp);
  };

  return (
    <Bookmark>
      {/* <div className="stric-wrapper">
        <div className="statistics">통계</div>
        <div className="stric">스트릭</div>
      </div> */}
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
          {buttonStatus[0] ? <BookmarkWord></BookmarkWord> : ''}
          {buttonStatus[1] ? <BookmarkSentence></BookmarkSentence> : ''}
          {buttonStatus[2] ? <BookmarkVideo></BookmarkVideo> : ''}
        </div>
      </div>
    </Bookmark>
  );
};

export default BookmarkBoard;
