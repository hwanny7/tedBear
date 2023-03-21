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
          So Id like to ask you all a question that Ive pondered for these past
          few years
        </div>
      </div>
    </Bookmark>
  );
};

export default BookPage;
