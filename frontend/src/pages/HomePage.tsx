import Carousel from 'components/video/Carousel';
import ShortsCarousel from 'components/short/ShortsCarousel';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getVideoRecomm, getShortsRecomm, Shorts } from 'utils/api/recommApi';
import ShortsModal from 'components/short/ShortsModal';
import { useOutletContext } from 'react-router-dom';

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

const HomePage = () => {
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
    <div>
      {modalOpen && <ShortsModal setOpenModal={setModalOpen} shorts={shorts} />}
      <Carousel data={videoData}></Carousel>
      <ShortsCarousel
        data={shortsData}
        setOpenModal={setModalOpen}
        setShortsId={setShorts}
      ></ShortsCarousel>
    </div>
  );
};

export default HomePage;
