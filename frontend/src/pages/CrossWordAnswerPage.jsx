import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: white;
  .main {
    grid-row: 2;
    grid-column: 1/3;
    display: grid;
    grid-template-rows: repeat(8, 7vmin);
    grid-template-columns: repeat(8, 7vmin);
    grid-gap: 2px;
    @media screen and (min-width: 900px) {
      grid-row: 2/4;
      grid-column: 1;
      display: grid;
      grid-template-rows: repeat(8, 3vw);
      grid-template-columns: repeat(8, 3vw);
      grid-gap: 2px;
    }
  }
  ins,
  del {
    border-radius: 2px;
  }

  del {
    background-color: #ffdbb3;
  }

  ins {
    position: relative;
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: white;
    border: 1px solid #444;
    text-decoration: none;
    font-size: calc(24px + 0.5vmin);
    padding: 0;
    margin: 0;
    text-transform: uppercase;
  }

  ins[data-clue] {
    cursor: pointer;
    &:hover {
      scale: 1.05;
      transition: 0.4s;
      z-index: 10;
    }
  }

  ins[data-clue]:before {
    font-family: 'Libre Baskerville';
    position: absolute;
    top: 1px;
    left: 2px;
    font-size: 15px;
    content: attr(data-clue);
  }

  ins.highlight {
    background-color: #e6e4f4;
  }

  ins.editting {
    background-color: #b4adde;
  }

  ins.cursor {
    box-shadow: inset 0 0 0 4px #717171;
    animation-name: pulse;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
  }
`;

const CrossWordAnswerPage = props => {
  const [state, setState] = useState([]);
  useEffect(() => {
    setState(props.state.current.realAnswer.flat());
  }, []);
  return (
    <Wrapper>
      <div className="main">
        {state.map((item, idx) => {
          if (item !== '.') {
            return <ins key={idx}>{item}</ins>;
          } else {
            return <del key={idx}></del>;
          }
        })}
      </div>
    </Wrapper>
  );
};

export default CrossWordAnswerPage;
