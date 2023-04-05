import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSmall } from 'assets/img/logoSmall.svg';
import { ReactComponent as Home } from 'assets/img/home.svg';
import { ReactComponent as Arrow } from 'assets/img/arrow.svg';
import { ReactComponent as Game } from 'assets/img/game.svg';
import { ReactComponent as NavGame } from 'assets/img/navGame.svg';
import { ReactComponent as CrossIcon } from 'assets/img/crossicon.svg';
import { ReactComponent as Mypage } from 'assets/img/mypage.svg';
import { ReactComponent as Signout } from 'assets/img/signout.svg';
import { ReactComponent as Signin } from 'assets/img/signin.svg';
import { ReactComponent as Bookmark } from 'assets/img/bookmark.svg';
import { ReactComponent as Info2 } from 'assets/img/info2.svg';
import { SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/user';
// toggle svg
import Sun from 'assets/img/sun.svg';
import Moon from 'assets/img/moon.svg';

import VideoLevel from 'assets/img/videoLevel.svg';

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
  justify-content: first;
  /* padding: 0 22px; */
  /* margin: 16px 0 0; */
`;

const Circle = styled.div<ToggleStyledProps>`
  background: ${ToggleStyledProps =>
    !ToggleStyledProps.toggle
      ? 'linear-gradient(270deg, #4cb0b9 0%, #47bcc7 30%, #65e3ee 80%)'
      : 'linear-gradient(90deg, #000000 0%, #3f0e63 90%, #331056 100%)'};
  width: 24px;
  height: 24px;
  z-index: 10;
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

  display: none;
  @media (min-width: 900px) {
    display: block;
  }
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
  position: relative;
  padding-left: 4px;
  text-align: left;
  color: ${props => props.theme.whiteColor};
  font-weight: 500;
  font-size: 14px;
  margin-left: 16px;
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  white-space: nowrap;

  /* border: 1px solid red; */
  /* display: ${OpenStyledProps =>
    !OpenStyledProps.open ? 'none' : 'flex'}; */
  opacity: ${OpenStyledProps => (!OpenStyledProps.open ? '0' : '1')};
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

const LevelInfo = styled.div<OpenStyledProps>`
  box-shadow: 6px 6px 8px #00000042;
  border-radius: 16px;
  padding: 24px;
  position: fixed;
  background-color: #ffffffe8;
  width: 160px;
  left: ${OpenStyledProps => (!OpenStyledProps.open ? '60px;' : '160px;')};
  bottom: 64px;

  display: flex;
  flex-direction: column;
  opacity: 0;
  z-index: -1;

  transition: 0.5s;

  .content {
    display: flex;
    /* border: 1px solid red; */
    margin-bottom: 8px;

    &:nth-child(1) .badgeImg {
      filter: ${props => props.theme.badgeRed};
    }
    &:nth-child(2) .badgeImg {
      filter: ${props => props.theme.badgeOrange};
    }
    &:nth-child(3) .badgeImg {
      filter: ${props => props.theme.badgeYellow};
    }
    &:nth-child(4) .badgeImg {
      filter: ${props => props.theme.badgeGreen};
    }
    &:nth-child(5) .badgeImg {
      filter: ${props => props.theme.badgeBlue};
    }
    &:nth-child(6) .badgeImg {
      filter: ${props => props.theme.badgeIndigo};
    }
    &:nth-child(7) .badgeImg {
      filter: ${props => props.theme.badgePurple};
    }
    &:nth-child(8) .badgeImg {
      filter: ${props => props.theme.badgeBronze};
    }
    &:nth-child(9) .badgeImg {
      filter: ${props => props.theme.badgeSilver};
    }
    &:nth-child(10) .badgeImg {
      filter: ${props => props.theme.badgGold};
    }
  }

  .badgeImg {
    /* border: 1px solid red; */
    width: 24px;
    margin-right: 16px;
  }

  .badgeName {
    /* border: 1px solid red; */
  }
`;

const ListBoxBottom2 = styled(ListBoxBottom)<OpenStyledProps>`
  background-color: transparent;
  position: fixed;
  width: ${OpenStyledProps => (!OpenStyledProps.open ? '78px' : '200px')};
  left: 0px;
  bottom: 47px;
  border-radius: 0;
  transition: all 0.5s ease;
  padding: 8px 22px;
  &:hover {
    background-color: ${props => props.theme.mainColor};
  }

  &:hover ~ ${LevelInfo} {
    z-index: 5;
    opacity: 1;
  }
`;

const ListBoxBottom3 = styled(ListBoxBottom2)<OpenStyledProps>`
  bottom: 94px;

  &:hover ~ ${LevelInfo} {
    z-index: 0;
    opacity: 0;
  }
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

const StyledNavGame = styled(NavGame)`
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

const StyledSignin = styled(Signin)`
  width: 24px;
`;

const StyledInfo2 = styled(Info2)`
  width: 24px;

  &:hover ~ ${LevelInfo} {
    z-index: 5;
    opacity: 1;
  }
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
      window.location.href = '/';
    }
  };

  const onSignIn = () => {
    window.location.href = 'https://ted-bear.com/api/oauth/kakao';
  };

  return (
    <Nav open={props.open}>
      <Link to="/home">
        <LogoBox>
          <IconDiv open={props.open}>
            <StyledLogoSmall />
          </IconDiv>

          <IconName open={props.open}>
            <span>TEDBEAR</span>
          </IconName>
          <OpenBtn onClick={openNavbar}>
            {props.open ? <StyledArrowLeft /> : <StyledArrowRight />}
          </OpenBtn>
        </LogoBox>
      </Link>

      <NavList>
        <Link to="/home">
          <ListBox>
            <IconDiv open={props.open}>
              <StyledHome />
            </IconDiv>
            <IconName open={props.open}>
              <span>홈</span>
            </IconName>
          </ListBox>
        </Link>
        <Link to="/game/select">
          <ListBox>
            <IconDiv open={props.open}>
              <StyledNavGame />
            </IconDiv>
            <IconName open={props.open}>
              <span>게임</span>
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
                  <span>북마크</span>
                </IconName>
              </ListBox>
            </Link>
            <Link to="/profile">
              <ListBox>
                <IconDiv open={props.open}>
                  <StyledMypage />
                </IconDiv>
                <IconName open={props.open}>
                  <span>프로필</span>
                </IconName>
              </ListBox>
            </Link>
            <ListBoxBottom open={props.open} onClick={onSignOut}>
              <IconDiv open={props.open}>
                <StyledSignout />
              </IconDiv>
              <IconName open={props.open}>
                <span>로그아웃</span>
              </IconName>
            </ListBoxBottom>
          </>
        ) : (
          <ListBoxBottom open={props.open} onClick={onSignIn}>
            <IconDiv open={props.open}>
              <StyledSignin />
            </IconDiv>
            <IconName open={props.open}>
              <span>로그인</span>
            </IconName>
          </ListBoxBottom>
        )}
        <ListBoxBottom3 open={props.open}>
          <IconDiv open={props.open}>
            <ToggleBox>
              <Circle onClick={clickedToggle} toggle={props.toggle}>
                {props.toggle ? <MoonImg src={Moon} /> : <SunImg src={Sun} />}
              </Circle>
            </ToggleBox>
          </IconDiv>
          <IconName open={props.open} onClick={clickedToggle}>
            <span>{!props.toggle ? '라이트' : '다크'}</span>
          </IconName>
        </ListBoxBottom3>
        <ListBoxBottom2 open={props.open}>
          <IconDiv open={props.open}>
            <StyledInfo2 />
          </IconDiv>
          <IconName open={props.open}>
            <span>레벨 정보</span>
          </IconName>
        </ListBoxBottom2>
        <LevelInfo open={props.open}>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 1</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 2</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 3</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 4</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 5</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 6</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 7</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 8</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 9</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">레벨 10</div>
          </div>
          <div className="content">
            <img src={VideoLevel} className="badgeImg" />
            <div className="badgeName">언랭크</div>
          </div>
        </LevelInfo>
      </NavList>
    </Nav>
  );
};

export default NavBar2;
