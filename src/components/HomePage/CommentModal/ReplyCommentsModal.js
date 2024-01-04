import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ArrowBack_Icon } from '../../../assets/icons/ArrowBack_icon.svg';
import { ReactComponent as defaultProfile } from '../../../assets/images/defaultProfile2.svg'
import { ReactComponent as heart } from '../../../assets/images/heart.svg';
import { ReactComponent as sendIcon } from '../../../assets/images/sendIcon.svg';
import axios from 'axios';
import ReplyCommentModal from './ReplyCommentModal';
import { format } from 'date-fns-tz';

const ReplyCommetsModalWrapper = styled.div`
  width: 360px;
  height: 640px;
  overflow-y: auto;
  background-color: #FFFFFF;
  -ms-overflow-style: none;
   
  &::-webkit-scrollbar {
    display: none;
  }
`

const HeaderWrapper = styled.div` 
  position: fixed;
  top: 0;
  z-index: 1;
  padding: 12px 0 0 28px;
  width: 360px;
  height: 48px;
  background-color: #FFFFFF;
`

const ArrowBack = styled(ArrowBack_Icon)`
  width: 33px;
  height: 33px;
  fill: ${({ theme }) => theme.colors.gray};
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 48px;

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
  padding: 12px 16px 9px 32px;
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

const CardReply = styled.p`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
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
// Comment Form
const CommentFormWrapper = styled.div`
  display: flex;
  position : fixed;
  bottom : 0;
  height: 48px;
  background-color: #EFEFEFCC;
  padding: 4px 16px;
`

const CommentForm = styled.div`
  width: 248px;
  height: 40px;
  border-radius: 20px;
  padding: 12px 20px 0;
  margin-right: 8px;
  background-color: #FFFFFF;
`

const CommentBtnWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 40px;
  border-radius: 20px;
  background-color: #FFFFFF;
`

const CommentBtnIcon = styled(sendIcon)`
  width: 34px;
  height: 28px;
  fill: '#FF9F4E';
`

const CommentInput = styled.input`
  width:100%;
  font-size: ${({ theme }) => theme.fontSize.sm};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
}
`

const ReplyCommentsModal = () => {
  const location = useLocation();
  const { postId, comment } = location.state;
  const [replyComment, setReplyComment] = useState([]);
  const [commentId, setCommentId] = useState('');
  const [parentCommentId, setParentCommentId] = useState('');
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [heart, setHeart] = useState(localStorage.getItem(`comment_${comment.commentId}_heart`) === 'true');
  const [isEdit, setIsEdit] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState('');

  // Save heart
  useEffect(() => {
    localStorage.setItem(`comment_${comment.commentId}_heart`, heart);
  }, [comment.commentId, heart]);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://prod.healthiee.net/v1/comments/${comment.commentId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        });

        const date = response.data.data.childComments.map(childComments => {
          const createdDateUTC = new Date(childComments.createdDate);
          createdDateUTC.setHours(createdDateUTC.getHours() + 9);
          const year = createdDateUTC.getFullYear();
          const month = createdDateUTC.getMonth() + 1;
          const day = createdDateUTC.getDate();
          let hours = createdDateUTC.getHours();
          let minutes = createdDateUTC.getMinutes();
        
          hours = hours < 10 ? `0${hours}` : hours;
          minutes = minutes < 10 ? `0${minutes}` : minutes;
          
          const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
          return {
            ...childComments,
            createdDate: formattedDate,
          };
        });
        setReplyComment(prev => ({
          ...prev,
          childComments: date,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [comment.commentId]);

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

  const addReply = () => {
    setInput(`@${comment.commentId} `);
    setParentCommentId(comment.commentId);
  }

  const editComment = (content, commentId) => {
    setInput(content);
    setCommentToEdit(commentId);
    setIsEdit(true);
  }

  const clearInput = () => {
    setInput('');
  }

  const onAddComment = async (e) => {
    e.preventDefault();
    if (parentCommentId) {

      // Reply Comment
      const newReplyComment = {
        commentId: commentId,
        content: input,
        member: {
          memberId: "736cf454-2818-4fd9-a077-300b6f5efe64",
          email: "member1@gmail.com",
          name: "member1",
          nickname: "member1",
          profileUrl: null
        },
        likeCount: 0,
        liked: false,
        createdDate: format(new Date(), "yyyy년 M월 d일 HH:mm"),
        childComments: []
      };
      try {
        const res = await axios.post('http://prod.healthiee.net/v1/comments', {
          postId: postId,
          content: input,
          parentCommentId: parentCommentId,
        }, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        });
        newReplyComment.commentId = res.data.data.commentId;
        setReplyComment(prev => ({
        ...prev,
        childComments: [...prev.childComments, newReplyComment],
      }));
        setInput('');
      } catch (err) {
        console.log(err);
      }
    } else if (isEdit && commentToEdit) {
      const updatedEditReplyComments = replyComment.childComments.map((childComment) => {
        if(childComment.commentId === commentToEdit) {
          return {
            ...childComment,
            content: input,
          }
        }
        return childComment;
      });
      try {
        await axios.patch(`http://prod.healthiee.net/v1/comments/${commentToEdit}`, {
          content: input
        }, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        })
        setReplyComment(prev => ({
          ...prev,
          childComments: updatedEditReplyComments
        }));
        setInput('');
        setCommentToEdit('');
        setIsEdit(false);
      } catch (err) {
        console.log(err);
      }
    }
    }
    
  //Delete Comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://prod.healthiee.net/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
        }
      });
      setReplyComment(prev => ({
        ...prev,
        childComments: prev.childComments.filter(childComment => childComment.commentId !== commentId)
      }));
    } catch (err) {
      console.log(err);
    }
    setIsEdit(false);
    setCommentToEdit('');
    setParentCommentId('');
    setInput('');
  }

  return (
    <ReplyCommetsModalWrapper>
      <HeaderWrapper>
        <Link to={`/comments?postId=${postId}`}>
          <ArrowBack />
        </Link>
      </HeaderWrapper>

      <Card>
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
                <CardContents>{comment.content}</CardContents>
                <CardHeartWrapper onClick={heartClickHandler}>
                  <CardHeartIcon $isActive={heart} />
                  <CardHeartNumber>{comment.likeCount}</CardHeartNumber>
                </CardHeartWrapper>
              </CardContentAndHeart>
              <CardReply onClick={addReply}>답글 달기</CardReply>
            </CardMainWrapper>
          </CardContent>
        </CardContentWrapper>
      </Card>
      {replyComment.childComments && replyComment.childComments.map((childcomment, i) => {
        return (
          <React.Fragment key={childcomment.commentId}>
            <ReplyCommentModal 
              childcomment={childcomment}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
              clearInput={clearInput}
            />
          </React.Fragment>
        )
      })}
      <CommentFormWrapper>
          <CommentForm>
            <CommentInput
              placeholder="댓글 입력하기"
              onChange={e => {
                setInput(e.target.value)
              }}
              onKeyUp={e => {
                e.target.value.length > 0
                  ? setIsValid(true)
                  : setIsValid(false);
              }}
              value={input}
            />
          </CommentForm>
          <CommentBtnWrapper
            onClick={onAddComment}
            disabled={isValid ? false : true}
          >
            <CommentBtnIcon $commentLength={input.length} />
          </CommentBtnWrapper>
        </CommentFormWrapper>

    </ReplyCommetsModalWrapper>
  );
};

export default ReplyCommentsModal;