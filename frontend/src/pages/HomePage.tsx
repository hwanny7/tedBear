import Carousel from 'components/video/Carousel';
import ShortsCarousel from 'components/short/ShortsCarousel';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getVideoRecomm, getShortsRecomm, Shorts } from 'utils/api/recommApi';
import ShortsModal from 'components/short/ShortsModal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import SearchBar from 'components/common/SearchBar';
import { device } from 'utils/mediaQuery';

interface HomeRecomm {
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

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

const Button = styled.button<{ changeColor: string }>`
  margin-left: 1%;
  background-color: white;
  border-radius: 16px;
  padding: 1%;
  margin-top: 1%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${props => props.changeColor};
    transition: all 0.3s;
    transform: translateY(3px);
  }
  @media ${device.mobile} {
    font-size: 5px;
  }

  @media ${device.tablet} {
    font-size: 5px;
  }

  @media ${device.laptop} {
    font-size: 8px;
  }

  @media ${device.desktop} {
    font-size: 12px;
  }
`;

const HomePage = () => {
  const [button, setButton] = useState<number[]>([0, 1, 0]);
  const [videoData, setVideoData] = useState<HomeRecomm[]>([]);
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shorts, setShorts] = useState<Shorts | null>(null);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();

  const fetchData = async (difficulty: string) => {
    const data: HomeRecomm[] = await getVideoRecomm(difficulty);
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
          <ShortsModal shorts={shorts} setOpenModal={setModalOpen} />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SearchBar></SearchBar>
          <div style={{ display: 'flex' }}>
            <Button
              changeColor={'yellow'}
              style={{ backgroundColor: `${button[0] && 'yellow'}` }}
              onClick={() => changeDifficulty(0)}
            >
              Easy recommend
            </Button>
            <Button
              changeColor={'green'}
              style={{ backgroundColor: `${button[1] && 'green'}` }}
              onClick={() => changeDifficulty(1)}
            >
              Nomal recommend
            </Button>
            <Button
              changeColor={'blue'}
              style={{ backgroundColor: `${button[2] && 'blue'}` }}
              onClick={() => changeDifficulty(2)}
            >
              Hard recommend
            </Button>
          </div>
          {/* <button onClick={() => navigate('/still-learn')}>
            학습 중인 영상
          </button> */}
        </div>
        <VideoTitle>Recommended for you</VideoTitle>
        <Carousel data={videoData}></Carousel>
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
