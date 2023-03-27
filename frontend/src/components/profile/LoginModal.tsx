import styled from 'styled-components';
import ModalBg from 'assets/img/ModalBg.svg';
import { ReactComponent as KakaoImg } from 'assets/img/KakaoImg.svg';
import { ReactComponent as NaverIcon } from 'assets/img/NaverIcon.svg';
import { ReactComponent as GoogleIcon } from 'assets/img/GoogleIcon.svg';
import { useNavigate } from 'react-router-dom';
import LoginBear from 'assets/img/LoginBear.svg';
import cloud from 'assets/img/cloud.svg';
import { device } from 'utils/mediaQuery';

interface Color {
  BgColor: string;
  font?: string;
}

const DarkBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 9998;
`;

// const Bear = styled.img`
//   position: absolute;
//   left: 30%;
//   width: 40%;
//   height: 40%;
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 9999;
//   border-radius: 16px;
//   overflow: hidden;
// @media ${device.mobile} {
//   height: 500px;
//   width: 300px;
// }

// @media ${device.tablet} {
//   height: 50%;
//   width: 30%;
// }

// @media ${device.laptop} {
//   height: 50%;
//   width: 30%;
// }

// @media ${device.desktop} {
//   height: 75%;
//   width: 30%;
// }

//   /* box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04); */
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   position: relative;
// `;

// const Cloud = styled.img`
//   position: absolute;
//   bottom: -20%;
//   width: 100%;
//   height: 70%;
//   @media ${device.mobile} {
//     height: 400px;
//     width: 400px;
//   }
// `;
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${ModalBg});
  width: 350px;
  height: 500px;
  z-index: 9999;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

const KakaoButton = styled.div<Color>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${props => props.BgColor};
  width: 270px;
  height: 45px;
  border-radius: 10px;
  text-align: center;
  color: ${props => props.font};
  font-size: 13px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;
`;

const StyledKakaoImg = styled(KakaoImg)`
  position: absolute;
  left: 0;
  margin: 25px;
  width: 20px;
  cursor: pointer;
`;

const StyledNaverIcon = styled(NaverIcon)`
  position: absolute;
  left: 0;
  margin: 25px;
  width: 20px;
  cursor: pointer;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  position: absolute;
  left: 0;
  margin: 25px;
  width: 20px;
  cursor: pointer;
`;

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setOpenModal }: Props) => {
  const navigate = useNavigate();
  const KakaoLogin = () => {
    window.location.href =
      'https:kauth.kakao.com/oauth/authorize?client_id=8479739cb2eb523d03215db2f6b5fe23&redirect_uri=http://j8b103.p.ssafy.io:8080/oauth/kakao&response_type=code';
    // 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };

  return (
    // <Modal style={{ background: 'black' }}>
    //   <Wrapper>
    //     <Bear src={LoginBear} alt="" />
    //     <Cloud src={cloud} alt="" />
    //   </Wrapper>
    // </Modal>
    <div>
      <DarkBackground onClick={() => setOpenModal(false)} />
      <Modal>
        <div style={{ marginBottom: '20px' }}>
          <KakaoButton BgColor={'#FEE500'} onClick={KakaoLogin}>
            <StyledKakaoImg></StyledKakaoImg>
            카카오로 시작하기
          </KakaoButton>
          <KakaoButton BgColor={'#03C75A'} font={'white'}>
            <StyledNaverIcon></StyledNaverIcon>
            네이버로 시작하기
          </KakaoButton>
          {/* <KakaoButton BgColor={'white'}>
            <StyledGoogleIcon></StyledGoogleIcon>
            Google로 시작하기
          </KakaoButton> */}
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
