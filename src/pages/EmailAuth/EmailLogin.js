import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowBack_Icon } from '../../assets/icons/ArrowBack_icon.svg';
import { ReactComponent as Done_Icon } from '../../assets/icons/Done_icon.svg';
import { ReactComponent as Error_Icon } from '../../assets/icons/Error_icon.svg'

const BackButton = styled.button`
 @media screen and (max-width: 360px) {
  position: absolute;
  top: 3px;
  left: 17px;
  background-color: ${(props) => (props.clicked ? 'white' : 'transparent')};

  &:active {
    background-color: white;
  }
  }
`;

const ArrowBackIcon = styled(ArrowBack_Icon)`
  @media screen and (max-width: 360px) {
    width: 33px;
    height: 33px;
  }
`;

const Wrapper = styled.div`
  @media screen and (max-width: 360px) {
    margin: 64px 0 0 30px;
  }
`;

const Title = styled.div`
  @media screen and (max-width: 360px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 36px;
  }
`;

const EmailForm = styled.div`
  @media screen and (max-width: 360px) {
    display: block;
  }
`;

const Label = styled.p`
  @media screen and (max-width: 360px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: 8px;
  }
`;

const InputForm = styled.div`
  @media screen and (max-width: 360px) {
    position: relative;
    width: 300px;
    height: 40px;
    margin-bottom: 4px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-radius: 20px;
    background-color: ${props => (props.$isError ? '#FFE0E0' : '#EFEFEF')};
  }
`;

const Input = styled.input`
  @media screen and (max-width: 360px) {
    width: 300px;
    height: 40px;
    padding: 9px 46px 9px 20px;
    background: transparent;
  }
`;

const DoneIcon = styled(Done_Icon)`
  @media screen and (max-width: 360px) {
    position: absolute;
    right: 0;
    margin: 10px 14px 0 0;
    width: 24px;
    height: 18px;
  }
`;

const ErrorIcon = styled(Error_Icon)`
  @media screen and (max-width: 360px) {
    position: absolute;
    right: 0;
    margin: 0 9px 0 0;
    width: 35px;
    height: 40px;
  }
`;

const EmailMessage = styled.span`
  @media screen and (max-width: 360px) {
    display: block;
    text-align: right;
    width: 300px;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: #FF0000;
  }
`;

const Button = styled.button`
  @media screen and (max-width: 360px) {
    position: fixed;
    top: 304px;
    width: 200px;
    height: 40px;
    margin-left: 50px;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    background-color: ${props => (props.$isValid ? '#EFEFEF' : '#FFC493')};
    color: ${props => (props.$isValid ? '#717171' : '#000000')};
  }
`;

function EmailLogin() {
  // 상태 관리 초기값
  const [email, setEmail] = useState('');
  // 오류 메세지 상태 저장
  const [emailMessage, setEmailMessage] = useState('');
  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [showDoneIcon, setShowDoneIcon] = useState(false);
  const [showErrorIcon, setShowErrorIcon] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmail) {
      const timer = setTimeout(() => {
        setShowDoneIcon(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowDoneIcon(false);
    }
  }, [isEmail]);

  useEffect(() => {
    if (!isEmail && email !== '') {
      const timer = setTimeout(() => {
        setShowErrorIcon(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (email == '') {
      setEmailMessage('');
      setShowErrorIcon(false);
    } else {
      setShowErrorIcon(false);
    }
  }, [isEmail, email]);

  const onChangeEmail = (e) => {
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegEx.test(emailCurrent)) {
      setEmailMessage("잘못된 형식의 이메일입니다.");
      setIsEmail(false);
    } else {
      setIsEmail(true);
      setEmailMessage(null);
    }
  }

  return (
    <>
      <BackButton
        type='button'
        $clicked={btnClicked}
        onClick={() => {
            navigate(-1);
        }}>
        <ArrowBackIcon />
      </BackButton>
      <Wrapper>
        <Title>이메일 주소를 입력해 주세요.</Title>
        <EmailForm>
          <Label>이메일 주소</Label>
          <InputForm
            $isError={!isEmail && email !== ''}>
            <Input
              type="email"
              name="email"
              onChange={onChangeEmail}
              placeholder="healthiee@abc.com"
            />
            {showDoneIcon && <DoneIcon />}
            {showErrorIcon && <ErrorIcon />}
          </InputForm>
          <EmailMessage>{emailMessage}</EmailMessage>
          <Button
            type="button"
            $isValid={!isEmail}
            onClick={(e) => {
              if (isEmail) {
                e.stopPropagation();
              } else {
                setEmailMessage("올바른 형식의 이메일을 입력해 주세요.");
              }
            }
            }
          >다음</Button>
        </EmailForm>
      </Wrapper>
    </>
  );
};

export default EmailLogin;
