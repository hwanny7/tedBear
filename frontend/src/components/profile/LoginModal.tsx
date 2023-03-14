import styled from 'styled-components';
import ModalBg from 'assets/img/ModalBg.svg';
import { ReactComponent as KakaoImg } from 'assets/img/KakaoImg.svg';
import { ReactComponent as NaverIcon } from 'assets/img/NaverIcon.svg';
import { ReactComponent as GoogleIcon } from 'assets/img/GoogleIcon.svg';

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
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${ModalBg});
  width: 350px;
  height: 500px;
  z-index: 1;
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
  return (
    <div>
      <DarkBackground onClick={() => setOpenModal(false)} />
      <Modal>
        <div style={{ marginBottom: '20px' }}>
          <KakaoButton BgColor={'#FEE500'}>
            <StyledKakaoImg></StyledKakaoImg>
            카카오로 시작하기
          </KakaoButton>
          <KakaoButton BgColor={'#03C75A'} font={'white'}>
            <StyledNaverIcon></StyledNaverIcon>
            네이버로 시작하기
          </KakaoButton>
          <KakaoButton BgColor={'white'}>
            <StyledGoogleIcon></StyledGoogleIcon>
            Google로 시작하기
          </KakaoButton>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
