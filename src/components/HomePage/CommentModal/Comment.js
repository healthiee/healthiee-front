import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as defaultProfile } from '../../../assets/images/defaultProfile2.svg'
import { ReactComponent as heart } from '../../../assets/images/heart.svg';
import ReplyComment from '../CommentModal/ReplyComment';
import axios from 'axios';

const CardContentWrapper = styled.div`
  padding: 12px 16px 9px 32px;
  box-shadow:-2px 3px 6px #00000029;
  `;

const CardContent = styled.div`
  display: flex;
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

const CardReply = styled.p`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`

const Test = styled.div`
  display: flex;
`

const EditText = styled.p`
  
`

const CardHeartNumber = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.gray};
`

const CardHeartIcon = styled(heart)`
  width: 16px;
  height: 16px;
  fill: ${({ $isActive }) => ($isActive ? '#FF0000' : '#D3D3D3')};
`

const Comment = ({ comment, onAddReply, onEditComment, onDeleteComment, clearInput, postId }) => {
  const [heart, setHeart] = useState(() => {
  const savedHeart = localStorage.getItem(`comment_${comment.commentId}_heart`);
    return savedHeart === 'true';
  });
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  // Save heart
  useEffect(() => {
    const savedHeart = localStorage.getItem(`comment_${comment.commentId}_heart`);
    setHeart(savedHeart === 'true');
  }, [comment.commentId]);

  useEffect(() => {
    localStorage.setItem(`comment_${comment.commentId}_heart`, heart);
  }, [comment.commentId, heart]);

  // Heart
  const heartClickHandler = () => {
    if (heart) {
      setHeart(false);
      comment.likeCount -= 1;
      heartData('DELETE');
    } else {
      setHeart(true);
      comment.likeCount += 1;
      heartData('POST');
    }
  };

  const heartData = (method) => {
    axios({
      method: method,
      url: `http://prod.healthiee.net/v1/comments/${comment.commentId}/like`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  // Reply Comment
  const addReply = () => {
    onAddReply(comment.commentId);
  }

  // Edit Comment
  const editComment = () => {
    setIsEdit(!isEdit);
    if (!isEdit) {
      onEditComment(comment.content, comment.commentId);
    } else {
      clearInput();
      setIsEdit(false);
    }
  }

  // Delete Comment
  const deleteComment = () => {
    onDeleteComment(comment.commentId);
  }

  // More Replies
  const viewMoreReplies = () => {
    navigate(`/comments/${comment.commentId}`, { state: { postId, comment } })
  }

  return (
    <CardContentWrapper>
      <CardContent>
        <CardImgWrapper>
          <CardContentImg />
        </CardImgWrapper>
        <CardMainWrapper>
          <CardUserAndTime>
            <CardUser>{comment.commentId}</CardUser>
            <CardTime>{comment.createdDate}</CardTime>
          </CardUserAndTime>
          <CardContentAndHeart>
            <CardContents $isEdit={isEdit}>{comment.content}</CardContents>
            <CardHeartWrapper onClick={heartClickHandler}>
              <CardHeartIcon $isActive={heart} />
              <CardHeartNumber>{comment.likeCount}</CardHeartNumber>
            </CardHeartWrapper>
          </CardContentAndHeart>

          {(comment.childComments || []).length > 0 && (
            <div>
              {(comment.childComments || []).map(comment => {
                return <ReplyComment key={comment.commentId} comment={comment} />
              })}
            </div>
          )}
          <Test>
            <CardReply onClick={comment.childComments.length >= 3 ? viewMoreReplies : addReply}>{comment.childComments.length >= 3 ? '답글 더보기' : '답글 달기'}</CardReply>
            <EditText onClick={editComment}>{isEdit ? '취소' : '수정'}</EditText>
            <div onClick={deleteComment}>삭제</div>
          </Test>
        </CardMainWrapper>
      </CardContent>
    </CardContentWrapper>
  );
};

export default Comment;