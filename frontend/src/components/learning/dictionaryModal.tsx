import styled, { css } from 'styled-components';
import Search from 'assets/img/search.svg';
import { useEffect, useState } from 'react';
import { getSearchWord, SearchedWord } from 'utils/api/learningApi';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuProps {
  menu: number;
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.mainColor};
  width: 400px;
  height: 450px;
  z-index: 6;
  position: absolute;
  bottom: 56px;
  right: 56px;
  border-radius: 24px;
  box-shadow: 6px 6px 8px #00000042;
  transition: 1s;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: relative;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.input`
  background-color: ${props => props.theme.whiteColor};
  width: 90%;
  height: 60%;
  border-radius: 50px;
  box-shadow: 6px 6px 8px #00000042;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 8px 16px;

  &:focus {
    outline: none;
  }
`;

const SearchResult = styled.div`
  background-color: ${props => props.theme.whiteColor};
  width: 90%;
  height: 90%;
  border-radius: 24px;
  box-shadow: 6px 6px 8px #00000042;
  padding: 8px 20px;
`;

const SearchImg = styled.img`
  width: 20px;
  cursor: pointer;
  position: absolute;
  right: calc(100% - 370px);
  height: calc(100% - 24px);
`;

const MeanBox = styled.div`
  width: 100%;
  height: 85%;
  padding: 16px;
  border: 1px solid red;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer; // 커서 포인터 왜 안돼..
  }
  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: ${props => props.theme.mainLightColor};
    border-radius: 10px;
  }

  p:nth-child(1) {
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 4px;
  }

  p:nth-child(2) {
    font-size: 14px;
  }
`;

const SentenceBox = styled.div`
  border: 1px solid blue;
  width: 100%;
  height: 85%;
  padding: 16px;
`;

const Menu = styled.div<MenuProps>`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: first baseline;
  border-bottom: 1px solid ${props => props.theme.blackColorLight2};
  border: 1px solid red;

  div {
    width: 80px;
    margin-right: 16px;
    border-radius: 50px;
    text-align: center;
    padding: 8px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: ${props => props.theme.pointLigntGrdColor3};
    }
  }

  ${props => {
    if (props.menu == 2) {
      return css`
        div:nth-child(1) {
          background-color: #ebebeb;
        }
        div:nth-child(2) {
          background-color: ${props => props.theme.pointLigntGrdColor3};
        }
      `;
    } else {
      return css`
        div:nth-child(2) {
          background-color: #ebebeb;
        }
        div:nth-child(1) {
          background-color: ${props => props.theme.pointLigntGrdColor3};
        }
      `;
    }
  }}
`;

const DictionaryModal = ({ setOpenModal }: Props) => {
  const [keyword, setKeyword] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [wordDesc, setWordDesc] = useState<SearchedWord | null>(null);

  const onSetKeyword = (el: any) => {
    setKeyword(el.target.value);
  };

  const onSearchWord = () => {
    const fetchData = async () => {
      const data = await getSearchWord(keyword, 3, 1);
      setWordDesc(data);
    };
    fetchData();

    setWord(keyword);

    // onRegexMean();
  };

  // 단어 의미 정리
  // const [wordMean, setWordMean] = useState<string[]>();
  // const onRegexMean = async () => {
  //   console.log('?????');
  //   const meanArr = wordDesc?.wordInfo.mean.split(/[0-9]/);
  //   await setWordMean(meanArr);
  // };

  // 메뉴 버튼
  const [menu, setMenu] = useState<number>(1);

  return (
    <Wrapper>
      <SearchBox>
        <SearchBar
          placeholder="영어 단어를 입력하세요."
          onChange={el => onSetKeyword(el)}
        />
        <SearchImg src={Search} onClick={onSearchWord} />
      </SearchBox>
      <ContentBox>
        <SearchResult>
          <Menu menu={menu}>
            <div onClick={() => setMenu(1)}>의미</div>
            <div onClick={() => setMenu(2)}>예문</div>
          </Menu>
          {menu == 2 ? (
            <SentenceBox>예문</SentenceBox>
          ) : (
            <MeanBox>
              {wordDesc && <p>{word}</p>}
              <p>
                {wordDesc?.wordInfo.mean}
                {/* {wordMean?.map((el, index) => {
                  if (index != 0) {
                    return (
                      <>
                        {index}
                        {el} <br />
                      </>
                    );
                  }
                })} */}
              </p>
            </MeanBox>
          )}
        </SearchResult>
      </ContentBox>
    </Wrapper>
  );
};

export default DictionaryModal;
