import styled from 'styled-components';

const Box = styled.div`
  /* width: 100vh; */
  /* height: 100vh; */
  background-color: ${props => props.theme.mainColor};
`;

const Title = styled.h1`
  font-size: 3.333vw;
  color: ${props => props.theme.pointLigntGrdColor1};
`;

const LandingPage = () => {
  return (
    <Box>
      <Title>LandingPage</Title>
    </Box>
  );
};

export default LandingPage;
