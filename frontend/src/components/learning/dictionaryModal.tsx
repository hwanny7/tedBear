import styled from 'styled-components';
import ModalBg from 'assets/img/ModalBg.svg';
import { ReactComponent as KakaoImg } from 'assets/img/KakaoImg.svg';
import { ReactComponent as NaverIcon } from 'assets/img/NaverIcon.svg';
import { ReactComponent as GoogleIcon } from 'assets/img/GoogleIcon.svg';
import { useNavigate } from 'react-router-dom';
import LoginBear from 'assets/img/LoginBear.svg';
import cloud from 'assets/img/cloud.svg';
import { device } from 'utils/mediaQuery';
import axios from 'axios';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.mainColor};
  width: 400px;
  height: 400px;
  z-index: 6;
  position: absolute;
  bottom: 56px;
  right: 56px;
  border-radius: 24px;
  box-shadow: 6px 6px 8px #00000042;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  background-color: ${props => props.theme.whiteColor};
  width: 90%;
  height: 60%;
  border-radius: 50px;
  box-shadow: 6px 6px 8px #00000042;
`;

const SearchResult = styled.div`
  background-color: ${props => props.theme.whiteColor};
  width: 90%;
  height: 90%;
  border-radius: 24px;
  box-shadow: 6px 6px 8px #00000042;
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
`;

const DictionaryModal = ({ setOpenModal }: Props) => {
  return (
    <Wrapper>
      <SearchBox>
        <SearchBar></SearchBar>
      </SearchBox>
      <ContentBox>
        <SearchResult></SearchResult>
      </ContentBox>
    </Wrapper>
  );
};

export default DictionaryModal;
