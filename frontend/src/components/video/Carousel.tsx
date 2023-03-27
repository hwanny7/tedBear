import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import VideoLevel from 'assets/img/videoLevel.svg';
import carouselButton from 'assets/img/carouselButton.svg';

import { device } from 'utils/mediaQuery';

interface HomeRecomm {
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

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
    overflow-y: hidden;
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
    .video-level {
      height: 15%;
      position: absolute;
      top: 4%;
      left: 4%;
    }
    .book-mark {
      height: 20%;
      position: absolute;
      left: 90%;
    }
    .title {
      text-align: center;
      width: 80%;
      position: absolute;
      bottom: 10%;
      left: 10%;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 16px;
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
        font-size: 13px;
      }
    }
  }
`;

const TitleWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 4vh;
  }
  .buttom-wrapper {
    display: flex;
  }
`;

const LeftButton = styled.button`
  width: 50%;
`;

const RightButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #7b7b7b;
  border: 1px solid black;
`;

const Carousel = ({ data }: { data: HomeRecomm[] }) => {
  data = [...data.slice(9, 12), ...data, ...data.slice(0, 3)];
  const navigate = useNavigate();
  const transition = 'all 0.3s ease-out;';
  const [currentIndex, setCurrentIndex] = useState(3);
  const [length, setLength] = useState(data.length);
  const [transStyle, setTransStyle] = useState(transition);

  useEffect(() => {
    setLength(data.length);
  }, [data]);

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
    navigate('/learning', { state: watchId });
  };
  return (
    <Wrapper>
      <TitleWithButton>
        <h1>Recommended Videos</h1>
        <div className="buttom-wrapper">
          <LeftButton onClick={prev}>
            <img src={carouselButton} alt="" />
          </LeftButton>
          <RightButton onClick={next} className="right-arrow">
            <ArrowForwardIosIcon />
          </RightButton>
        </div>
      </TitleWithButton>
      <ContentBox transition={transStyle} transform={currentIndex}>
        {data.map((Thumnail, idx) => {
          return (
            <div className="wrapper" key={idx}>
              <img
                className="main-img"
                src={Thumnail.thumbnailUrl}
                onClick={() => handleClick(Thumnail.watchId)}
                alt=""
              />
              <img
                src={VideoLevel}
                className="video-level"
                style={{
                  filter:
                    'invert(45%) sepia(78%) saturate(1707%) hue-rotate(161deg) brightness(93%) contrast(103%)',
                }}
              ></img>
              <img
                src={Thumnail.bookMarked ? BookmarkFull : BookmarkEmpty}
                className="book-mark"
              ></img>
              <div className="title">{Thumnail.title}</div>
            </div>
          );
        })}
      </ContentBox>
    </Wrapper>
  );
};

export default Carousel;
