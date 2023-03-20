import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Props {
  url: string;
  id: string;
}

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 80vw;
`;

const ContentBox = styled.div`
  display: flex;
  /* transition: all 0.3s ease-out; */
  > * {
    width: 31%;
    margin-left: 2%;
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: 10%;
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

const Carousel = ({ data }: { data: Props[] }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(data.length);

  const handleClick = (e: React.MouseEventHandler<HTMLDivElement>): void => {
    navigate('/learning', { state: e });
  };

  // useEffect(() => {
  //   console.log('렌더링');
  //   setLength(data.length);
  // }, [data]); >> data가 바뀌지 않는다면 없어도 됨

  const next = () => {
    if (currentIndex < length - 3) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
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
      <ContentBox style={{ transform: `translateX(-${currentIndex * 33}%)` }}>
        {data.map((Thumnail, idx) => {
          return <img key={idx} src={Thumnail.url} alt="" />;
        })}
      </ContentBox>
    </Wrapper>
  );
};

export default Carousel;
