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
    font-size: 15px;
  }

  @media ${device.tablet} {
    font-size: 25px;
  }

  @media ${device.laptop} {
    font-size: 35px;
  }

  @media ${device.desktop} {
    font-size: 50px;
  }
`;

const ShortsTitle = styled.span`
  display: block;
  margin-top: 3vh;
  @media ${device.mobile} {
    font-size: 15px;
  }

  @media ${device.tablet} {
    font-size: 25px;
  }

  @media ${device.laptop} {
    font-size: 35px;
  }

  @media ${device.desktop} {
    font-size: 50px;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<HomeRecomm[]>([]);
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shorts, setShorts] = useState<Shorts | null>(null);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const pathName = 'HOME';

  useEffect(() => {
    const fetchData = async () => {
      const data: HomeRecomm[] = await getVideoRecomm();
      setVideoData(data);
      const shorts = await getShortsRecomm();
      setShortsData(shorts);
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <div>
        {modalOpen && (
          <ShortsModal shorts={shorts} setOpenModal={setModalOpen} />
        )}
        <div style={{ display: 'flex' }}>
          <SearchBar pathName={pathName}></SearchBar>
          <button onClick={() => navigate('/still-learn')}>
            학습 중인 영상
          </button>
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
