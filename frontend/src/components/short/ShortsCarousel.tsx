import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Shorts } from 'utils/api/recommApi';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 80vw;
`;

const ContentBox = styled.div<{ transition: string; transform: number }>`
  display: flex;
  transition: ${props => props.transition};
  transform: translateX(-${props => props.transform * 20}%);
  @media (max-width: 768px) {
    transform: translateX(-${props => props.transform * 25}%);
  }
  > * {
    cursor: pointer;
    width: 18%;
    height: 300px;
    object-fit: cover;
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
      width: 23%;
    }
  }
`;

const TitleWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 4vh;
  }
  .buttom-wrapper {
    width: 100px;
    display: flex;
  }
`;

const LeftButton = styled.button`
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

const ShortsCarousel = ({
  data,
  setOpenModal,
  setShortsId,
}: {
  data: Shorts[];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShortsId: React.Dispatch<React.SetStateAction<Shorts | null>>;
}) => {
  data = [...data.slice(7, 12), ...data, ...data.slice(0, 5)];
  const navigate = useNavigate();
  const transition = 'all 0.3s ease-out;';
  const [currentIndex, setCurrentIndex] = useState(5);
  const [length, setLength] = useState(data.length);
  const [transStyle, setTransStyle] = useState(transition);

  const handleClick = (e: React.MouseEventHandler<HTMLDivElement>): void => {
    navigate('/learning', { state: e });
  };

  useEffect(() => {
    setLength(data.length);
  }, [data]);

  const next = () => {
    if (currentIndex < length - 5) {
      setCurrentIndex(prevState => prevState + 1);
    }
    if (currentIndex + 1 === length - 5) {
      setTimeout(() => {
        setCurrentIndex(5);
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
        setCurrentIndex(length - 10);
        // 맨 뒤 5개, 인덱스 1개, 5개 열에서 4개
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
              src={'https://i.ytimg.com/vi/' + Thumnail.watchId + '/hq1.jpg'}
              alt=""
              onClick={() => {
                setOpenModal(true);
                setShortsId(Thumnail);
              }}
            />
          );
        })}
      </ContentBox>
    </Wrapper>
  );
};

export default ShortsCarousel;
