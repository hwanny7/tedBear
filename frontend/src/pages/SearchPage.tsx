import SearchBar from 'components/common/SearchBar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const { state } = useLocation();
  const searchWord = useState<string | null>(null);

  useEffect(() => {
    if (state) {
      console.log('받았다!');
    }
  }, [state]);

  return <SearchBar></SearchBar>;
};

export default SearchPage;
