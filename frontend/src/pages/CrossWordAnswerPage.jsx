import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { flexbox } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  .second-main {
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

const Modal = styled.div`
  display: flex;

  width: 30%;
  height: 80%;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  align-items: center;
  background: white;
`;

const Replay = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  margin-top: 20%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.theme.whiteColor};
  &:hover {
    background-color: #fffacb;
    transition: all 0.3s;
    transform: translateY(3px);
`;

const Stop = styled.div`
  width: 30%;
  height: 100%;
  margin-top: 20%;
  border-radius: 16px;
  cursor: pointer;

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #f9cf00;
    transition: all 0.3s;
    transform: translateY(3px);
  }
`;

const CrossWordAnswerPage = props => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props.state.current);
  });

  const goHome = () => {
    navigate('/home');
  };
  const rePlay = () => {
    props.setFinish(false);
  };

  return (
    <Wrapper>
      <Modal>
        <div className="second-main">
          {props.state.current.realAnswer.flat().map((item, idx) => {
            if (item !== '.') {
              return <ins key={idx}>{item}</ins>;
            } else {
              return <del key={idx}></del>;
            }
          })}
        </div>
        <h1>맞은 갯수: {props.state.current.correct}</h1>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '10%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Replay onClick={() => rePlay()}>다시하기</Replay>
          <Stop onClick={() => goHome()}>그만하기</Stop>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default CrossWordAnswerPage;
