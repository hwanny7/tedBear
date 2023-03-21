import Carousel from 'components/common/Carousel';
import ShortsCarousel from 'components/common/ShortsCarousel';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getVideoRecomm } from 'utils/api/recommApi';
import ShortsModal from 'components/common/ShortsModal';

// interface Props {
//   url: string;
//   id: string;
// }

interface HomeRecomm {
  thumbnailUrl: string;
  title: string;
  watchId: string;
  score: number;
  bookMarked: boolean;
}

const HomePage = () => {
  const [videoData, setVideoData] = useState<HomeRecomm[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [shorts, setShorts] = useState<string>('6Af6b_wyiwI');

  // const data: Props[] = [
  //   {
  //     url: 'https://i.ytimg.com/vi/7tSP1M052Sg/hq1.jpg',
  //     id: '6Af6b_wyiwI',
  //   },
  //   {
  //     url: 'https://i.ytimg.com/vi/tB5J9qgM2zI/hq1.jpg',
  //     id: 'RLESBHduKBs',
  //   },
  //   {
  //     url: 'https://i.ytimg.com/vi/oITW0XsZd3o/hq1.jpg',
  //     id: 'wL8X31XWZW8',
  //   },
  //   {
  //     url: 'https://i.ytimg.com/vi/YY6LCOJbve8/hq1.jpg',
  //     id: 'BEBKC7Hqfr0',
  //   },
  //   {
  //     url: 'https://i.ytimg.com/vi/-k0p-DYYZKU/hq1.jpg',
  //     id: 'LDVyOnf0t9M',
  //   },
  //   {
  //     url: 'https://i.ytimg.com/vi/IStsehNAOL8/maxresdefault.jpg',
  //     id: 'JH_Pa1hOEVc',
  //   },
  //   {
  //     url: 'https://i.ytimg.com/vi/UGdLvGbpehQ/maxresdefault.jpg',
  //     id: '9XGm_uHit5g',
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      const data: HomeRecomm[] = await getVideoRecomm();
      setVideoData(data);
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
      {/* <ShortsCarousel data={data}></ShortsCarousel> */}
    </div>
  );
};

export default HomePage;
