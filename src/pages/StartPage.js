import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import mainLogo from '../assets/images/mainLogo.png'

const MainLogo = styled.img`
  @media ${({theme}) => theme.mobileSize.mobile} {
    width: 300px;
    height: 60px;
    margin: 130px 30px 270px;
  }
`
const Button = styled.button`
 @media ${({theme}) => theme.mobileSize.mobile} {
    width: 200px;
    height: 60px;
    margin: 0 80px 120px;
    font-size: ${({theme}) => theme.fontSize.xlg};
    font-weight: ${({theme}) => theme.fontWeight.bold};
    border-radius: 30px;
  }
`
const StartPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainLogo src={mainLogo} alt="healthiee main logo" />
      <Button onClick={() => navigate('/emaillogin')}>시작하기</Button>
    </>
  );
};

export default StartPage;