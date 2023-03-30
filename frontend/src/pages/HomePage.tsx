import Carousel from 'components/video/Carousel';
import ShortsCarousel from 'components/short/ShortsCarousel';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  getVideoRecomm,
  getShortsRecomm,
  Shorts,
  HomeRecomm,
} from 'utils/api/recommApi';
import ShortsModal from 'components/short/ShortsModal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import SearchBar from 'components/common/SearchBar';
import { device } from 'utils/mediaQuery';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoTitle = styled.span`
  display: block;
  margin-top: 3vh;

  @media ${device.mobile} {
    font-size: 10px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }

  @media ${device.laptop} {
    font-size: 30px;
  }

  @media ${device.desktop} {
    font-size: 30px;
  }
`;

const ShortsTitle = styled.span`
  display: block;
  margin-top: 3vh;
  @media ${device.mobile} {
    font-size: 10px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }

  @media ${device.laptop} {
    font-size: 30px;
  }

  @media ${device.desktop} {
    font-size: 30px;
  }
`;

const Button = styled.button<{ changeColor?: string }>`
  margin-left: 2%;
  margin-right: 2%;
  background-color: white;
  border-radius: 16px;
  padding: 3%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${props => props.changeColor};
    transition: all 0.3s;
    transform: translateY(3px);
  }
  @media ${device.mobile} {
    font-size: 10px;
  }

  @media ${device.tablet} {
    font-size: 12px;
  }

  @media ${device.laptop} {
    font-size: 15px;
  }

  @media ${device.desktop} {
    font-size: 22px;
  }
`;

const LearningButton = styled.button`
  margin-left: 2%;
  margin-right: 2%;
  background-color: white;
  border-radius: 16px;
  padding: 1%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    transition: all 0.3s;
    transform: translateY(3px);
  }
  @media ${device.mobile} {
    font-size: 8px;
  }

  @media ${device.tablet} {
    font-size: 8px;
  }

  @media ${device.laptop} {
    font-size: 10px;
  }

  @media ${device.desktop} {
    font-size: 15px;
  }
`;

const HomePage = () => {
  const [button, setButton] = useState<number[]>([0, 1, 0]);
  const [videoData, setVideoData] = useState<HomeRecomm[]>([]);
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shorts, setShorts] = useState<Shorts | null>(null);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const navigate = useNavigate();

  const fetchData = async (difficulty: string) => {
    let data: HomeRecomm[] = await getVideoRecomm(difficulty);
    data = [...data.slice(9, 12), ...data, ...data.slice(0, 3)];
    data = data.map(item => {
      return { ...item };
    });
    // slice로 복사된 객체 얕은 복사실행
    setVideoData(data);
    const shorts = await getShortsRecomm(difficulty);
    setShortsData(shorts);
  };

  useEffect(() => {
    fetchData('nomal');
  }, []);

  const changeDifficulty = async (level: number) => {
    const nextList = [0, 0, 0];
    switch (level) {
      case 0:
        if (button[0]) {
          return;
        } else {
          fetchData('easy');
          nextList[0] = 1;
          setButton(nextList);
        }
        return;
      case 1:
        if (button[1]) {
          return;
        } else {
          fetchData('nomal');
          nextList[1] = 1;
          setButton(nextList);
        }
        return;
      case 2:
        if (button[2]) {
          return;
        } else {
          fetchData('hard');
          nextList[2] = 1;
          setButton(nextList);
        }
        return;
    }
  };

  return (
    <Wrapper>
      <div>
        {modalOpen && (
          <ShortsModal
            shorts={shorts}
            setOpenModal={setModalOpen}
            setShortsData={setShortsData}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'end', width: '100%' }}>
            <SearchBar></SearchBar>
            <LearningButton onClick={() => navigate('/still-learn')}>
              Learning
            </LearningButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'end', width: '20%' }}>
            <Button
              changeColor={'yellow'}
              style={{ backgroundColor: `${button[0] ? 'yellow' : ''}` }}
              onClick={() => changeDifficulty(0)}
            >
              Easy
            </Button>
            <Button
              changeColor={'green'}
              style={{ backgroundColor: `${button[1] ? 'green' : ''}` }}
              onClick={() => changeDifficulty(1)}
            >
              Nomal
            </Button>
            <Button
              changeColor={'red'}
              style={{ backgroundColor: `${button[2] ? 'red' : ''}` }}
              onClick={() => changeDifficulty(2)}
            >
              Hard
            </Button>
          </div>
        </div>
        <VideoTitle>Recommended for you</VideoTitle>
        {videoData.length !== 0 && (
          <Carousel data={videoData} setVideoData={setVideoData}></Carousel>
        )}
        <ShortsTitle>Daily Shorts</ShortsTitle>
        <ShortsCarousel
          data={shortsData}
          setOpenModal={setModalOpen}
          setShortsId={setShorts}
        ></ShortsCarousel>
      </div>
    </Wrapper>
  );
};

export default HomePage;
