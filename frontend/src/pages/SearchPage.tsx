import SearchBar from 'components/common/SearchBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const Wrapper = styled.div`
  margin-left: 3%;
  .short-wrapper {
    width: 90%;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  .thumbnail {
    width: 25%;
    height: 100%;
    display: block;
    border-radius: 16px;
    margin-top: 2%;
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
    top: 12.5%;
  }
  .content {
    padding: 2%;
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
      font-size: 30px;
    }
  }
`;

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const SearchPage = () => {
  const { content } = useParams();
  const searchWord = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideo] = useState<SearchedVideo[]>([]);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shorts, setShorts] = useState<Shorts | null>(null);

  const fetchData = async (content: string) => {
    const videoData = await searchVideoData(content);
    const shortData = await searchSenData(content);
    console.log(shortData, videoData);
    setVideo(videoData);
    setShortsData(shortData);
  };

  useEffect(() => {
    if (content) {
      fetchData(content);
    }
  }, [content]);

  return (
    <Wrapper>
      {modalOpen && <ShortsModal shorts={shorts} setOpenModal={setModalOpen} />}
      <SearchBar fetchData={fetchData}></SearchBar>
      {videos.map((video, idx) => {
        return (
          <VideoWrapper key={idx}>
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
            <div className="content">{video.title}</div>
          </VideoWrapper>
        );
      })}
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
