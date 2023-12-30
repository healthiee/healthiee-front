import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowBack_Icon } from '../../assets/icons/ArrowBack_icon.svg';
import { ReactComponent as Done_Icon } from '../../assets/icons/Done_icon.svg';
import { ReactComponent as Error_Icon } from '../../assets/icons/Error_icon.svg'
import Agreement from './Agreement';
import styled from 'styled-components';
import api from '../../utils/instance';

const BackButton = styled.button`
  margin: 3px 0 0 25px;
  background-color: white;

  &:active {
    background-color: white;
  }
`;

const ArrowBackIcon = styled(ArrowBack_Icon)`
  width: 33px;
  height: 33px;
`;

const FormWrapper = styled.div`
  margin: 15px 0 0 30px;
`;

const FormTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 36px;
`;

const EmailInputLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 8px;
`;

const EmailInputWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => (props.$isError ? '#FFE0E0' : '#EFEFEF')};
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 9px 46px 9px 20px;
  background: transparent;
  border-radius: 20px;
`;

const DoneIcon = styled(Done_Icon)`
  position: absolute;
  right: 0;
  margin: 10px 14px 0 0;
  width: 24px;
  height: 18px;
`;

const ErrorIcon = styled(Error_Icon)`
  position: absolute;
  right: 0;
  margin: 0 9px 0 0;
  width: 35px;
  height: 40px;
`;

const EmailMessage = styled.span`
  display: block;
  width: 300px;
  text-align: ${props => (props.$success ? 'none' : 'right')};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${props => (props.$success ? '#000000' : '#FF0000')};
`;

const AgreeMentWrapper = styled.div`
  position: fixed;
  top: 234px;
  left: 34px;
  display: flex;
  flex-direction: column;
  width: 300px;
  z-index: 2;
`;

const AgreeMentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const AgreeMentWords = styled.p`
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #707070;
  border-radius: 8px;
  appearance: none;
  background-color: #FFFFFF;

  &:checked {
    background-color: ${({ theme }) => theme.colors.orange}; 
  }
`;

const AgreementShow = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: underline;
`;

const SubmitButton = styled.button`
  position: absolute;
  top: 304px;
  width: 200px;
  height: 40px;
  margin-left: 50px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${props => (props.$isValid ? '#EFEFEF' : '#FFC493')};
  color: ${props => (props.$isValid ? '#717171' : '#000000')};

  &:focus {
    background-color: ${props => (props.$isValid ? '#EFEFEF' : '#FFC493')};
  }
`;

function EmailLogin() {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [showDoneIcon, setShowDoneIcon] = useState(false);
  const [showErrorIcon, setShowErrorIcon] = useState(false);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [hideAgreementForm, setHideAgreementForm] = useState(false);
  const [isCheckBoxClicked, setIsCheckBoxClicked] = useState(false);
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
    } else if (email === '') {
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

  const onSubmitEmail = () => {
    if (isEmail && isCheckBoxClicked) {
      const requestPayload = {
        email: email,
      };

      api.post('v1/auth', requestPayload)
        .then(response => {
          if (response.status === 200) {
            setIsSubmitButtonClicked(true);
            setEmailMessage('회원가입 링크가 위의 이메일로 전송되었습니다.');
            setHideAgreementForm(true);
          } else {
            setEmailMessage('이메일 등록에 실패했습니다.');
          }
        })
        .catch(error => {
          setEmailMessage('이메일 전송 중 오류가 발생했습니다.');
        });
    } else if (!isCheckBoxClicked) {
      setEmailMessage('개인정보 수집 및 이용 동의 시 회원가입이 가능합니다.');

    } else if (!isEmail) {
      setEmailMessage('올바른 형식의 이메일을 입력해 주세요.');
    }
  }

  const agreementHandler = () => {
    setShowAgreement(true);
  }

  const handleCheckBoxClick = () => {
    setIsCheckBoxClicked(prev => !prev);
  }

  return (
    <>
      <BackButton
        type='button'
        onClick={() => {
          navigate('/startpage');
        }}>
        <ArrowBackIcon />
      </BackButton>
      <FormWrapper>
        <FormTitle>{isSubmitButtonClicked ? '환영합니다!' : '이메일 주소를 입력해 주세요.'}</FormTitle>
        <EmailInputLabel>이메일 주소</EmailInputLabel>
        <EmailInputWrapper
          $isError={!isEmail && email !== ''}>
          <Input
            type="email"
            name="email"
            onChange={onChangeEmail}
            placeholder="healthiee@abc.com"
            disabled={isSubmitButtonClicked}
          />
          {showDoneIcon && <DoneIcon />}
          {showErrorIcon && <ErrorIcon />}
        </EmailInputWrapper>
        <EmailMessage $success={isSubmitButtonClicked}>{emailMessage}</EmailMessage>
        {!hideAgreementForm && (
          <AgreeMentWrapper>
            <AgreeMentContainer>
              <AgreeMentWords>
                개인정보 수집 및 이용에 동의합니다.
              </AgreeMentWords>
              <Checkbox
                type="checkbox"
                checked={isCheckBoxClicked}
                onChange={handleCheckBoxClick}
              />
            </AgreeMentContainer>
            <AgreementShow onClick={agreementHandler}>약관 보기</AgreementShow>
            {showAgreement && <Agreement setShowAgreement={setShowAgreement} />}
          </AgreeMentWrapper>
        )}
        {!isSubmitButtonClicked && (
          <SubmitButton
            type="button"
            $isValid={!isEmail}
            onClick={onSubmitEmail}
          >다음</SubmitButton>
        )}
      </FormWrapper>
    </>
  );
};

export default EmailLogin;
