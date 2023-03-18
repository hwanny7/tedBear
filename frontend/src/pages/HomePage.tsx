import Carousel from 'components/common/Carousel';
import styled from 'styled-components';

const Main = styled.div``;

interface Props {
  url: string;
  id: string;
}

const HomePage = () => {
  const data: Props[] = [
    {
      url: 'https://img.youtube.com/vi/6Af6b_wyiwI/maxresdefault.jpg',
      id: '6Af6b_wyiwI',
    },
    {
      url: 'https://img.youtube.com/vi/RLESBHduKBs/maxresdefault.jpg',
      id: 'RLESBHduKBs',
    },
    {
      url: 'https://img.youtube.com/vi/wL8X31XWZW8/maxresdefault.jpg',
      id: 'wL8X31XWZW8',
    },
    {
      url: 'https://img.youtube.com/vi/BEBKC7Hqfr0/maxresdefault.jpg',
      id: 'BEBKC7Hqfr0',
    },
    {
      url: 'https://img.youtube.com/vi/LDVyOnf0t9M/maxresdefault.jpg',
      id: 'LDVyOnf0t9M',
    },
    {
      url: 'https://img.youtube.com/vi/JH_Pa1hOEVc/maxresdefault.jpg',
      id: 'JH_Pa1hOEVc',
    },
    {
      url: 'https://img.youtube.com/vi/9XGm_uHit5g/maxresdefault.jpg',
      id: '9XGm_uHit5g',
    },
  ];
  return (
    <Main style={{ marginLeft: '10%' }}>
      <Carousel data={data}></Carousel>
    </Main>
  );
};

export default HomePage;
