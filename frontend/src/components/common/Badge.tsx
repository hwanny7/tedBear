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
    z-index: 1;
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
    if (props.score == 0) {
      setBadgeTxt('1');
    } else if (props.score == 1) {
      setBadgeTxt('2');
    } else if (props.score == 2) {
      setBadgeTxt('3');
    } else if (props.score == 3) {
      setBadgeTxt('4');
    } else if (props.score == 4) {
      setBadgeTxt('5');
    } else if (props.score == 5) {
      setBadgeTxt('6');
    } else if (props.score == 6) {
      setBadgeTxt('7');
    } else if (props.score == 7) {
      setBadgeTxt('8');
    } else if (props.score == 8) {
      setBadgeTxt('9');
    } else if (props.score == 9) {
      setBadgeTxt('10');
    } else if (props.score == 10) {
      setBadgeTxt('X');
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
