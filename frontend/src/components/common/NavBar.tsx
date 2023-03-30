import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSmall } from 'assets/img/logoSmall.svg';
import { ReactComponent as Home } from 'assets/img/home.svg';
import { ReactComponent as Arrow } from 'assets/img/arrow.svg';
import { ReactComponent as Game } from 'assets/img/game.svg';
import { ReactComponent as CrossIcon } from 'assets/img/crossicon.svg';
import { ReactComponent as Mypage } from 'assets/img/mypage.svg';
import { ReactComponent as Signout } from 'assets/img/signout.svg';
import { ReactComponent as Bookmark } from 'assets/img/bookmark.svg';
import { SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/user';
// toggle svg
import Sun from 'assets/img/sun.svg';
import Moon from 'assets/img/moon.svg';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

interface OpenStyledProps {
  open: boolean;
}

interface ToggleStyledProps {
  toggle: boolean;
}

// 라이트모드, 다크모드 설정 토글
const ToggleBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  justify-content: end;
  padding: 0 22px;
  margin: 16px 0 0;
`;

const ToggleBtn = styled.div`
  background-image: -webkit-linear-gradient(
    #b3b3b3 0%,
    #ececec 80%,
    #ececec 100%
  );
  border-radius: 50px;
  position: relative;
  width: 56px;
  height: 16px;
  display: flex;
  align-items: center;
`;

const Circle = styled.div<ToggleStyledProps>`
  background: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'linear-gradient(270deg, #4cb0b9 0%, #47bcc7 30%, #65e3ee 80%)'
      : 'linear-gradient(90deg, #000000 0%, #3f0e63 90%, #331056 100%)'};
  width: 32px;
  height: 32px;
  z-index: 999;
  /* position: absolute; */
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 4px #00000053;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
  /* ${ToggleStyledProps =>
    ToggleStyledProps.toggle &&
    `
      transform: translateX(24px);
    `} */
`;

const SunImg = styled.img`
  width: 70%;
`;

const MoonImg = styled(SunImg)`
  width: 100%;
`;

const Nav = styled.div<OpenStyledProps>`
  width: ${OpenStyledProps => (!OpenStyledProps.open ? '78px' : '200px')};
  height: 100vh;
  background-color: ${props => props.theme.mainColor};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  transition: all 0.5s ease;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  cursor: pointer;
  padding: 0 22px;
  margin: 24px 0 0;

  span {
    font-weight: 500;
    font-size: 20px;
  }
`;

const OpenBtn = styled.div`
  background-color: ${props => props.theme.mainLightColor};
  border-radius: 50px;
  width: 24px;
  height: 24px;
  position: absolute;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16), 0 3px 3px rgba(0, 0, 0, 0.23);
`;

const IconDiv = styled.div<OpenStyledProps>`
  text-align: center;
  display: flex;
  align-items: center;
`;

const IconName = styled.div<OpenStyledProps>`
  padding-left: 4px;
  text-align: left;
  color: ${props => props.theme.whiteColor};
  font-weight: 500;
  font-size: 14px;
  margin-left: 16px;
  visibility: ${OpenStyledProps =>
    !OpenStyledProps.open ? 'hidden' : 'visible'};
  transition: all 0.3s ease;
`;

const NavList = styled.ul`
  margin-top: 72px;
  margin: 72px 14px 0;
  position: relative;
`;

const ListBox = styled.li`
  margin-top: 24px;
  list-style: none;
  padding: 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.mainLightColor};
  }
`;

const ListBoxBottom = styled(ListBox)<OpenStyledProps>`
  background-color: ${props => props.theme.mainDarkColor};
  position: fixed;
  width: ${OpenStyledProps => (!OpenStyledProps.open ? '78px' : '200px')};
  left: 0px;
  bottom: 0px;
  border-radius: 0;
  transition: all 0.5s ease;
  padding: 8px 22px;
`;

// ICON STYLE
const StyledArrowRight = styled(Arrow)``;

const StyledArrowLeft = styled(Arrow)`
  transform: scaleX(-1);
`;

const StyledLogoSmall = styled(LogoSmall)`
  width: 32px;
  fill: ${props => props.theme.whiteColor};
`;

const StyledHome = styled(Home)`
  width: 32px;
`;

const StyledGame = styled(Game)`
  width: 32px;
`;

const StyledCrossIcon = styled(CrossIcon)`
  width: 32px;
`;

const StyledBookmark = styled(Bookmark)`
  width: 32px;
`;

const StyledMypage = styled(Mypage)`
  width: 32px;
`;

const StyledSignout = styled(Signout)`
  width: 24px;
`;

const NavBar2 = (props: Props) => {
  // 다크모드, 라이트모드 설정
  const clickedToggle = () => {
    props.setToggle(!props.toggle);
  };

  // navbar 펼치기
  const openNavbar = () => {
    props.setOpen(!props.open);
    console.log(isLogin);
  };

  // question 정리
  // 1. 아래에서 LogoSmall을 div로 안감싸면 메뉴를 열 때 로고 버튼도 다시 랜더링 된다..
  // 2. Link to도 div 속성이 있는 것 같다. 아래 로고 클릭할 때 로고, 이름 따로따로 Link단 거 수정해야함.

  // 비로그인 시 마이페이지, 북마크 접근금지
  const { isLogin } = useSelector((state: any) => state.auth);

  // 로그아웃
  const dispatch = useDispatch();

  const onSignOut = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      dispatch(logout());
      window.location.href = '/home';
    }
  };

  const onSignIn = () => {
    window.location.href = 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };

  return (
    <Nav open={props.open}>
      <ToggleBox>
        {/* <ToggleBtn> */}
        <Circle onClick={clickedToggle} toggle={props.toggle}>
          {props.toggle ? <MoonImg src={Moon} /> : <SunImg src={Sun} />}
        </Circle>
        {/* </ToggleBtn> */}
      </ToggleBox>
      <LogoBox>
        <Link to="/">
          <IconDiv open={props.open}>
            <StyledLogoSmall />
          </IconDiv>
        </Link>
        <Link to="/">
          <IconName open={props.open}>
            <span>TEDBEAR</span>
          </IconName>
        </Link>
        <OpenBtn onClick={openNavbar}>
          {props.open ? <StyledArrowLeft /> : <StyledArrowRight />}
        </OpenBtn>
      </LogoBox>

      <NavList>
        <Link to="/home">
          <ListBox>
            <IconDiv open={props.open}>
              <StyledHome />
            </IconDiv>
            <IconName open={props.open}>
              <span>HOME</span>
            </IconName>
          </ListBox>
        </Link>
        <Link to="/game">
          <ListBox>
            <IconDiv open={props.open}>
              <StyledGame />
            </IconDiv>
            <IconName open={props.open}>
              <span>PUZZLE</span>
            </IconName>
          </ListBox>
        </Link>
        <Link to="/cross-word/cover">
          <ListBox>
            <IconDiv open={props.open}>
              <StyledCrossIcon />
            </IconDiv>
            <IconName open={props.open}>
              <span>CROSSWORD</span>
            </IconName>
          </ListBox>
        </Link>

        {isLogin ? (
          <>
            <Link to="/bookmark">
              <ListBox>
                <IconDiv open={props.open}>
                  <StyledBookmark />
                </IconDiv>
                <IconName open={props.open}>
                  <span>BOOKMARK</span>
                </IconName>
              </ListBox>
            </Link>
            <Link to="/profile">
              <ListBox>
                <IconDiv open={props.open}>
                  <StyledMypage />
                </IconDiv>
                <IconName open={props.open}>
                  <span>MYPAGE</span>
                </IconName>
              </ListBox>
            </Link>
            <ListBoxBottom open={props.open} onClick={onSignOut}>
              <IconDiv open={props.open}>
                <StyledSignout />
              </IconDiv>
              <IconName open={props.open}>
                <span>SIGNOUT</span>
              </IconName>
            </ListBoxBottom>
          </>
        ) : (
          <ListBoxBottom open={props.open} onClick={onSignIn}>
            <IconDiv open={props.open}>
              <StyledSignout />
            </IconDiv>
            <IconName open={props.open}>
              <span>SIGNIN</span>
            </IconName>
          </ListBoxBottom>
        )}
      </NavList>
    </Nav>
  );
};

export default NavBar2;
