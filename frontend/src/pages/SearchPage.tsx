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
import ShortsCarousel from 'components/short/ShortsCarousel';
import { Shorts } from 'utils/api/recommApi';
import ShortsModal from 'components/short/ShortsModal';
import { device } from 'utils/mediaQuery';
import zIndex from '@mui/material/styles/zIndex';

const Wrapper = styled.div`
  margin-left: 3%;
  .short-wrapper {
    width: 88%;
  }
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
  .video-level {
    height: 15%;
    position: absolute;
    top: 15%;
    left: 1%;
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

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const SearchPage = () => {
  const { content } = useParams();
  const [searchWord, setSearchWord] = useState<string>('');
  const [loading, setLoading] = useState<string>('+ 8 more');
  const [videos, setVideo] = useState<SearchedVideo[]>([]);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shorts, setShorts] = useState<Shorts | null>(null);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();

  const fetchData = async (content: string) => {
    const videoData = await searchVideoData(content, 0);
    const shortData = await searchSenData(content);
    setVideo(videoData);
    setPage(0);
    setShortsData(shortData);
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

  useEffect(() => {
    if (content) {
      fetchData(content);
    }
  }, [content]);

  const handleClick = (watchId: string) => {
    navigate(`/learning/${watchId}`);
  };

  return (
    <Wrapper>
      {modalOpen && <ShortsModal shorts={shorts} setOpenModal={setModalOpen} />}
      <StickySearchBar>
        <SearchBar fetchData={fetchData}></SearchBar>
      </StickySearchBar>

      <VideoTitle>Related Videos</VideoTitle>
      {videos.map((video, idx) => {
        return (
          <VideoWrapper
            key={idx}
            onClick={() => {
              handleClick(video.watchId);
            }}
          >
            <img src={video.thumbnailUrl} alt="" className="thumbnail" />
            <img
              src={VideoLevel}
              className="video-level"
              style={{
                filter:
                  'invert(45%) sepia(78%) saturate(1707%) hue-rotate(161deg) brightness(93%) contrast(103%)',
              }}
            ></img>
            <img
              src={video.bookmarked ? BookmarkFull : BookmarkEmpty}
              className="book-mark"
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
        <ShortsCarousel
          data={shortsData}
          setOpenModal={setModalOpen}
          setShortsId={setShorts}
        ></ShortsCarousel>
      </div>
    </Wrapper>
  );
};

export default SearchPage;
