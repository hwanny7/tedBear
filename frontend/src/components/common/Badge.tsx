import styled from 'styled-components';
import VideoLevel from 'assets/img/videoLevel.svg';
import { useEffect, useState } from 'react';

interface Props {
  score: number;
}

const Wrapper = styled.div`
  position: relative;
  width: 32px;
  height: 100%;
  display: flex;
  align-items: center;

  span {
    position: absolute;
    color: Black;
    font-weight: bold;
    /* border: 1px solid r  ed; */
    z-index: 80;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ViedoLevelImg = styled.img<Props>`
  position: absolute;
  cursor: pointer;
  width: 100%;
  /* margin-right: 16px; */
  filter: ${props => {
    console.log('props: ', props.score);
    if (props.score == 0) {
      return `${props.theme.badgeRed}`;
    } else if (props.score == 1) {
      return `${props.theme.badgeOrange}`;
    } else if (props.score == 2) {
      return `${props.theme.badgeYellow}`;
    } else if (props.score == 3) {
      return `${props.theme.badgeGreen}`;
    } else if (props.score == 4) {
      return `${props.theme.badgeBlue}`;
    } else if (props.score == 5) {
      return `${props.theme.badgeIndigo}`;
    } else if (props.score == 6) {
      return `${props.theme.badgePurple}`;
    } else if (props.score == 7) {
      return `${props.theme.badgeBronze}`;
    } else if (props.score == 8) {
      return `${props.theme.badgeSilver}`;
    } else if (props.score == 9) {
      return `${props.theme.badgGold}`;
    } else {
      return `${props.theme.badgeUnlank}`;
    }
  }};
`;

const Badge = (props: Props) => {
  const [badgeTxt, setBadgeTxt] = useState<string>('');

  useEffect(() => {
    console.log('점수2  : ', props.score);
    if (props.score == 0) {
      setBadgeTxt('A');
    } else if (props.score == 1) {
      setBadgeTxt('B');
    } else if (props.score == 2) {
      setBadgeTxt('C');
    } else if (props.score == 3) {
      setBadgeTxt('D');
    } else if (props.score == 4) {
      setBadgeTxt('E');
    } else if (props.score == 5) {
      setBadgeTxt('F');
    } else if (props.score == 6) {
      setBadgeTxt('G');
    } else if (props.score == 7) {
      setBadgeTxt('H');
    } else if (props.score == 8) {
      setBadgeTxt('I');
    } else if (props.score == 9) {
      setBadgeTxt('J');
    } else if (props.score == 10) {
      setBadgeTxt('');
    }
  }, [props.score]);

  return (
    <Wrapper>
      <ViedoLevelImg src={VideoLevel} score={props.score} />
      <span>{badgeTxt}</span>
    </Wrapper>
  );
};

export default Badge;
