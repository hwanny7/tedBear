import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Shorts } from 'utils/api/recommApi';
import VideoLevel from 'assets/img/videoLevel.svg';
import buttonLeft from 'assets/img/buttonLeft.svg';
import buttonRight from 'assets/img/buttonRight.svg';

interface BadgeProps {
  score?: number;
}

const ViedoLevelImg = styled.img<BadgeProps>`
  height: 15%;
  width: 15%;
  position: absolute;
  top: 4%;
  left: 4%;
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

const Containter = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  .wrapper {
    width: 17%;
    position: relative;
    border-radius: 16px;
    margin-left: 1%;
    margin-right: 1%;
    cursor: pointer;
  }
  .main-img {
    border-radius: 16px;
    width: 100%;
    height: 30vh;
    cursor: pointer;
  }

  .left-button {
    position: absolute;
    left: -1%;
    top: 40%;
    width: 4%;
    cursor: pointer;
    &:hover {
      scale: 1.04;
      transition: 0.4s;
    }
  }
  .right-button {
    position: absolute;
    right: 4%;
    top: 40%;
    width: 4%;
    cursor: pointer;
    &:hover {
      scale: 1.1;
      transition: 0.4s;
    }
  }
`;

interface Props {
  data: Shorts[];
  requestShorts: (arg0: number) => void;
  upStreamPage: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShortsId: React.Dispatch<React.SetStateAction<Shorts | null>>;
  searchWord: string;
}

const ShortsPageNation = ({
  data,
  requestShorts,
  upStreamPage,
  setOpenModal,
  setShortsId,
  searchWord,
}: Props) => {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setPage(0);
  }, [searchWord]);

  const handleNext = (next: number) => {
    setPage(next);
    requestShorts(next);
  };
  // 더이상 영상을 불러오지 못할 때는 버튼이 사라지니까 괜찮음

  return (
    <Containter>
      {data.map((Thumnail, idx) => {
        return (
          <div className="wrapper" key={idx}>
            <img
              className="main-img"
              src={`https://i.ytimg.com/vi/${Thumnail.watchId}/hq1.jpg`}
              alt=""
              onClick={() => {
                setOpenModal(true);
                setShortsId(Thumnail);
              }}
            ></img>
            <ViedoLevelImg src={VideoLevel} score={Thumnail.score} />
          </div>
        );
      })}
      {page - 1 >= 0 && (
        <img
          className="left-button"
          src={buttonLeft}
          onClick={() => handleNext(page - 1)}
        />
      )}
      {upStreamPage && (
        <img
          className="right-button"
          src={buttonRight}
          onClick={() => handleNext(page + 1)}
        />
      )}
    </Containter>
  );
};

export default ShortsPageNation;
