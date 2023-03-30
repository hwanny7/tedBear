import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NavBar from 'components/common/NavBar';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface OpenProps {
  open: boolean;
  center: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  position: relative;
`;

const OutletWrapper = styled.div<OpenProps>`
  width: ${OpenProps =>
    !OpenProps.open ? 'calc(100% - 78px)' : 'calc(100% - 200px)'};
  position: relative;
  left: ${OpenProps => (!OpenProps.open ? '78px' : '200px')};
  transition: all 0.5s ease;
  background-color: ${props => props.theme.bgColor};
`;

const DarkBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;

  position: fixed;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  z-index: 9998;
`;

const LayoutPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // 네브바 open state
  const [open, setOpen] = useState<boolean>(false);
  // 비로그인 시 마이페이지, 북마크 접근금지
  const { isLogin } = useSelector((state: any) => state.auth);

  if (!isLogin && (pathname === '/profile' || pathname === '/bookmark')) {
    alert(
      `로그인이 필요한 서비스입니다. islogin: ${isLogin} 결론: ${
        !isLogin && (pathname === '/profile' || pathname === '/bookmark')
      }`,
    );
    // window.location.href = '/home';
  }

  return !isLogin && (pathname === '/profile' || pathname === '/bookmark') ? (
    <Navigate to="/home" />
  ) : (
    <Wrapper>
      {modalOpen && <DarkBackground onClick={() => setModalOpen(false)} />}
      {pathname !== '/test' && <NavBar open={open} setOpen={setOpen} />}
      <OutletWrapper open={open} center={pathname}>
        <Outlet context={{ modalOpen, setModalOpen }} />
      </OutletWrapper>
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
