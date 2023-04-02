import styled from 'styled-components';
import Logo from 'assets/img/logoSmall.svg';
import Hamburger from 'assets/img/hamburger.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/user';

interface OpenProps {
  open: boolean;
  isLogin: boolean;
}

const Nav = styled.div`
width: 100%
  // 반응형
  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    display: none;
  }
`;

const NavBar = styled.div`
  width: 100%;
  height: 48px;
  background-color: ${props => props.theme.mainColor};
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 32px;

  span {
    cursor: pointer;
    color: white;
    margin-left: 16px;
  }
`;

const LogoImg = styled.img`
  height: 100%;
  cursor: pointer;
`;

const HamburgerImg = styled.img`
  width: 24px;
  position: absolute;
  right: 32px;
  cursor: pointer;
`;

const NavList = styled.ul<OpenProps>`
  position: relative;
  background-color: ${props => props.theme.mainColor};
  width: 100%;
  transition: 0.5s;
  height: 0;
  overflow: hidden;

  ${props => {
    if (props.open && props.isLogin) {
      return `height: 200px;`;
    } else if (props.open && !props.isLogin) {
      return `height: 120px;`;
    }
  }}
`;

const NavEl = styled.li`
  text-align: center;
  color: ${props => props.theme.whiteColor};
  padding: 8px 32px;
  cursor: pointer;
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.mainLightColor};
  }
`;

const NavBarMobile = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(!open);
  };

  // 비로그인 시 마이페이지, 북마크 접근금지
  const { isLogin } = useSelector((state: any) => state.auth);

  // 로그아웃
  const dispatch = useDispatch();

  const onSignOut = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      dispatch(logout());
      window.location.href = '/';
    }
  };

  const onSignIn = () => {
    window.location.href = 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };
  return (
    <Nav>
      <NavBar>
        <LogoImg src={Logo} />
        <span>TEDBEAR</span>
        <HamburgerImg src={Hamburger} onClick={onOpen}></HamburgerImg>
      </NavBar>
      <NavList open={open} isLogin={isLogin}>
        <Link to="/home">
          <NavEl>HOME</NavEl>
        </Link>
        <Link to="/game/select">
          <NavEl>GAME</NavEl>
        </Link>

        {isLogin ? (
          <>
            <Link to="/bookmark">
              <NavEl>BOOKMARK</NavEl>
            </Link>
            <Link to="/profile">
              <NavEl>MYPAGE</NavEl>
            </Link>
            <NavEl onClick={onSignOut}>SIGNOUT</NavEl>
          </>
        ) : (
          <NavEl onClick={onSignIn}>SIGNIN</NavEl>
        )}
      </NavList>
    </Nav>
  );
};

export default NavBarMobile;
