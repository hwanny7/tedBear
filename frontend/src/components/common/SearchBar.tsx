import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';

interface Props {
  fetchData?: (content: string) => Promise<void>;
}

const SearchBar = ({ fetchData }: Props) => {
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    e.preventDefault();
    const content = e.target[1].value;
    if (fetchData) {
      fetchData(content);
    } else {
      navigate(`/search/${content}`);
    }
  };

  const handleClick = (e: any) => {
    console.log(e.target);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        marginTop: '3vh',
        height: '5vh',
      }}
      onSubmit={handleSearch}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="검색하기"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
};

export default SearchBar;
