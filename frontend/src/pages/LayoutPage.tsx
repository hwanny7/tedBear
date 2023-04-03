import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NavBar from 'components/common/NavBar';
import NavBarMobile from 'components/common/NavBarMobile';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { device } from 'utils/mediaQuery';

import Dictionary from 'assets/img/dictionary.svg';
import DictionaryModal from 'components/learning/dictionaryModal';

interface OpenProps {
  open: boolean;
  center: string;
}

interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background-color: ${props => props.theme.bgColor};
  width: 100%;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const OutletWrapper = styled.div<OpenProps>`
  position: relative;
  transition: all 0.5s ease;
  background-color: ${props => props.theme.bgColor};
  width: 100%;
  height: 100%;

  @media (min-width: 900px) {
    left: ${OpenProps => (!OpenProps.open ? '78px' : '200px')};
    width: ${OpenProps =>
      !OpenProps.open ? 'calc(100% - 78px)' : 'calc(100% - 200px)'};
  }
`;

const DarkBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;

  position: fixed;
  z-index: 9998;
`;

// 사전
const DictionaryImg = styled.img`
  width: 56px;
  z-index: 5;
  position: absolute;
  bottom: 24px;
  right: 24px;
  cursor: pointer;
`;

const LayoutPage = (props: Props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // 네브바 open state
  const [open, setOpen] = useState<boolean>(false);
  // 비로그인 시 마이페이지, 북마크 접근금지
  const { isLogin } = useSelector((state: any) => state.auth);

  if (!isLogin && (pathname === '/profile' || pathname === '/bookmark')) {
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = '/home';
  }

  // 사전
  const [dicModalOpen, setDicModalOpen] = useState<boolean>(false);

  const onDicModalOpen = () => {
    setDicModalOpen(!dicModalOpen);
  };

  return !isLogin && (pathname === '/profile' || pathname === '/bookmark') ? (
    <Navigate to="/home" />
  ) : (
    <Wrapper>
      {modalOpen && <DarkBackground onClick={() => setModalOpen(false)} />}
      {pathname !== '/test' && (
        <>
          <NavBar
            open={open}
            setOpen={setOpen}
            toggle={props.toggle}
            setToggle={props.setToggle}
          />
          <NavBarMobile />
        </>
      )}
      <OutletWrapper open={open} center={pathname}>
        <Outlet context={{ modalOpen, setModalOpen }} />
      </OutletWrapper>
      {pathname !== '/cross-word' && (
        <DictionaryImg src={Dictionary} onClick={onDicModalOpen} />
      )}

      {dicModalOpen && <DictionaryModal setOpenModal={setDicModalOpen} />}
    </Wrapper>
  );

  // return (
  //   <Wrapper>
  //     {modalOpen && <DarkBackground onClick={() => setModalOpen(false)} />}
  //     {pathname !== '/test' && <NavBar open={open} setOpen={setOpen} />}
  //     <OutletWrapper open={open} center={pathname}>
  //       <Outlet context={{ modalOpen, setModalOpen }} />
  //     </OutletWrapper>
  //   </Wrapper>
  // );
};

export default LayoutPage;
