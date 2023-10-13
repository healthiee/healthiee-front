import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import StartPage from '../pages/StartPage';
import splashScreen from '../assets/images/splashScreen.png'

const SplashScreenImg = styled.img`
  @media ${({theme}) => theme.mobileSize.mobile} {
    width: 360px;
    height: 640px;
  }
`
const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {showSplash
        ? <StartPage />
        : <SplashScreenImg src={splashScreen} alt="healthiee logo" />}
    </>
  );
};

export default SplashScreen;