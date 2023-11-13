import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Notification } from '../assets/images/notification.svg';
import { ReactComponent as defaultProfile } from '../assets/images/defaultProfile2.svg';
import { ReactComponent as ArrowBack_icon } from '../assets/icons/ArrowBack_icon.svg';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  @media screen and (max-width: 360px) {
    background-color: #F7F7F7;
    width: 360px;
    height: 640px;
  }
`;
const Header = styled.div`
  @media screen and (max-width: 360px) {
    height: 48px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
`;
const ArrowBackIcon = styled(ArrowBack_icon)`
  @media screen and (max-width: 360px) {
    margin-left: 19px;
    width: 33px;
    height: 33px;
  }
`;
const NotificationImg = styled(Notification)`
  @media screen and (max-width: 360px) {
    width: 32px;
    height: 36px;
    margin-left: 116px;
  }
`;
const Card = styled.ul`
  @media screen and (max-width: 360px) {
    display: flex;
    padding: 12px 16px;
    height: auto;
    align-items: flex-start;
    background-color: #FFFFFF;
    box-shadow:-2px 3px 6px #00000029;
    margin-bottom: 3px;
  }
`;
const CardContent = styled.li`
  display: flex;
`
const CardContentImg = styled(defaultProfile)`
  @media screen and (max-width: 360px) {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
`;
const TimeandValue = styled.div`
  @media screen and (max-width: 360px) {
    display: flex;
    flex-direction: column;
    width: 250px;
  }
`;
const CardTime = styled.p`
  @media screen and (max-width: 360px) {
    font-size: 8px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;
const CardContentDetail = styled.p`
  @media screen and (max-width: 360px) {
    line-height: 17px;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
`;
const BoldText = styled.span`
  @media screen and (max-width: 360px) {
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;
const Dot = styled.div`
  @media screen and (max-width: 360px) {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    border-radius: 50%;
    margin: 16px 0 0 320px;
  }
`
const NotificationPage = ({ onClose }) => {
  const navigate = useNavigate();

  const showProfile = () => {
    navigate('/profile');
  }
  const hideNotification = () => {
    onClose(); // 부모 컴포넌트로 이벤트를 전달하여 classList를 제거
  };

  return (
    <Wrapper>
      <Header>
        <ArrowBackIcon onClick={hideNotification} />
        <NotificationImg />
      </Header>

      <Card>
        <CardContent>
          <CardContentImg onClick={showProfile} />
          <TimeandValue>
            <CardTime>1분전</CardTime>
            <CardContentDetail><BoldText onClick={showProfile}>chorong_2</BoldText>님이 회원님의 게시물을 좋아합니다.</CardContentDetail>
          </TimeandValue>
          <Dot />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CardContentImg onClick={showProfile} />
          <TimeandValue>
            <CardTime>1분전</CardTime>
            <CardContentDetail><BoldText onClick={showProfile}>chorong_2</BoldText>님이 회원님의 게시물을 좋아합니다.</CardContentDetail>
          </TimeandValue>
          <Dot />
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default NotificationPage;