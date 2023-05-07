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

  .top-wrapper {
    display: flex;

    @media (max-width: 700px) {
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    @media (min-width: 700px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .searchbar-box {
    display: flex;
    @media (max-width: 700px) {
      margin-bottom: 16px;
      width: 100%;
      align-items: center;
      justify-content: center;
    }

    @media (min-width: 700px) {
      align-items: end;
      width: 70%;
    }
  }

  .btn-box {
    display: flex;

    @media (max-width: 700px) {
      margin-bottom: 8px;
      width: 100%;
      align-items: center;
      justify-content: center;
    }

    @media (min-width: 700px) {
      justify-content: end;
      align-items: end;
      width: 30%;
    }
  }
`;

const VideoTitle = styled.span`
  display: block;
  margin-top: 3vh;
  color: ${props => props.theme.textColor1};

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
  color: ${props => props.theme.textColor1};

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

const BtnWrapper = styled.div`
  background-color: ${props => props.theme.bgColor2};
  margin-right: 10px;

  border: 1px solid #ececec;
  border-radius: 4px;
  padding: 4px 8px;
  width: 226px;
  height: 40px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.19);

  display: flex;
`;

const Button = styled.button<{ changeColor?: number }>`
  width: 70px;
  height: 100%;
  cursor: pointer;
  border-radius: 4px;
  /* font-weight: bold; */

  ${props => {
    if (props.changeColor) {
      return ` 
      background:  ${props.theme.pointLigntGrdColor8};
      color: ${props.theme.pointColor};`;
    } else {
      return ` 
      background: ${props.theme.bgColor2};
      color: ${props.theme.textColor2};
      `;
    }
  }}

  &:hover {
    background: ${props => props.theme.pointLigntGrdColor8};
    color: ${props => props.theme.pointColor};
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
    font-size: 16px;
  }
`;

const LeftButton = styled.button<{ changeColor?: number }>`
  width: 70px;
  height: 100%;
  cursor: pointer;
  border-radius: 4px;
  /* font-weight: bold; */

  ${props => {
    if (props.changeColor) {
      return ` 
      background:  ${props.theme.pointLigntGrdColor8};
      color: ${props.theme.pointColor};`;
    } else {
      return ` 
      background: ${props.theme.bgColor2};
      color: ${props.theme.textColor2};
      `;
    }
  }}

  &:hover {
    background: ${props => props.theme.pointLigntGrdColor8};
    color: ${props => props.theme.pointColor};
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
    font-size: 16px;
  }
`;

const RightButton = styled.button<{ changeColor?: number }>`
  width: 70px;
  height: 100%;
  cursor: pointer;
  border-radius: 4px;
  /* font-weight: bold; */

  ${props => {
    if (props.changeColor) {
      return ` 
      background:  ${props.theme.pointLigntGrdColor8};
      color: ${props.theme.pointColor};`;
    } else {
      return ` 
      background: ${props.theme.bgColor2};
      color: ${props.theme.textColor2};
      `;
    }
  }}

  &:hover {
    background: ${props => props.theme.pointLigntGrdColor8};
    color: ${props => props.theme.pointColor};
  }
  @media ${device.mobile} {
    font-size: 10px;
  }

  @media ${device.tablet} {
    font-size: 12px;
  }

  @media ${device.laptop} {
    font-size: 14px;
  }

  @media ${device.desktop} {
    font-size: 16px;
  }
`;

const LearningButton = styled.button`
  margin-left: 2%;
  margin-right: 2%;
  background-color: white;
  border-radius: 16px;
  padding: 1%;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
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

  const fetchShorts = async (difficulty: string) => {
    const shorts = await getShortsRecomm(difficulty);
    setShortsData(shorts);
  };

  const fetchVideo = async (difficulty: string) => {
    let data: HomeRecomm[] = await getVideoRecomm(difficulty);
    data = [...data.slice(9, 12), ...data, ...data.slice(0, 3)];
    data = data.map(item => {
      return { ...item };
    });
    // slice로 복사된 객체 얕은 복사실행
    setVideoData(data);
  };

  const fetchData = (difficulty: string) => {
    fetchShorts(difficulty);
    fetchVideo(difficulty);
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
        <div className="top-wrapper">
          <div className="searchbar-box">
            <SearchBar></SearchBar>
            {/* <LearningButton onClick={() => navigate('/still-learn')}>
              Learning
            </LearningButton> */}
          </div>
          <div className="btn-box">
            <BtnWrapper>
              <LeftButton
                changeColor={button[0]}
                onClick={() => changeDifficulty(0)}
              >
                초급
              </LeftButton>
              <Button
                changeColor={button[1]}
                onClick={() => changeDifficulty(1)}
              >
                중급
              </Button>
              <RightButton
                changeColor={button[2]}
                onClick={() => changeDifficulty(2)}
              >
                고급
              </RightButton>
            </BtnWrapper>
          </div>
        </div>
        <VideoTitle>추천 영상</VideoTitle>
        {videoData.length !== 0 && (
          <Carousel data={videoData} setVideoData={setVideoData}></Carousel>
        )}
        <ShortsTitle>오늘의 문장</ShortsTitle>
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
