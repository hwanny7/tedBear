import Carousel from 'components/video/Carousel';
import ShortsCarousel from 'components/short/ShortsCarousel';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getVideoRecomm, getShortsRecomm, Shorts } from 'utils/api/recommApi';
import ShortsModal from 'components/short/ShortsModal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import SearchBar from 'components/common/SearchBar';

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
  height: 100%;
  align-items: center;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<HomeRecomm[]>([]);
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shorts, setShorts] = useState<Shorts | null>(null);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();

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
        {modalOpen && <ShortsModal shorts={shorts} />}
        <div style={{ display: 'flex' }}>
          <SearchBar></SearchBar>
          <button onClick={() => navigate('/still-learn')}>
            학습 중인 영상
          </button>
        </div>
        <Carousel data={videoData}></Carousel>
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
