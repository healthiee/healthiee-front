import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as defaultProfile } from '../../../assets/images/defaultProfile2.svg'
import { ReactComponent as heart } from '../../../assets/images/heart.svg';
import { ReactComponent as dots } from '../../../assets/images/dots.svg';
import CommentPopup from './CommentPopup';
import axios from 'axios';

const Card = styled.article`
  display: flex;
  flex-direction: column;
`

const CardImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`

const CardContentImg = styled(defaultProfile)`
  width: 30px;
  height: 30px;
`;

const CardContentWrapper = styled.div`
  padding: 12px 16px 0 72px;
  box-shadow:-2px 3px 6px #00000029;
`

const CardContent = styled.div`
  display: flex;
`

const CardMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`

const CardUserAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const CardUser = styled.span`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`;

const CardTime = styled.div`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`

const CardContentAndHeart = styled.div`
  display: flex;
  justify-content: space-between;
`

const CardContents = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;
`

const CardHeartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardHeartIcon = styled(heart)`
  width: 16px;
  height: 16px;
  fill: ${({ $isActive }) => ($isActive ? '#FF0000' : '#D3D3D3')};
`

const CardHeartNumber = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.gray};
`

const Popup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const DotsIcon = styled(dots)`
  width: 32px;
  fill: #D3D3D3;
  margin-right: 16px;
`

const UserId = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`

const UserMessage = styled.span`

`

const ReplyCommentModal = ({ childcomment, onEditComment, onDeleteComment, clearInput }) => {
  
  // Heart
  const [isPopup, setIsPopup] = useState(false);
  const [heart, setHeart] = useState(() => {
    const savedHeart = localStorage.getItem(`comment_${childcomment.commentId}_heart`);
    return savedHeart === 'true';
  });

  // UserIdColor Change
  const contentParts = childcomment.content.split(' ');
  const userId = contentParts[0];
  const message = contentParts.slice(1).join(' ');

  // Save heart
  useEffect(() => {
    const savedHeart = localStorage.getItem(`comment_${childcomment.commentId}_heart`);
    setHeart(savedHeart === 'true');
  }, [childcomment.commentId]);

  useEffect(() => {
    localStorage.setItem(`comment_${childcomment.commentId}_heart`, heart);
  }, [childcomment.commentId, heart]);

  // Heart
  const heartClickHandler = () => {
    if (heart) {
      setHeart(false);
      childcomment.likeCount -= 1;
      heartData('DELETE');
    } else {
      setHeart(true);
      childcomment.likeCount += 1;
      heartData('POST');
    }
  };
  
  const heartData = (method) => {
    axios({
      method: method,
      url: `http://prod.healthiee.net/v1/comments/${childcomment.commentId}/like`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      }
    }).then(res => {
      console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

  // Edit & Delete Popup
  const commentPopupHandler = (e) => {
    e.preventDefault()
    setIsPopup(!isPopup);
  }

  const closePopup = () => {
    setIsPopup(false);
  }

  return (
    <Card>
      <CardContentWrapper>
        <CardContent>
          <CardImgWrapper>
            <CardContentImg />
          </CardImgWrapper>
          <CardMainWrapper>
            <CardUserAndTime>
              <CardUser>{childcomment.commentId}</CardUser>
              <CardTime>{childcomment.createdDate}</CardTime>
            </CardUserAndTime>
            <CardContentAndHeart>
              <CardContents>
                <UserId>{userId}</UserId>{' '}
                <UserMessage>{message}</UserMessage>
              </CardContents>
              <CardHeartWrapper onClick={heartClickHandler}>
                <CardHeartIcon $isActive={heart} />
                <CardHeartNumber>{childcomment.likeCount}</CardHeartNumber>
              </CardHeartWrapper>
            </CardContentAndHeart>
            <Popup>
              <DotsIcon onClick={commentPopupHandler} />
              {isPopup &&
                <CommentPopup
                  commentId={childcomment.commentId}
                  content={childcomment.content}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                  clearInput={clearInput}
                  onClosePopup={closePopup}
                />}
            </Popup>
          </CardMainWrapper>
        </CardContent>
      </CardContentWrapper>
    </Card>
  );
};

export default ReplyCommentModal;