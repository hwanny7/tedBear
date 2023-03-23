import { Outlet } from 'react-router-dom';
import NavBar from 'components/common/NavBar';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

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
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9998;
`;

const LayoutPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 네브바 open state
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      {modalOpen && <DarkBackground onClick={() => setModalOpen(false)} />}
      {pathname !== '/test' && <NavBar open={open} setOpen={setOpen} />}
      <OutletWrapper open={open} center={pathname}>
        <Outlet context={{ modalOpen, setModalOpen }} />
      </OutletWrapper>
    </Wrapper>
  );
};

export default LayoutPage;
