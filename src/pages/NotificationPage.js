import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Notification } from '../assets/images/notification.svg';
import FeedBasicImg from '../assets/images/feedBasicImg.jpg';

const Wrapper = styled.div`
  @media screen and (max-width: 360px) {
    background-color: #F7F7F7;
    height: 640px;
  }
`
const Header = styled.div`
  @media screen and (max-width: 360px) {
    height: 48px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }
`;
const NotificationImg = styled(Notification)`
  @media screen and (max-width: 360px) {
    width: 32px;
    height: 36px;
  }
`;
const Card = styled.div`
  @media screen and (max-width: 360px) {
    display: flex;
    height: 64px;
    background-color: #FFFFFF;
    box-shadow:0 3px 6px #00000029;
    padding: 12px 16px 12px 16px;
  }
`;
const CardContentImg = styled.div`
  @media screen and (max-width: 360px) {
    background-image: url(${FeedBasicImg});
    background-size: cover;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
`;
const CardContent = styled.div`
  @media screen and (max-width: 360px) {
    display: flex;
    flex-direction: column;
    margin-right: 4px;
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

const NotificationPage = () => {
  return (
    <Wrapper>
      <Header>
        <NotificationImg />
      </Header>
      <Card>
      <CardContentImg />
      <CardContent>
          <CardTime>1분전</CardTime>
          <CardContentDetail>chorong_2님이 회원님의 게시물을 좋아합니다.</CardContentDetail>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default NotificationPage;