import SearchBar from 'components/common/SearchBar';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  searchVideoData,
  searchSenData,
  SearchedVideo,
} from 'utils/api/searchApi';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import VideoLevel from 'assets/img/videoLevel.svg';
import { useOutletContext } from 'react-router-dom';
import { Shorts } from 'utils/api/recommApi';
import ShortsModal from 'components/short/ShortsModal';
import { device } from 'utils/mediaQuery';
import ShortsPageNation from 'components/short/ShortsPageNation';
import { deleteVideoBookmark, postVideoBookmark } from 'utils/api/learningApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import buttonLeft from 'assets/img/buttonLeft.svg';
import buttonRight from 'assets/img/buttonRight.svg';

interface BadgeProps {
  score: number;
}

const ViedoLevelImg = styled.img<BadgeProps>`
  height: 15%;
  position: absolute;
  top: 15%;
  left: 1%;
  filter: ${props => {
    if (props.score == 0) {
      return `${props.theme.badgeRed}`;
    } else if (props.score == 1) {
      return `${props.theme.badgeOrange}`;
    } else if (props.score == 2) {
      return `${props.theme.badgeYellow}`;
    } else if (props.score == 3) {
      return `${props.theme.badgeGreen}`;
    } else if (props.score == 4) {
      return `${props.theme.badgeBlue}`;
    } else if (props.score == 5) {
      return `${props.theme.badgeIndigo}`;
    } else if (props.score == 6) {
      return `${props.theme.badgePurple}`;
    } else if (props.score == 7) {
      return `${props.theme.badgeBronze}`;
    } else if (props.score == 8) {
      return `${props.theme.badgeSilver}`;
    } else if (props.score == 9) {
      return `${props.theme.badgGold}`;
    } else {
      return `${props.theme.badgeUnlank}`;
    }
  }};
`;

const VideoWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  .thumbnail {
    width: 25%;
    height: 25vh;
    display: block;
    border-radius: 16px;
    margin-top: 2%;
    &:hover {
      cursor: pointer;
    }
  }
  .book-mark {
    height: 20%;
    position: absolute;
    left: 22%;
    top: 12.8%;
    &:hover {
      cursor: pointer;
    }
  }
  .content {
    padding: 2%;
    &:hover {
      cursor: pointer;
      color: #7e7d7d;
      transition: all 0.3s;
      transform: translateY(3px);
    }
    @media ${device.mobile} {
      font-size: 10px;
    }

    @media ${device.tablet} {
      font-size: 13px;
    }

    @media ${device.laptop} {
      font-size: 20px;
    }

    @media ${device.desktop} {
      font-size: 25px;
    }
  }
`;

const VideoTitle = styled.span`
  display: block;
  margin-top: 2%;
  @media ${device.mobile} {
    font-size: 10px;
  }

  @media ${device.tablet} {
    font-size: 15px;
  }

  @media ${device.laptop} {
    font-size: 25px;
  }

  @media ${device.desktop} {
    font-size: 35px;
  }
`;

const LoadingTitle = styled.div`
  color: #7e7d7d;
  cursor: pointer;
  padding: 1%;
  border-radius: 16px;
  &:hover {
    background-color: rgba(116, 116, 116, 0.5);
    transition: all 0.3s;
    transform: translateY(3px);
  }
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
    font-size: 40px;
  }
`;

const StickySearchBar = styled.div`
  position: sticky;
  top: 1%;
  z-index: 2;
`;

const Wrapper = styled.div`
  margin-left: 2%;
  .short-wrapper {
    padding-bottom: 5%;
    padding-top: 2%;
    margin-left: 2%;
  }
`;

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const SearchPage = () => {
  // const SlickArrowLeft = ({ ...props }) => (
  //   <img src={buttonLeft} alt="prevArrow" {...props} />
  // );

  // const SlickArrowRight = () => (
  //   <img
  //     src={buttonRight}
  //     alt="nextArrow"
  //     onClick={() => {
  //       requestShorts(1);
  //     }}
  //   />
  // );

  // const settings = {
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   prevArrow: <SlickArrowLeft />,
  //   nextArrow: <SlickArrowRight />,
  // };

  const { content } = useParams();
  const [searchWord, setSearchWord] = useState<string>('');
  const [loading, setLoading] = useState<string>('+ 8 more');
  const [shortsLoading, setShortsLoading] = useState<boolean>(false);
  const [videos, setVideo] = useState<SearchedVideo[]>([]);
  const [page, setPage] = useState<number>(0);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const navigate = useNavigate();

  const [shorts, setShorts] = useState<Shorts | null>(null);
  // 유튜브 모달용
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shortPage, setShortPage] = useState<number>(0);
  const [props, setProps] = useState<Shorts[]>([]);
  const [next, setNext] = useState<boolean>(false);

  // List, 지금까지 page, 자식한테 내려줄 props

  const fetchData = async (content: string) => {
    const videoData = await searchVideoData(content, 0);
    const shortData = await searchSenData(content, 0);
    const shortData2 = await searchSenData(content, 1);
    if (shortData2.length) {
      setShortPage(1);
      setNext(true);
    } else {
      setShortPage(0);
    }
    setProps(shortData);
    const combinedData = shortData.concat(shortData2);
    setShortsData(combinedData);

    setVideo(videoData);
    setPage(0);
    setSearchWord(content);
    setLoading('+ 8 more');
  };

  const requestVideo = async () => {
    if (loading === '+ 8 more') {
      setLoading('Loading...');
      const videoData = await searchVideoData(searchWord, page + 1);
      if (videoData.length) {
        setVideo(prev => prev.concat(videoData));
        setLoading('+ 8 more');
        console.log('비디오 갯수', videoData.length, page);
        setPage(prev => prev + 1);
      } else {
        console.log('data가 없습니다.');
        setLoading('영상이 없습니다.');
      }
    }
  };

  const requestShorts = async (nextPage: number) => {
    if (shortPage === nextPage) {
      const shortData = await searchSenData(searchWord, shortPage + 1);
      if (shortData.length) {
        setShortsData(prev => prev.concat(shortData));
        setShortPage(prev => prev + 1);
      } else {
        console.log('더이상 없어!');
        setNext(false);
      }
    }
    console.log('성공!');
    const copy = shortsData.slice(nextPage * 5, nextPage * 5 + 5);
    setProps(copy);
  };

  useEffect(() => {
    if (content) {
      fetchData(content);
    }
  }, [content]);

  const handleClick = (watchId: string) => {
    navigate(`/learning/${watchId}`);
  };

  const handleVideoBm = (video: SearchedVideo, idx: number) => {
    const status = video.bookMarked;
    const copy = [...videos];
    console.log(copy[idx].bookMarked);
    copy[idx].bookMarked = !copy[idx].bookMarked;
    setVideo(copy);
    console.log(copy[idx].bookMarked);

    if (status) {
      deleteVideoBookmark({ videoNo: video.no });
    } else {
      postVideoBookmark({ videoNo: video.no });
    }
  };

  return (
    <Wrapper>
      {modalOpen && (
        <ShortsModal
          setShortsData={setShortsData}
          shorts={shorts}
          setOpenModal={setModalOpen}
        />
      )}
      <StickySearchBar>
        <SearchBar fetchData={fetchData}></SearchBar>
      </StickySearchBar>

      <VideoTitle>Related Videos</VideoTitle>
      {videos.map((video, idx) => {
        return (
          <VideoWrapper key={idx}>
            <img
              src={video.thumbnailUrl}
              alt=""
              className="thumbnail"
              onClick={() => {
                handleClick(video.watchId);
              }}
            />
            <ViedoLevelImg src={VideoLevel} score={video.score} />
            <img
              src={video.bookMarked ? BookmarkFull : BookmarkEmpty}
              className="book-mark"
              onClick={() => {
                handleVideoBm(video, idx);
              }}
            ></img>
            <div
              className="content"
              onClick={() => {
                handleClick(video.watchId);
              }}
            >
              {video.title}
            </div>
          </VideoWrapper>
        );
      })}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingTitle onClick={requestVideo}>{loading}</LoadingTitle>
      </div>
      <VideoTitle>Related Shorts</VideoTitle>
      <div className="short-wrapper">
        <ShortsPageNation
          data={props}
          upStreamPage={next}
          requestShorts={requestShorts}
          setOpenModal={setModalOpen}
          setShortsId={setShorts}
        ></ShortsPageNation>
      </div>
      {/* <Slider {...settings}>
        {shortsData.map((item, idx) => {
          return (
            <img
              key={idx}
              className="main-img"
              src={`https://i.ytimg.com/vi/${item.watchId}/hq${
                (idx % 3) + 1
              }.jpg`}
              alt=""
              // onClick={() => {
              //   setOpenModal(true);
              //   setShortsId(Thumnail);
              // }}
            ></img>
          );
        })}
      </Slider> */}
    </Wrapper>
  );
};

export default SearchPage;
