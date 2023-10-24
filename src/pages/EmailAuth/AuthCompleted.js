import React from 'react';
import styled from "styled-components";
import mainLogo from '../../assets/images/mainLogo.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainLogo = styled.img`
  @media ${({theme}) => theme.mobileSize.mobile} {
    width: 200px;
    height: 40px;
    margin: 128px 0 76px;
  }
`
const VertificationMessage = styled.p`
  @media ${({theme}) => theme.mobileSize.mobile} {
    font-size: ${({theme}) => theme.fontSize.lg};
    font-weight: ${({theme}) => theme.fontWeight.bold};
    margin-bottom: 19px;
  }
`

const Wrapper = styled.div`
  @media ${({theme}) => theme.mobileSize.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 272px;
    height: 36px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 20px;
    margin-bottom: 100px;
  }
`

const ContinueSingupMessage = styled.p`
   @media ${({theme}) => theme.mobileSize.mobile} {    
    font-size: ${({theme}) => theme.fontSize.sm};
  } 
`

const ContinueBtn = styled.button`
  @media screen and (max-width: 360px) {
    width: 200px;
    height: 40px;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    background-color: ${({ theme }) => theme.colors.lighOrange};
  }
`;

const AuthCompleted = () => {
  return (
    <Container>
      <MainLogo src={mainLogo} alt="healtiee main logo" />
      <VertificationMessage>
        인증이 완료 되었습니다!
      </VertificationMessage>
      <Wrapper>
        <ContinueSingupMessage>
          계속해서 회원가입을 진행하여 주세요.
        </ContinueSingupMessage>
      </Wrapper>
      <ContinueBtn>계속 진행하기</ContinueBtn>
    </Container>
  );
};

export default AuthCompleted;

