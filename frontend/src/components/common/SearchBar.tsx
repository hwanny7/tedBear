import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

import { Form, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formControlClasses } from '@mui/material';

interface Props {
  fetchData?: (content: string) => Promise<void>;
}

const SearchBar = ({ fetchData }: Props) => {
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    e.preventDefault();
    const content = e.target[1].value;
    e.target[1].value = '';
    if (fetchData) {
      fetchData(content);
    } else {
      navigate(`/search/${content}`);
    }
  };

  // const StyledPaper = styled(Paper)`
  //   padding: 4px;
  //   display: flex;
  //   align-items: center;
  //   margin-top: 3vh;
  //   height: 40px;
  //   border-radius: 50px;

  //   @media (max-width: 600px) {
  //     width: 100%;
  //   }

  //   @media (min-width: 600px) {
  //     width: 70%;
  //   }
  // `;

  const handleClick = (e: any) => {
    console.log(e.target);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '4px',
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        marginTop: '3vh',
        height: '40px',
        borderRadius: '50px',
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
