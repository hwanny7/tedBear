import { useRef, useEffect, useState, useCallback } from 'react';
import cx from 'classnames';
import { getCrossWord } from 'utils/api/gameApi';
import ShortsModal from 'components/short/ShortsModal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import shortsPlay from 'assets/img/shortsPlay.svg';
import { device } from './../utils/mediaQuery';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled, { css } from 'styled-components';

const StyledForm = styled(FormControl)`
  label {
    color: ${props => props.theme.textColor1};
  }
  svg {
    fill: ${props => props.theme.mainColor};
  }
  fieldset {
    border-color: ${props => props.theme.textColor1};
  }
  #demo-simple-select {
    color: ${props => props.theme.textColor1};
  }
`;

const Replay = styled.div`
  padding: 16px 56px;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 24px;
  background-color: #63da9c;
  &:hover {
    background-color: #45976c;
    color: white;
    transition: all 0.3s;
    transform: translateY(3px);
  }
`;

const Description = styled.div`
  color: ${props => props.theme.textColor1};

  @media (max-width: 900px) {
    font-size: 14px;
  }
  @media (min-width: 900px) {
    font-size: 16px;
  }
`;

const Stop = styled.div`
  margin-top: 16px;
  padding: 16px 56px;
  border-radius: 16px;
  cursor: pointer;
  background-color: #ff895b;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #e6622d;
    color: white;
    transition: all 0.3s;
    transform: translateY(3px);
  }
`;

const RealWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  @media (min-width: 900px) {
    height: 100vh;
  }
`;

const Wrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.bgColor2};

  padding: 16px;
  border-radius: 16px;
  box-shadow: 6px 6px 20px #61616142;

  width: 100%;
  min-height: 95vh;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 16px;
  }
  @media (min-width: 900px) {
    margin: 24px 48px;
    flex-direction: row;
  }

  justify-content: space-evenly;
  align-items: center;
  .main {
    margin: 16px;
    grid-row: 2;
    grid-column: 1/3;
    display: grid;

    @media (max-width: 400px) {
      ${props => {
        if (props.size === 8) {
          return css`
            grid-template-rows: repeat(8, 30px);
            grid-template-columns: repeat(8, 30px);
          `;
        } else if (props.size === 12) {
          return css`
            grid-template-rows: repeat(12, 20px);
            grid-template-columns: repeat(12, 20px);
          `;
        } else if (props.size === 16) {
          return css`
            grid-template-rows: repeat(16, 16px);
            grid-template-columns: repeat(16, 16px);
          `;
        }
      }}
    }

    @media (min-width: 400px) {
      ${props => {
        if (props.size === 8) {
          return css`
            grid-template-rows: repeat(8, 40px);
            grid-template-columns: repeat(8, 40px);
          `;
        } else if (props.size === 12) {
          return css`
            grid-template-rows: repeat(12, 28px);
            grid-template-columns: repeat(12, 28px);
          `;
        } else if (props.size === 16) {
          return css`
            grid-template-rows: repeat(16, 20px);
            grid-template-columns: repeat(16, 20px);
          `;
        }
      }}
    }

    @media (min-width: 600px) {
      ${props => {
        if (props.size === 8) {
          return css`
            grid-template-rows: repeat(8, 42px);
            grid-template-columns: repeat(8, 42px);
          `;
        } else if (props.size === 12) {
          return css`
            grid-template-rows: repeat(12, 32px);
            grid-template-columns: repeat(12, 32px);
          `;
        } else if (props.size === 16) {
          return css`
            grid-template-rows: repeat(16, 30px);
            grid-template-columns: repeat(16, 30px);
          `;
        }
      }}
    }

    @media (min-width: 900px) {
      ${props => {
        if (props.size === 8) {
          return css`
            grid-template-rows: repeat(8, 42px);
            grid-template-columns: repeat(8, 42px);
          `;
        } else if (props.size === 12) {
          return css`
            grid-template-rows: repeat(12, 32px);
            grid-template-columns: repeat(12, 32px);
          `;
        } else if (props.size === 16) {
          return css`
            grid-template-rows: repeat(16, 22px);
            grid-template-columns: repeat(16, 22px);
          `;
        }
      }}
    }

    @media (min-width: 1024px) {
      ${props => {
        if (props.size === 8) {
          return css`
            grid-template-rows: repeat(8, 50px);
            grid-template-columns: repeat(8, 50px);
          `;
        } else if (props.size === 12) {
          return css`
            grid-template-rows: repeat(12, 32px);
            grid-template-columns: repeat(12, 32px);
          `;
        } else if (props.size === 16) {
          return css`
            grid-template-rows: repeat(16, 26px);
            grid-template-columns: repeat(16, 26px);
          `;
        }
      }}
    }

    @media (min-width: 1440px) {
      ${props => {
        if (props.size === 8) {
          return css`
            grid-template-rows: repeat(8, 9vmin);
            grid-template-columns: repeat(8, 9vmin);
          `;
        } else if (props.size === 12) {
          return css`
            grid-template-rows: repeat(12, 6vmin);
            grid-template-columns: repeat(12, 6vmin);
          `;
        } else if (props.size === 16) {
          return css`
            grid-template-rows: repeat(16, 4.3vmin);
            grid-template-columns: repeat(16, 4.3vmin);
          `;
        }
      }}
    }

    grid-gap: 2px;
  }
  ins,
  del {
    border-radius: 12px;
  }

  del {
    background-color: #ffdbb3;
  }

  ins {
    position: relative;
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: ${props => props.theme.learningBoxColor2};
    border: 1px solid #444;
    text-decoration: none;

    @media (max-width: 400px) {
      font-size: calc(10px + 0.5vmin);
    }

    @media (min-width: 400px) {
      font-size: calc(12px + 0.5vmin);
    }

    @media (min-width: 600px) {
      font-size: calc(12px + 0.5vmin);
    }
    @media (min-width: 900px) {
      font-size: calc(12px + 0.5vmin);
    }
    @media (min-width: 1024px) {
      font-size: calc(18px + 0.5vmin);
    }
    @media (min-width: 1440px) {
      font-size: calc(20px + 0.5vmin);
    }
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
    background-color: #beb7ea;
  }

  ins.cursor {
    box-shadow: inset 0 0 0 4px #717171;
    animation-name: pulse;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
  }

  @keyframes pulse {
    from {
      box-shadow: inset 0 0 0 4px #717171;
    }
    to {
      box-shadow: inset 0 0 0 6px #717171;
    }
  }
`;

const Content = styled.div`
  margin-bottom: 16px;
  display: flex;
  border-radius: 16px;
  background-color: ${props => props.theme.pointLigntGrdColor8};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 75vh;
  padding: 8px;
  overflow-y: scroll;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: ${props => props.theme.mainLightColor};
    border-radius: 10px;
  }
`;
const SubmitButton = styled.div`
  color: #1a1a1a;
  width: 40%;
  height: 3%;
  margin-top: 2%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  color: white;
  background-color: ${props => props.theme.pointColor};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e86e35;
    transition: all 0.3s;
    transform: translateY(3px);
  }
`;

const ClueBox = styled.div`
  width: 80%;
  margin-top: 16px;
  padding: 3%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-radius: 16px;
  background-color: ${props =>
    props.backgroundColor ? '#b4adde' : props.theme.learningBoxColor2};
  position: relative;

  @media ${device.mobile} {
    font-size: 14px;
  }

  @media ${device.tablet} {
    font-size: 16px;
  }

  @media ${device.laptop} {
    font-size: 14px;
  }

  @media ${device.desktop} {
    font-size: 18px;
  }
  &:hover {
    scale: 1.08;
    transition: 0.4s;
    background-color: ${props =>
      props.backgroundColor ? '#b4adde' : '#e6e4f4'};
  }
  .shorts-button {
    position: absolute;
    width: 5%;
    right: 2%;
    bottom: 5%;
    &:hover {
      scale: 1.1;
      transition: 0.4s;
    }
  }
`;

const NumberBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 36%;
  left: -5%;
  color: white;
  background: ${props => props.theme.mainColor};
  font-size: 14px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

// 왼쪽 박스
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 32px;
  }
  @media (min-width: 900px) {
    height: 100%;
    width: 60%;
  }

  .box-wrapper {
    width: 100%;
    display: flex;
    justify-content: end;
    padding: 0px 56px;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }
  @media (min-width: 900px) {
    height: 100%;
    width: 40%;
  }
`;

// 질문 박스
const Question = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  h1 {
    color: ${props => props.theme.textColor1};
  }
`;

const CrossWordPage = () => {
  const [shorts, setShorts] = useState(null);
  const { modalOpen, setModalOpen } = useOutletContext();
  const [wordList, setWordList] = useState([]);
  const [clueList, setClueList] = useState([]);
  const [size, setSize] = useState(8);
  const state = useRef();
  const [finish, setFinish] = useState(false);
  const [correct, setCorrect] = useState(0);
  const navigate = useNavigate();

  const findClue = useCallback(
    (clueNum, tab) => {
      if (tab) {
        return tab;
      }
      const clues = clueList.filter(item => {
        return item.clue === clueNum;
      });

      return clues[0];

      // if (clues.length === 1) {
      //   return clues[0];
      // } else if (state.current.clue === clues[0].clue) {
      //   return state.current.dir === 'ACROSS' ? clues[1] : clues[0];
      // } else {
      //   return clues[0];
      // }

      // 하나의 지점에서 ACROSS, DOWN 힌트 두 개를 가지고 있을 때 사용
    },
    [clueList],
  );

  const editClue = useCallback(
    (item, idx, tab) => {
      let copy = [...wordList];

      if (state.current.clue) {
        const index = state.current.index;
        if (state.current.dir === 'ACROSS') {
          for (let i = 0; i < state.current.length; i++) {
            copy[i + index].cursor = false;
            copy[i + index].edit = false;
          }
        } else {
          for (let i = 0; i < state.current.length; i++) {
            copy[index + i * size].cursor = false;
            copy[index + i * size].edit = false;
          }
        }
      }

      // 이전에 켜져 있는 edit과 cursor 지우기

      const { clue } = item;
      const el = document.querySelectorAll(`.scroll-${clue - 1}`);
      el[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

      // 해당 힌트로 스크롤 이동시키기

      const { length, dir } = findClue(clue, tab);

      // 수직으로 갈지 수평으로 갈지 불러오기

      let cursor = length - 1;
      for (let i = 0; i < length; i++) {
        if (dir === 'ACROSS') {
          copy[i + idx] = { ...copy[i + idx], edit: true };
          if (
            state.current.answers[Math.floor(idx / size)][(idx % size) + i] ===
              '' &&
            cursor === length - 1
          ) {
            cursor = i;
          }
        } else {
          copy[idx + i * size] = { ...copy[idx + i * size], edit: true };
          if (
            state.current.answers[Math.floor(idx / size + i)][idx % size] ===
              '' &&
            cursor === length - 1
          ) {
            cursor = i;
          }
        }
      }

      // across [math(index / size)][cursor]
      // down [math(index / size) + cursor][index % size]
      // 해당 축에 edit style 입히고, 만약 입력된 값이 있다면 cursor 위치 변경하기

      const nextClueList = clueList.map(item => {
        if (item.clue === clue) {
          item.editting = true;
        }

        if (item.clue === state.current.clue) {
          item.editting = false;
        }
        return item;
      });
      setClueList(nextClueList);

      // 단어 박스 하이라이팅, 그 전에 있던 하이라이팅이 있다면 지우기

      state.current = {
        ...state.current,
        index: idx,
        clue,
        dir,
        length,
        cursor,
      };

      if (state.current.dir === 'ACROSS') {
        copy[state.current.index + state.current.cursor].cursor = true;
      } else {
        copy[state.current.index + state.current.cursor * size].cursor = true;
      }

      setWordList(copy);

      // 해당 축에서 입력된 값이 이미 있다면 그 다음 칸으로, 아니라면 첫번째 칸에 cursor style 입히기
    },
    [wordList, findClue],
  );

  const fetchData = async () => {
    const data = await getCrossWord(size);
    setWordList(
      data.array.map(item => {
        return {
          ...item,
          answer: '',
          cursor: false,
          edit: false,
          editting: false,
          hightlight: false,
        };
      }),
    );
    setClueList(
      data.clueList.map(item => {
        return {
          ...item,
          hightlight: false,
        };
      }),
    );
    state.current = { ...state.current, realAnswer: data.answerBoard };
  };

  useEffect(() => {
    if (!finish) {
      fetchData();
      state.current = {
        index: null,
        clue: null,
        cursor: 0,
        length: null,
        answers: [...Array(size)].map(() => Array(size).fill('')),
        dir: null,
      };
    }
  }, [finish, size]);

  const keyPressHandler = useCallback(
    e => {
      if (finish) return;
      e.preventDefault();
      switch (e.key) {
        case 'Shift':
        case 'Space':
        case 'Enter':
          return;
        case ' ':
          if (modalOpen) {
            setModalOpen(false);
          } else if (state.current.clue) {
            handleShorts(clueList[state.current.clue - 1]);
          }

          // clue 한 개가 across랑 down 가질 경우 리스트 순회하는 걸로 변경해야함
          return;
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowRight':
          if (!state.current.clue) return;
          if (
            (state.current.dir === 'ACROSS') &
            (e.key === 'ArrowUp' || e.key === 'ArrowDown')
          )
            return;
          else if (
            (state.current.dir === 'DOWN') &
            (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
          )
            return;

          break;
        case 'Tab': {
          let nextIndex;
          if (!state.current.clue) {
            nextIndex = -1;
          } else {
            clueList.forEach((element, idx) => {
              if (
                element.clue === state.current.clue &&
                element.dir === state.current.dir
              ) {
                nextIndex = idx;
                return false;
              }
            });
          }

          if (e.shiftKey === true) {
            nextIndex -= 1;
          } else {
            nextIndex += 1;
          }

          // shift key + tap key => 뒤로 가기, tap key => 앞으로 가기

          if (nextIndex === clueList.length) {
            nextIndex = 0;
          } else if (nextIndex < 0) {
            nextIndex = clueList.length - 1;
          }
          editClue(
            wordList[clueList[nextIndex].index],
            clueList[nextIndex].index,
            clueList[nextIndex],
          );

          return;
        }
        case 'Backspace':
          if (!state.current.clue) return;

          if (state.current.dir === 'ACROSS') {
            state.current.answers[Math.floor(state.current.index / size)][
              state.current.cursor
            ] = '';
          } else {
            state.current.answers[
              Math.floor(state.current.index / size) + state.current.cursor
            ][state.current.index % size] = '';
          }

          // 정답에서 해당 인덱스 지우기
          break;
        default:
          if (!state.current.clue) return;
          if (e.key.length > 1) return;
          // 클루가 없거나 이상한 키를 입력했을 때
          if (state.current.dir === 'ACROSS') {
            state.current.answers[Math.floor(state.current.index / size)][
              state.current.cursor + (state.current.index % size)
            ] = e.key;
          } else {
            state.current.answers[
              Math.floor(state.current.index / size) + state.current.cursor
            ][state.current.index % size] = e.key;
          }

          // 정답에 반영하기
          break;
      }

      // across [math(index / size)][cursor]
      // down [math(index / size) + cursor][index % size]

      let copy = [...wordList];
      const { dir, index, cursor, length, answers } = state.current;

      if (dir === 'ACROSS') {
        copy[index + cursor].cursor = false;
        if (e.key.length === 9 && e.key === 'Backspace') {
          copy[index + cursor].answer = '';
        } else if (e.key.length === 1) {
          copy[index + cursor].answer = e.key;
        }
      } else {
        copy[index + cursor * size].cursor = false;
        if (e.key.length === 9 && e.key === 'Backspace') {
          copy[index + cursor * size].answer = '';
        } else if (e.key.length === 1) {
          copy[index + cursor * size].answer = e.key;
        }
      }

      if (e.key.length === 9 && e.key === 'Backspace') {
        state.current.cursor -= 1;
      } else if (e.key.length === 1) {
        state.current.cursor += 1;
        // if (
        //   dir === 'ACROSS' &&
        //   state.current.cursor + 1 < length &&
        //   answers[Math.floor(index / size)][state.current.cursor] !== ''
        // ) {
        //   state.current.cursor += 1;
        // } else if (
        //   dir === 'DOWN' &&
        //   state.current.cursor + 1 < length &&
        //   answers[Math.floor(index / size) + state.current.cursor][
        //     index % size
        //   ] !== ''
        // ) {
        //   state.current.cursor += 1;
        // }
        // 키 입력할 때 해당 인덱스가 채워져 있다면 다음 인덱스로 이동
      } else {
        if (e.key === 'ArrowLeft') {
          state.current.cursor -= 1;
        } else if (e.key === 'ArrowRight') {
          state.current.cursor += 1;
        } else if (e.key === 'ArrowDown') {
          state.current.cursor += 1;
        } else if (e.key === 'ArrowUp') {
          state.current.cursor -= 1;
        }
      }

      // 다음 커서 위치 설정 (키 입력에 따라서)

      if (state.current.cursor < 0) {
        state.current.cursor = 0;
      } else if (state.current.cursor > length - 1) {
        state.current.cursor = length - 1;
      }

      // 커서가 length 범위를 나가는 예외상황 때 수정

      if (dir === 'ACROSS') {
        copy[index + state.current.cursor].cursor = true;
      } else {
        copy[index + state.current.cursor * size].cursor = true;
      }
      setWordList(copy);

      // 다음 커서 반영
    },
    [wordList, clueList, editClue, modalOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, [keyPressHandler]);

  const toggleClue = (clue, boolean) => {
    const { index, dir, length } = clue;
    let copy = [...wordList];
    for (let i = 0; i < length; i++) {
      if (dir === 'ACROSS') {
        copy[i + index] = {
          ...copy[i + index],
          hightlight: boolean,
        };
      } else {
        copy[index + i * size] = {
          ...copy[index + i * size],
          hightlight: boolean,
        };
      }
    }

    setWordList(copy);
  };

  const clickClue = clue => {
    const { index } = clue;
    editClue(wordList[index], index);
  };

  const handleShorts = clue => {
    const { shorts } = clue;
    setShorts(shorts);
    setModalOpen(true);
  };

  const handleAnswer = () => {
    let correct = 0;
    let copy = [...wordList];
    let array = [];
    clueList.forEach(item => {
      let mine = '';
      const { index, dir, length, answer } = item;
      for (let i = 0; i < length; i++) {
        if (dir === 'ACROSS') {
          mine +=
            state.current.answers[Math.floor(index / size)][(index % size) + i];
          copy[index + i].answer = answer[i];
          copy[index + i].cursor = false;
          copy[index + i].edit = false;
          copy[index + i].editting = false;
          copy[index + i].hightlight = false;
        } else {
          mine +=
            state.current.answers[Math.floor(index / size + i)][index % size];
          copy[index + i * size].answer = answer[i];
          copy[index + i * size].cursor = false;
          copy[index + i * size].edit = false;
          copy[index + i * size].editting = false;
          copy[index + i * size].hightlight = false;
        }
      }
      if (mine === answer) {
        correct += 1;
        array.push(item);
      }
    });
    array.forEach(item => {
      const { index, dir, length } = item;
      for (let i = 0; i < length; i++) {
        if (dir === 'ACROSS') {
          copy[index + i].hightlight = true;
        } else {
          copy[index + i * size].hightlight = true;
        }
      }
    });
    setWordList(copy);
    setFinish(true);
    setCorrect(correct);
  };

  const handleChange = event => {
    const nextMode = event.target.value;
    if (nextMode === 'Easy') {
      setSize(8);
    } else if (nextMode === 'Normal') {
      setSize(12);
    } else {
      setSize(16);
    }
  };

  const modeValue = () => {
    if (size === 8) {
      return 'Easy';
    } else if (size === 12) {
      return 'Normal';
    } else {
      return 'Hard';
    }
  };

  const goHome = () => {
    navigate('/home');
  };
  const rePlay = () => {
    setFinish(false);
  };

  return (
    <RealWrapper>
      <Wrapper size={size}>
        <LeftBox>
          <div className="box-wrapper">
            {finish ? undefined : (
              <Box
                sx={{
                  m: 1,
                  width: '20%',
                  marginLeft: '6%',
                }}
                size="small"
              >
                <StyledForm fullWidth>
                  <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={modeValue()}
                    label="Mode"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Easy'}>Easy</MenuItem>
                    <MenuItem value={'Normal'}>Normal</MenuItem>
                    <MenuItem value={'Hard'}>Hard</MenuItem>
                  </Select>
                </StyledForm>
              </Box>
            )}
          </div>
          <div className="main">
            {wordList.map((word, idx) => {
              if (word.clue) {
                return (
                  <ins
                    key={idx}
                    data-clue={word.clue}
                    onClick={finish ? undefined : () => editClue(word, idx)}
                    className={cx({
                      cursor: word.cursor,
                      editting: word.edit,
                      highlight: word.hightlight,
                    })}
                  >
                    {word.answer}
                  </ins>
                );
              } else if (word.box) {
                return (
                  <ins
                    key={idx}
                    className={cx({
                      cursor: word.cursor,
                      editting: word.edit,
                      highlight: word.hightlight,
                    })}
                  >
                    {word.answer}
                  </ins>
                );
              } else {
                return <del key={idx}></del>;
              }
            })}
          </div>
          {!finish && (
            <Description>
              Tab / Tab + Shift / 방향키 / 스페이스바 (쇼츠 상영) / 사용
              가능합니다!
            </Description>
          )}
        </LeftBox>
        <RightBox>
          {finish ? (
            <ResultBox>
              <h1>
                맞은 갯수: {correct} / {clueList.length}
              </h1>
              <Replay onClick={() => rePlay()}>다시하기</Replay>
              <Stop onClick={() => goHome()}>그만하기</Stop>
            </ResultBox>
          ) : (
            <Question>
              <Content>
                {clueList.map((clue, idx) => {
                  return (
                    <ClueBox
                      backgroundColor={clue.editting}
                      key={idx}
                      className={`scroll-${idx}`}
                      onClick={() => clickClue(clue)}
                      onMouseOver={() => toggleClue(clue, true)}
                      onMouseOut={() => toggleClue(clue, false)}
                    >
                      {clue.dic}
                      <img
                        src={shortsPlay}
                        alt=""
                        className="shorts-button"
                        onClick={() => {
                          handleShorts(clue);
                        }}
                      />
                      <NumberBox>{idx + 1}</NumberBox>
                    </ClueBox>
                  );
                })}
              </Content>
              <SubmitButton onClick={() => handleAnswer()}>
                제출하기
              </SubmitButton>
            </Question>
          )}
        </RightBox>
        {modalOpen && (
          <ShortsModal shorts={shorts} setOpenModal={setModalOpen} />
        )}
      </Wrapper>
    </RealWrapper>
  );
};

export default CrossWordPage;
