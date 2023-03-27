import SearchBar from 'components/common/SearchBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchVideoData, searchSenData } from 'utils/api/searchApi';

const SearchPage = () => {
  const { content } = useParams();
  const pathName = 'SEARCH';
  const searchWord = useState<string | null>(null);
  const [video, setVideo] = useState([]);
  const [shorts, setShorts] = useState([]);

  const fetchData = async () => {
    const videoData = await searchVideoData();
    const shortData = await searchSenData();
    console.log(videoData, shortData);
  };

  useEffect(() => {
    if (content) {
      fetchData();
    }
  }, [content]);

  return <SearchBar pathName={pathName}></SearchBar>;
};

export default SearchPage;
