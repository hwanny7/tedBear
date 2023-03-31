import styled from 'styled-components';
import ModalBg from 'assets/img/ModalBg.svg';
import { ReactComponent as KakaoImg } from 'assets/img/KakaoImg.svg';
import { ReactComponent as NaverIcon } from 'assets/img/NaverIcon.svg';
import { ReactComponent as GoogleIcon } from 'assets/img/GoogleIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

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
  position: fixed;
  z-index: 9998;
`;

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
  cursor: pointer;
  &:hover {
    scale: 1.04;
    transition: 0.4s;
  }
`;

const StyledKakaoImg = styled(KakaoImg)`
  position: absolute;
  left: 0;
  margin: 25px;
  width: 20px;
`;

const StyledNaverIcon = styled(NaverIcon)`
  position: absolute;
  left: 0;
  margin: 25px;
  width: 20px;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  position: absolute;
  left: 0;
  margin: 25px;
  width: 20px;
`;

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setOpenModal }: Props) => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const KakaoLogin = () => {
    window.location.href = 'http://j8b103.p.ssafy.io:8080/oauth/kakao';
  };

  const goTo = () => {
    localStorage.removeItem('accessToken');
    cookie.remove('refreshToken');
    navigate('/home');
  };
  return (
    <div>
      <DarkBackground onClick={() => setOpenModal(false)} />
      <Modal>
        <div style={{ marginBottom: '20px' }}>
          <KakaoButton BgColor={'#FEE500'} onClick={KakaoLogin}>
            <StyledKakaoImg></StyledKakaoImg>
            카카오로 시작하기
          </KakaoButton>
          {/* <KakaoButton BgColor={'#03C75A'} font={'white'}>
            <StyledNaverIcon></StyledNaverIcon>
            네이버로 시작하기
          </KakaoButton> */}
          <KakaoButton
            BgColor={'white'}
            style={{ marginBottom: '30px' }}
            onClick={goTo}
          >
            비회원으로 시작하기
          </KakaoButton>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
