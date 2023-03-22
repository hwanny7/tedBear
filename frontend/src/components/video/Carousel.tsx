import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
  transition: ${props => props.transition};
  transform: translateX(-${props => props.transform * 33}%);
  @media (max-width: 768px) {
    transform: translateX(-${props => props.transform * 50}%);
  }
  > * {
    width: 31%;
    margin-left: 2%;
    height: 200px;
    cursor: pointer;
    /* height: 27vh; */
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: 10%;
    @media (max-width: 768px) {
      width: 48%;
    }
  }
`;

const TitleWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  h1 {
    font-size: 4vh;
  }
  .buttom-wrapper {
    width: 100px;
    display: flex;
  }
`;

const LeftButton = styled.button`
  /* position: absolute; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #7b7b7b;
  border: 1px solid black;
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

  const handleClick = (e: React.MouseEventHandler<HTMLDivElement>): void => {
    console.log(e);
    // navigate('/learning', { state: e });
  };

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

  return (
    <Wrapper>
      <TitleWithButton>
        <h1>Recommended Videos</h1>
        <div className="buttom-wrapper">
          <LeftButton onClick={prev}>
            <ArrowBackIosNewIcon />
          </LeftButton>
          <RightButton onClick={next} className="right-arrow">
            <ArrowForwardIosIcon />
          </RightButton>
        </div>
      </TitleWithButton>
      <ContentBox transition={transStyle} transform={currentIndex}>
        {data.map((Thumnail, idx) => {
          return (
            <img
              key={idx}
              src={Thumnail.thumbnailUrl}
              onClick={() => {
                handleClick;
              }}
              alt=""
            />
          );
        })}
      </ContentBox>
    </Wrapper>
  );
};

export default Carousel;
