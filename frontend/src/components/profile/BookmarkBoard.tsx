import { Stack, Box, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

//style
const Bookmark = styled.div`
  .unclicked-button {
    background: ${props => props.theme.mainLightColor};
  }
  .clicked-button {
    background: ${props => props.theme.mainColor};
  }
`;

//onClick
const handleVideoBookmark = () => {
  console.log('영상 북마크 열기');
};
const handleSentenceBookmark = () => {
  console.log('문장 북마크 열기');
};
const handleWordBookmark = () => {
  console.log('단어 북마크 열기');
};

const BookmarkBoard = () => {
  return (
    <div>
      <Bookmark>
        <Box>
          <Stack>
            <Button
              className="unclicked-button"
              variant="contained"
              size="large"
              onClick={handleVideoBookmark}
              style={{
                margin: '0px 0px 0px 50px',
                borderRadius: '30px 0px 0px 30px',
                width: '1em',
                height: '8em',
                // position: 'absolute',
                left: '5%',
                // top: '60%',
                transform: 'translate(-95%, 280%)',
              }}
            >
              {' '}
              <Typography align="center" color="white" fontSize={'20px'}>
                영상
              </Typography>
            </Button>
            <Button
              className="clicked-button"
              variant="contained"
              size="large"
              onClick={handleSentenceBookmark}
              style={{
                margin: '0px 0px 0px 50px',
                borderRadius: '30px 0px 0px 30px',
                width: '1em',
                height: '8em',
                // position: 'absolute',
                left: '5%',
                // top: '73.5%',
                transform: 'translate(-95%, 280%)',
              }}
            >
              <Typography align="center" color="white" fontSize={'20px'}>
                문장
              </Typography>
            </Button>
            <Button
              className="unclicked-button"
              variant="contained"
              size="large"
              onClick={handleWordBookmark}
              style={{
                margin: '0px 0px 0px 50px',
                borderRadius: '30px 0px 0px 30px',
                width: '1em',
                height: '8em',
                // position: 'absolute',
                left: '5%',
                // top: '87%',
                transform: 'translate(-95%, 280%)',
              }}
            >
              {' '}
              <Typography align="center" color="white" fontSize={'20px'}>
                단어
              </Typography>
            </Button>
          </Stack>
          <Paper
            elevation={3}
            style={{
              width: '1300px',
              height: '360px',
              padding: 10,
              margin: '0px 0px 0px 0px',
              // position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(9.7%, -6.5%)',
            }}
          >
            <Typography
              align="left"
              color="black"
              fontSize={'30px'}
              style={{
                // padding: 10,
                margin: '10px 0px 0px 20px',
              }}
            >
              Bookmarked Sentences
            </Typography>
          </Paper>
        </Box>
      </Bookmark>
    </div>
  );
};

export default BookmarkBoard;
