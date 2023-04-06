import { useState } from 'react';
import styled from 'styled-components';
import BookmarkSentence from 'components/bookmark/BookmarkSentence';
import BookmarkVideo from 'components/bookmark/BookmarkVideo';
import BookmarkWord from 'components/bookmark/BookmarkWord';

const Bookmark = styled.div`
  display: Flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 450px) {
    padding: 16px;
  }

  @media (min-width: 450px) {
    padding: 24px;
  }

  @media (min-width: 900px) {
    padding: 56px 80px;
    height: 100vh;
  }

  position: relative;
  /* margin-left: 5vw;
    margin-top: 10vh;
  padding: 10; */

  .unclicked-button {
    background: ${props => props.theme.mainLightColor};
  }
  .clicked-button {
    background: ${props => props.theme.mainDarkColor};
    color: ${props => props.theme.whiteColor};
  }
  .button-wrapper {
    position: relative;
    height: 10%;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
    padding-right: 32px;
    z-index: 0;
  }

  .button-subwrapper {
    /* height: 10%; */
    display: flex;
    flex-direction: row;
    bottom: -10px;
    position: absolute;

    > button {
      border-radius: 16px 16px 0px 0px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      transition: 0.5s;
      :hover {
        background-color: ${props => props.theme.mainDarkColor};
        color: ${props => props.theme.whiteColor};
        cursor: pointer;
        transform: translateY(-10px);
      }

      @media (max-width: 450px) {
        font-size: 14px;
        height: 48px;
        width: 56px;
        margin-right: 4px;
      }

      @media (min-width: 450px) {
        font-size: 18px;
        height: 56px;
        width: 72px;
        margin-right: 4px;
      }

      @media (min-width: 700px) {
        font-size: 20px;
        height: 56px;
        width: 88px;
        margin-right: 8px;
      }
    }
  }

  .button-paper-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 900px) {
      height: 600px;
    }

    @media (min-width: 900px) {
      height: 100%;
    }
  }
  .stric-wrapper {
    display: flex;
    height: 10vh;
  }
  .paper {
    z-index: 1;
    position: relative;
    max-height: 800px;
    border-radius: 20px;
    width: 100%;
    height: 90%;
    background-color: white;
    /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
    box-shadow: 6px 6px 20px #61616142;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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
    // console.log(idx);
    const temp: Array<boolean> = [false, false, false];
    temp[idx] = true;
    setButtonStatus(temp);
  };

  return (
    <Bookmark>
      <div className="button-paper-wrapper">
        <div className="button-wrapper">
          <div className="button-subwrapper">
            <button
              className={
                buttonStatus[0] ? 'clicked-button' : 'unclicked-button'
              }
              onClick={() => handleButtons(0)}
              style={{ zIndex: 9999 }}
            >
              단어
            </button>
            <button
              className={
                buttonStatus[1] ? 'clicked-button' : 'unclicked-button'
              }
              onClick={() => handleButtons(1)}
              style={{ zIndex: 9999 }}
            >
              문장
            </button>
            <button
              className={
                buttonStatus[2] ? 'clicked-button' : 'unclicked-button'
              }
              onClick={() => handleButtons(2)}
              style={{ zIndex: 9999 }}
            >
              영상
            </button>
          </div>
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

export default BookPage;
