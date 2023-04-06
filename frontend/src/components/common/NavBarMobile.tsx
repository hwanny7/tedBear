import styled from 'styled-components';
import Logo from 'assets/img/logoSmall.svg';
import Hamburger from 'assets/img/hamburger.svg';
import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/user';
// toggle svg
import Sun from 'assets/img/sun.svg';
import Moon from 'assets/img/moon.svg';

import Info2 from 'assets/img/info2.svg';
import VideoLevel from 'assets/img/videoLevel.svg';

interface OpenProps {
  open: boolean;
  isLogin: boolean;
}

interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

interface ToggleStyledProps {
  toggle: boolean;
}

const Nav = styled.div`
/* position: fixed;
top: 0px; */
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

  @media (max-width: 400px) {
    span {
      display: none;
    }
  }
  span {
    cursor: pointer;
    color: white;
    margin-left: 16px;
  }
`;

const LogoImg = styled.img`
  height: 100%;
  cursor: pointer;
  margin-left: 16px;
`;

const HamburgerImg = styled.img`
  width: 24px;
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

const LevelInfo = styled.div`
  box-shadow: 6px 6px 8px #00000042;
  border-radius: 16px;
  padding: 24px;
  position: fixed;
  background-color: #ffffffe8;
  width: 160px;
  top: 24px;
  bottom: 64px;
  right: 88px;
  height: 380px;
  display: flex;
  flex-direction: column;

  transition: 0.5s;
  opacity: 0;
  z-index: -1;

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

const InfoImg = styled.img`
  width: 24px;
  position: absolute;
  right: 64px;
  cursor: pointer;

  &:hover + ${LevelInfo} {
    opacity: 1;
    z-index: 5;
  }
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

// 라이트모드, 다크모드 설정 토글
const ToggleBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  /* width: 100%; */
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

const NavBarMobile = (props: Props) => {
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
    window.location.href = 'https://ted-bear.com/api/oauth/kakao';
  };

  // 토글
  // 다크모드, 라이트모드 설정
  const clickedToggle = () => {
    props.setToggle(!props.toggle);
  };

  return (
    <Nav>
      <NavBar>
        <ToggleBox>
          <Circle onClick={clickedToggle} toggle={props.toggle}>
            {props.toggle ? <MoonImg src={Moon} /> : <SunImg src={Sun} />}
          </Circle>
        </ToggleBox>
        <LogoImg src={Logo} />
        <span>TEDBEAR</span>
        <HamburgerImg src={Hamburger} onClick={onOpen}></HamburgerImg>
        <InfoImg src={Info2}></InfoImg>
      </NavBar>
      <LevelInfo>
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
      <NavList open={open} isLogin={isLogin}>
        <Link to="/home">
          <NavEl>홈</NavEl>
        </Link>
        <Link to="/game/select">
          <NavEl>게임</NavEl>
        </Link>

        {isLogin ? (
          <>
            <Link to="/bookmark">
              <NavEl>북마크</NavEl>
            </Link>
            <Link to="/profile">
              <NavEl>프로필</NavEl>
            </Link>
            <NavEl onClick={onSignOut}>로그아웃</NavEl>
          </>
        ) : (
          <NavEl onClick={onSignIn}>로그인</NavEl>
        )}
      </NavList>
    </Nav>
  );
};

export default NavBarMobile;
