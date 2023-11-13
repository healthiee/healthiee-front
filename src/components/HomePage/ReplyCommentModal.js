import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as defaultProfile } from '../../assets/images/defaultProfile2.svg'
import { ReactComponent as ArrowBack_icon } from '../../assets/icons/ArrowBack_icon.svg';
import { ReactComponent as heart } from '../../assets/images/heart.svg';

const Wrapper = styled.div`
  @media screen and (max-width: 360px) {
    background-color: #F7F7F7;
    width: 360px;
    height: 640px;
    transform: translateX(${({ isVisible }) => (isVisible ? '360px' : '0px')});
  }
`;
const Header = styled.div`
  @media screen and (max-width: 360px) {
    display: flex;
    align-items: center;
    height: 48px;
    background-color: #FFFFFF;
  }
`;
const ArrowBackIcon = styled(ArrowBack_icon)`
  @media screen and (max-width: 360px) {
    display: flex;
    margin-left: 19px;
    width: 33px;
    height: 33px;
  }
`;

// Card
const Card = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;

const CardContent = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: auto;
  padding: 12px 16px 9px 32px;
  box-shadow:-2px 3px 6px #00000029;
`

const CardContentImg = styled(defaultProfile)`
  position: absolute;
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;

const NameAndValue = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 38px;
`;

const CardUser = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0 160px 4px 0;
`;

const CardValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #000000;
  line-height: 1.7;
  margin-bottom: 8px;
`;

const ReplyCommentDetail = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`;

const DateAndIcon = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  white-space: nowrap;
`;

const Time = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 6px;
  white-space: nowrap;
`;

const HeartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeartIcon = styled(heart)`
  width: 16px;
  height: 16px;
  fill: ${({ $isActive }) => ($isActive ? '#FF0000' : '#D3D3D3')};
`;

const HeartNumber = styled.span`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.gray};
`;

// ReplyComment
const ReplyCardContent = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: auto;
  padding: 16px 16px 8px 72px;
  box-shadow:-2px 3px 6px #00000029;
`;

const ReplyNameAndValue = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
`

const ReplyCardContentImg = styled(defaultProfile)`
  position: absolute;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

const ReplyCardUser = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`

const CardOtherUser = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

const ReplayCardValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #000000;
`;

const ReplyCommentModal = ({ onClose, isVisible }) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [heartCount, setHeartCount] = useState(32);

  const heartClickHandler = () => {
    setHeartClicked(!heartClicked);
    setHeartCount(heartClicked ? heartCount - 1 : heartCount + 1);
  };

  const hideComment = () => {
    onClose();
  }

  return (
    <Wrapper isVisible={isVisible}>
      <Header>
        <ArrowBackIcon onClick={hideComment} />
      </Header>

      {/* card */}
      <Card>
        <CardContent>
          <CardContentImg />
          <NameAndValue>
            <CardUser>healthiee</CardUser>
            <CardValue>수고했어요~! 내일은 같이 운동해요!</CardValue>
            <ReplyCommentDetail>답글 달기</ReplyCommentDetail>
          </NameAndValue>
          <DateAndIcon>
            <Time>2023년 9월 20일 19:38</Time>
            <HeartWrapper onClick={heartClickHandler}>
              <HeartIcon $isActive={heartClicked} />
              <HeartNumber>{heartCount}</HeartNumber>
            </HeartWrapper>
          </DateAndIcon>
        </CardContent>

        <ReplyCardContent>
          <ReplyCardContentImg />
          <ReplyNameAndValue>
            <ReplyCardUser>Wowowow</ReplyCardUser>
            <ReplayCardValue>
              <CardOtherUser>@healthiee</CardOtherUser> 네~
            </ReplayCardValue>
          </ReplyNameAndValue>
          <DateAndIcon>
            <Time>2023년 9월 20일 19:38</Time>
            <HeartWrapper onClick={heartClickHandler}>
              <HeartIcon $isActive={heartClicked} />
              <HeartNumber>{heartCount}</HeartNumber>
            </HeartWrapper>
          </DateAndIcon>
        </ReplyCardContent>

        {/* <ReplyCardContent>
          <ReplyNameAndValue>
              <ReplyComment>
                <ReplyCardContentImg />
                <ReplyNameAndValue>
                  <ReplyCardUser>Wowowow</ReplyCardUser>
                  <ReplayCardValue>
                    <CardOtherUser>@healthiee</CardOtherUser>
                    <CardOtherUser>@Wowowow</CardOtherUser> 저도 같이 할 수 있나요?
                  </ReplayCardValue>
                </ReplyNameAndValue>
              </ReplyComment>
          </ReplyNameAndValue>
          <DateAndIcon>
            <Time>2023년 9월 20일 19:38</Time>
            <HeartWrapper onClick={heartClickHandler}>
              <HeartIcon $isActive={heartClicked} />
              <HeartNumber>{heartCount}</HeartNumber>
            </HeartWrapper>
          </DateAndIcon>
        </ReplyCardContent> */}
      </Card>
    </Wrapper>
  );
};

export default ReplyCommentModal;