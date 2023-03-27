import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  pathName: string;
}

const SearchBar = ({ pathName }: Props) => {
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    e.preventDefault();
    const content = e.target[1].value;
    if (pathName === 'HOME') {
      navigate(`/search/${content}`);
    }
    console.log(pathName);
  };

  const handleClick = (e: any) => {
    console.log(e.target);
    console.log(pathName);
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
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
};

export default SearchBar;
