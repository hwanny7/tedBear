import React from 'react';
import styled from 'styled-components';
import MoonLoader from 'react-spinners/MoonLoader';

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem;
  text-align: center;
`;

const Spinner = () => {
  return (
    <Background>
      <MoonLoader color="#6255A4" size="300px" />
    </Background>
  );
};

export default Spinner;
