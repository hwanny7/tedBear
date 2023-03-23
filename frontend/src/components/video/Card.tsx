import React from 'react';
import styled from 'styled-components';

interface card {
  title: string;
  id: string;
}

const Wrapper = styled.div`
  > img {
    width: 20vw;
    @media (max-width: 1200px) {
      width: 30vw;
    }

    @media (max-width: 900px) {
      width: 40vw;
    }
    @media (max-width: 600px) {
      width: 80vw;
    }
  }
`;

const Card = ({ card }: { card: card }) => {
  return (
    <Wrapper>
      <img
        src={'https://i.ytimg.com/vi/' + card.id + '/maxresdefault.jpg'}
        alt=""
      />
    </Wrapper>
  );
};

export default Card;
