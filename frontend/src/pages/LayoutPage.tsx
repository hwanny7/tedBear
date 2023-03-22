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
  ${props =>
    props.center === '/home' &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const LayoutPage = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // 네브바 open state
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      {pathname !== '/test' && <NavBar open={open} setOpen={setOpen} />}
      <OutletWrapper open={open} center={pathname}>
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
};

export default LayoutPage;
