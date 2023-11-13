import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as defaultProfile } from '../../assets/images/defaultProfile2.svg'
import { ReactComponent as heart } from '../../assets/images/heart.svg';
import { ReactComponent as replyIcon } from '../../assets/images/replyIcon.svg';
import ReplyCommentModal from './ReplyCommentModal';

const CommentModal = styled.div`
  width: 360px;
  max-height: 640px;
  overflow-y: auto;
  background-color: #FFFFFF;
  -ms-overflow-style: none;
   
  &::-webkit-scrollbar {
    display: none;
  }
`;

// Header
const HeaderWrapper = styled.div`
  position: fixed;  
  height: 75px;
  width: 360px;
  background-color: #FFFFFF;
  z-index: 1;
`

const Header = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  background-color: #FFFFFF;
  height: 75px;
  border: 5px solid #D3D3D3;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  z-index: 2;
`;

const Dots = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40px;
  height: 8px;
  margin-top: 7px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.lightOrange};
  border-radius: 50%;
`;

const Title = styled.p`
  margin-top: 16px;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: #000000;
`;

// Card

const Card = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 75px;
`;

const CardContent = styled.li`
  display: flex;
  align-items: flex-start;
  height: auto;
  padding: 12px 16px 9px 32px;
  box-shadow:-2px 3px 6px #00000029;
`;

const CardContentImg = styled(defaultProfile)`
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;

const NameAndValue = styled.div`
  display: flex;
  flex-direction: column;
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

// ReplyComment

const ReplyCommentWrapper = styled.ul`
  display: flex;
  margin-left: 8px;
`

const ReplyComment = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2px;
`;

const ReplyIcon = styled(replyIcon)`
  width: 17px;
  height: 13.5px;
  margin-right: 8px;
  margin-top: 4px;
  fill: #717171;
`;

const ReplyCardContentImg = styled(defaultProfile)`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`
const ReplyNameAndValue = styled.div`
  display: flex;
  flex-direction: column;
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

const ReplyCommentDetail = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`;

const DateAndIcon = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const Time = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 6px;
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

const Comment = ({ onCloseCommentPage, onShowHomePage }) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [heartCount, setHeartCount] = useState(32);
  const [replyCommentVisible, setReplyCommentVisible] = useState(false);

  const heartClickHandler = () => {
    setHeartClicked(!heartClicked);
    setHeartCount(heartClicked ? heartCount - 1 : heartCount + 1);
  };

  const showReplyComment = () => {
    setReplyCommentVisible(true);
  }

  const closeReplyComment = () => {
    setReplyCommentVisible(false);
  };

  return (
    <>
      {
        replyCommentVisible && <ReplyCommentModal Visible={replyCommentVisible} onClose={closeReplyComment} />
      }
      <CommentModal>
        <HeaderWrapper>
          <Header>
            <Dots>
              <Dot />
              <Dot />
              <Dot />
            </Dots>
            <Title>댓글</Title>
          </Header>
        </HeaderWrapper>

        <Card>
          {/* Fist Comment */}
          <CardContent>
            <CardContentImg />
            <NameAndValue>
              <CardUser>healthiee</CardUser>
              <CardValue>수고했어요~! 내일은 같이 운동해요!</CardValue>
              <ReplyCommentWrapper>
                <ReplyComment>
                  <ReplyIcon />
                  <ReplyCardContentImg />
                  <ReplyNameAndValue>
                    <ReplyCardUser>Wowowow</ReplyCardUser>
                    <ReplayCardValue>
                      <CardOtherUser>@healthiee</CardOtherUser> 네~
                    </ReplayCardValue>
                  </ReplyNameAndValue>
                </ReplyComment>
              </ReplyCommentWrapper>
              <ReplyCommentDetail onClick={showReplyComment}>답글 1개 더보기</ReplyCommentDetail>
            </NameAndValue>
            <DateAndIcon>
              <Time>2023년 9월 20일 19:38</Time>
              <HeartWrapper onClick={heartClickHandler}>
                <HeartIcon $isActive={heartClicked} />
                <HeartNumber>{heartCount}</HeartNumber>
              </HeartWrapper>
            </DateAndIcon>
          </CardContent>

          {/* Second Comment */}
          <CardContent>
            <CardContentImg />
            <NameAndValue>
              <CardUser>healthiee</CardUser>
              <CardValue>안녕하세요!</CardValue>
              <ReplyCommentDetail>답글 1개 더보기</ReplyCommentDetail>
            </NameAndValue>
            <DateAndIcon>
              <Time>2023년 9월 20일 19:38</Time>
              <HeartWrapper onClick={heartClickHandler}>
                <HeartIcon $isActive={heartClicked} />
                <HeartNumber>{heartCount}</HeartNumber>
              </HeartWrapper>
            </DateAndIcon>
          </CardContent>

        </Card>
      </CommentModal>
    </>
  );
};

export default Comment;