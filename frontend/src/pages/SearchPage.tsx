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

const Wrapper = styled.div`
  margin-left: 3%;
`;
const VideoWrapper = styled.div`
  position: relative;
  width: 30%;
  .thumbnail {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 16px;
    margin-top: 2vh;
  }
  .video-level {
    height: 15%;
    position: absolute;
    top: 4%;
    left: 4%;
  }
  .book-mark {
    height: 20%;
    position: absolute;
    left: 90%;
    top: 0;
  }
`;

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}

const SearchPage = () => {
  const { content } = useParams();
  const pathName = 'SEARCH';
  const searchWord = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideo] = useState<SearchedVideo[]>([]);
  const { modalOpen, setModalOpen } = useOutletContext<Props>();
  const [shortsData, setShortsData] = useState<Shorts[]>([]);
  const [shorts, setShorts] = useState<Shorts | null>(null);

  const fetchData = async () => {
    const videoData = await searchVideoData();
    const shortData = await searchSenData();
    console.log(shortData);
    setVideo(videoData);
    setShortsData(shortData);
  };

  useEffect(() => {
    if (content) {
      fetchData();
    }
  }, [content]);

  return (
    <Wrapper>
      {modalOpen && <ShortsModal shorts={shorts} setOpenModal={setModalOpen} />}
      <SearchBar pathName={pathName}></SearchBar>
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
          </VideoWrapper>
        );
      })}
      <ShortsCarousel
        data={shortsData}
        setOpenModal={setModalOpen}
        setShortsId={setShorts}
      ></ShortsCarousel>
    </Wrapper>
  );
};

export default SearchPage;
