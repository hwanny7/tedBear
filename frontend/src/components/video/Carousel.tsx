import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import carouselButton from 'assets/img/carouselButton.svg';
import rightButton from 'assets/img/rightButton.svg';

import { device } from 'utils/mediaQuery';
import { HomeRecomm } from 'utils/api/recommApi';
import { deleteVideoBookmark, postVideoBookmark } from 'utils/api/learningApi';
import { useSelector } from 'react-redux';
import Badge from 'components/common/Badge';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 80vw;
`;

const ContentBox = styled.div<{ transition: string; transform: number }>`
  display: flex;
  height: 30vh;
  transition: ${props => props.transition};
  transform: translateX(-${props => props.transform * 33.3}%);
  @media (max-width: 768px) {
    transform: translateX(-${props => props.transform * 50}%);
  }
  .wrapper {
    width: 31.3%;
    position: relative;
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: 16px;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-left: 1%;
    margin-right: 1%;
    &:hover {
      scale: 1.04;
      transition: 0.4s;
    }
    @media (max-width: 768px) {
      width: 48%;
    }
    .main-img {
      border-radius: 16px;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .book-mark {
      height: 18%;
      width: 18%;
      position: absolute;
      left: 85%;
      cursor: pointer;
    }
    .title {
      text-align: center;
      width: 80%;
      position: absolute;
      bottom: 10%;
      left: 10%;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      padding: 5px;
      @media ${device.mobile} {
        font-size: 6px;
      }
      @media ${device.tablet} {
        font-size: 8px;
      }

      @media ${device.laptop} {
        font-size: 13px;
      }

      @media ${device.desktop} {
        font-size: 15px;
      }
    }

    .badge-wrapper {
      position: absolute;
      top: 14%;
      left: 4%;
    }
  }
`;

interface Props {
  data: HomeRecomm[];
  setVideoData: React.Dispatch<React.SetStateAction<HomeRecomm[]>>;
}

const RootWrapper = styled.div`
  position: relative;
  .right-btn {
    position: absolute;

    top: -15%;
    height: 5vh;
    cursor: pointer;
    &:hover {
      scale: 1.1;
      transition: 0.4s;
    }
    @media (max-width: 600px) {
      right: 48px;
      width: 24px;
    }
    @media (min-width: 600px) {
      right: 56px;
    }
  }
  .left-btn {
    position: absolute;
    top: -15%;
    height: 5vh;
    cursor: pointer;
    &:hover {
      scale: 1.1;
      transition: 0.4s;
    }
    @media (max-width: 600px) {
      right: 8px;
      width: 24px;
    }
    @media (min-width: 600px) {
      right: 8px;
    }
  }
`;

const Carousel = ({ data, setVideoData }: Props) => {
  const navigate = useNavigate();
  const transition = 'all 0.3s ease-out;';
  const [currentIndex, setCurrentIndex] = useState(3);
  const length = data.length;
  const dataList = data;
  const [transStyle, setTransStyle] = useState(transition);
  const { isLogin } = useSelector((state: any) => state.auth);

  const next = () => {
    if (currentIndex < length - 3) {
      setCurrentIndex(prevState => prevState + 1);
    }
    if (currentIndex + 1 === length - 3) {
      setTimeout(() => {
        setCurrentIndex(3);
        setTransStyle('');
      }, 250);
    }
    setTransStyle(transition);
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
    if (currentIndex - 1 === 0) {
      setTimeout(() => {
        setCurrentIndex(length - 6);
        setTransStyle('');
      }, 250);
    }
    setTransStyle(transition);
  };

  const handleClick = (watchId: string): void => {
    navigate(`/learning/${watchId}`);
  };

  const handleVideoBm = (videoNo: number) => {
    let status;
    const copy = dataList.map(item => {
      if (item.no === videoNo) {
        status = item.bookMarked;
        item.bookMarked = !item.bookMarked;
      }
      return item;
    });
    setVideoData(copy);
    if (status) {
      deleteVideoBookmark({ videoNo });
    } else {
      postVideoBookmark({ videoNo });
    }
  };

  return (
    <RootWrapper>
      <img onClick={prev} className="right-btn" src={carouselButton} alt="" />
      <img onClick={next} className="left-btn" src={rightButton} alt="" />
      <div>
        <Wrapper>
          <ContentBox transition={transStyle} transform={currentIndex}>
            {dataList.map((Thumnail, idx) => {
              return (
                <div className="wrapper" key={idx}>
                  <img
                    className="main-img"
                    src={Thumnail.thumbnailUrl}
                    onClick={() => handleClick(Thumnail.watchId)}
                    alt=""
                  />
                  <div className="badge-wrapper">
                    <Badge score={Thumnail.score} />
                  </div>
                  {isLogin && (
                    <img
                      src={Thumnail.bookMarked ? BookmarkFull : BookmarkEmpty}
                      className="book-mark"
                      onClick={() => {
                        handleVideoBm(Thumnail.no);
                      }}
                    ></img>
                  )}
                  <div className="title">{Thumnail.title}</div>
                </div>
              );
            })}
          </ContentBox>
        </Wrapper>
      </div>
    </RootWrapper>
  );
};

export default Carousel;
