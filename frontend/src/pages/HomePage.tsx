import Carousel from 'components/video/Carousel';
import ShortsCarousel from 'components/short/ShortsCarousel';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getVideoRecomm, getShortsRecomm, Shorts } from 'utils/api/recommApi';
import ShortsModal from 'components/short/ShortsModal';

interface HomeRecomm {
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

const HomePage = () => {
  const [videoData, setVideoData] = useState<HomeRecomm[]>([]);
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [shorts, setShorts] = useState<string>('6Af6b_wyiwI');

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
      <Carousel
        data={videoData}
        setOpenModal={setModalOpen}
        setShortsId={setShorts}
      ></Carousel>
      {/* <ShortsCarousel
        data={data}
        setOpenModal={setModalOpen}
        setShortsId={setShorts}
      ></ShortsCarousel> */}
    </div>
  );
};

export default HomePage;
