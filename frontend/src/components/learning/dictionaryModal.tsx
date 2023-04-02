import styled, { css } from 'styled-components';
import Search from 'assets/img/search.svg';
import { useEffect, useState } from 'react';
import {
  deleteWordBookmark,
  getSearchWord,
  postWordBookmark,
  SearchedWord,
} from 'utils/api/learningApi';
import BookmarkFull from 'assets/img/bookmarkFull.svg';
import BookmarkEmpty from 'assets/img/bookmarkEmpty.svg';
import PagiNation from 'components/common/PageNation';

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

  transform;
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
  font-size: 16px;
  /* font-weight: bold; */

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
  padding: 0px 20px 8px;
  display: FLEX;
  align-items: CENTER;
  flex-direction: column;
  justify-content: center;
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
  width: 100%;
  height: 75%;
  padding: 16px;

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

  p {
    margin-bottom: 16px;
  }
`;

const Menu = styled.div<MenuProps>`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: first baseline;
  position: relative;
  /* border-bottom: 1px solid ${props => props.theme.blackColorLight2}; */

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

const BookmarkImg = styled.img`
  width: 20px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 10px;
`;

const NoResult = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: #e2e2e2;
`;

const DictionaryModal = ({ setOpenModal }: Props) => {
  const [keyword, setKeyword] = useState<string>('');
  const [wordDesc, setWordDesc] = useState<SearchedWord | null>(null);
  // 페이지네이션에 필요한 애들
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const onSetKeyword = (el: any) => {
    setKeyword(el.target.value);
  };

  const fetchData = async () => {
    const data = await getSearchWord(keyword, page, size);
    setWordDesc(data);
  };

  const onSearchWord = () => {
    if (keyword == '') {
      alert('검색어를 입력해주세요');
      return;
    }

    setMenu(1);
    setPage(1);
    fetchData();
  };

  // 메뉴 버튼
  const [menu, setMenu] = useState<number>(1);

  // 북마크
  const [bookmark, setBookmark] = useState<boolean | undefined>(false);

  const onBookmark = () => {
    const data = {
      wordNo: wordDesc?.wordInfo.wordNo,
    };

    setBookmark(!bookmark);

    if (bookmark) {
      // bookmark 해제 (true -> false)
      const delWordBookmark = async () => {
        await deleteWordBookmark(data);
      };
      delWordBookmark();
    } else {
      // bookmark 등록 (false -> true)
      const insertWordBookmark = async () => {
        await postWordBookmark(data);
      };
      insertWordBookmark();
    }
  };

  useEffect(() => {
    setBookmark(wordDesc?.wordInfo.bookMarked);
    onRegexMean();
    if (wordDesc?.wordInfo.sentenceCount != undefined) {
      setTotalElements(wordDesc?.wordInfo.sentenceCount);
    }
  }, [wordDesc]);

  useEffect(() => {
    fetchData();
  }, [page]);

  // 페이지 변환시 호출할 메소드 => page값 셋팅
  const handlePageChange = async (page: any) => {
    await setPage(old => (old = page));
  };

  // 의미 개행 정리
  const [wordMean, setWordMean] = useState<string[]>();
  const onRegexMean = () => {
    const meanArr = wordDesc?.wordInfo.mean.split('\n');
    setWordMean(meanArr);
  };

  return (
    <Wrapper>
      <SearchBox>
        <SearchBar
          placeholder="영어 단어를 입력하세요."
          onChange={el => onSetKeyword(el)}
          onKeyUp={onSearchWord}
        />
        <SearchImg src={Search} onClick={onSearchWord} />
      </SearchBox>

      <ContentBox>
        <SearchResult>
          {wordDesc !== null ? (
            <>
              <Menu menu={menu}>
                <div onClick={() => setMenu(1)}>의미</div>
                <div onClick={() => setMenu(2)}>예문</div>

                {menu != 2 ? (
                  !bookmark ? (
                    <BookmarkImg src={BookmarkEmpty} onClick={onBookmark} />
                  ) : (
                    <BookmarkImg src={BookmarkFull} onClick={onBookmark} />
                  )
                ) : null}
              </Menu>
              {menu == 2 ? (
                <>
                  <SentenceBox>
                    {wordDesc?.sentenceContentList?.map((el, index) => {
                      return <p key={index}> - {el}</p>;
                    })}
                  </SentenceBox>
                  <PagiNation
                    page={page}
                    size={size}
                    totalElements={totalElements - 1}
                    handlePageChange={handlePageChange}
                  />
                </>
              ) : (
                <MeanBox>
                  <p>{wordDesc?.wordInfo.content}</p>
                  <p>
                    {wordMean?.map((el, index) => {
                      return (
                        <>
                          {el} <br />
                        </>
                      );
                    })}
                  </p>
                </MeanBox>
              )}
            </>
          ) : (
            <NoResult> 찾으시는 결과가 없습니다.</NoResult>
          )}
        </SearchResult>
      </ContentBox>
    </Wrapper>
  );
};

export default DictionaryModal;
