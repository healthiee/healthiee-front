import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as sendIcon } from '../../../assets/images/sendIcon.svg';
import { ReactComponent as closeCircle } from '../../../assets/images/closeCircle.svg';
import axios from 'axios';
import Comment from './Comment';
import { format } from 'date-fns-tz';

const CommentModal = styled.div`
  width: 360px;
  height: 640px;
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
  top: 0;
  padding-top: 10px;
  height: 85px;
  width: 360px;
  background-color: #FFFFFF;
  z-index: 1;
`

const Header = styled.div`
  padding-left: 160px;
  display: flex;
  width: 360px;
  background-color: #FFFFFF;
  height: 75px;
  border: 5px solid #D3D3D3;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const DotsAndTitle = styled.div`
  display: flex;
  flex-direction: column;
`

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
  margin: 16px 0 0 6px;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: #000000;
`;

const CloseIcon = styled(closeCircle)`
  margin-top: 24px;
  margin-left: 114px;
  width: 28px;
  height: 28px;
  fill: ${({ theme }) => theme.colors.lightOrange};
`

// Card
const Card = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 85px;
`;

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

const Comments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [parentCommentId, setParentCommentId] = useState('');
  const [commentToEdit, setCommentToEdit] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://prod.healthiee.net/v1/comments?postId=${postId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        });
        const formattedComments = response.data.data.comments.map(comment => ({
          ...comment,
          createdDate: format(new Date(comment.createdDate), "yyyy년 M월 d일 HH:mm"),
        }));
        setComments(formattedComments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [postId]);

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
      const updatedReplyComments = comments.map((comment) => {
        if (comment.commentId === parentCommentId) {
          return {
            ...comment,
            childComments: [...comment.childComments, newReplyComment],
          };
        }
        return comment;
      })

      try {
        const res = await axios.post('http://prod.healthiee.net/v1/comments', {
          postId: postId,
          content: input,
          parentCommentId: parentCommentId
        }, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        });
        newReplyComment.commentId = res.data.data.commentId;
        setComments(updatedReplyComments);
        setInput('');
        setParentCommentId('');
      } catch (err) {
        console.log(err);
      }
    } else if (isEdit && commentToEdit) {

      // Edit Comment
      const updatedEditComments = comments.map((comment) => {
        if (comment.commentId === commentToEdit) {
          return {
            ...comment,
            content: input,
          };
        }
        return comment;
      });
      try {
        await axios.patch(`http://prod.healthiee.net/v1/comments/${commentToEdit}`, {
          content: input
        }, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        })
        setComments(updatedEditComments);
        setInput('');
        setCommentToEdit('');
        setIsEdit(false);
      } catch (err) {
        console.log(err);
      }
    } else {

      // New Comment
      const newComment = {
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
        childCommentCount: 2,
        childComments: []
      };
      try {
        const res = await axios.post('http://prod.healthiee.net/v1/comments', {
          postId: postId,
          content: input,
        }, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        })
        newComment.commentId = res.data.data.commentId;
        setComments([newComment, ...comments]);
        setInput('');
      } catch (err) {
        console.log(err);
      }
    }
  }

  const addReply = (parentCommentId) => {
    setInput(`@${parentCommentId} `);
    setParentCommentId(parentCommentId);
  }

  const editComment = (content, commentId) => {
    setParentCommentId('');
    setInput(content);
    setCommentToEdit(commentId);
    setIsEdit(true);
  }

  const clearInput = () => {
    setInput('');
  }

  //Delete Comment
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.get(`http://prod.healthiee.net/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
        }
      });
      const childComments = response.data.data.childComments;

      // Delete main comment
      await axios.delete(`http://prod.healthiee.net/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
        }
      });

      // Delete child comments
      const deleteChildComments = async (childComments) => {
        for (const childComment of childComments) {
          await axios.delete(`http://prod.healthiee.net/v1/comments/${childComment.commentId}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
            }
          });
        }
      };

      if (childComments.length > 0) {
        await deleteChildComments(childComments);
      }

      const updatedComments = comments.filter((comment) => comment.commentId !== commentId);
      setComments(updatedComments);
    } catch (err) {
      console.log(err);
    }
    setIsEdit(false);
    setCommentToEdit('');
    setParentCommentId('');
    setInput('');
  }

  return (
      <CommentModal>
        <HeaderWrapper>
          <Header>
            <DotsAndTitle>
              <Dots>
                <Dot />
                <Dot />
                <Dot />
              </Dots>
              <Title>댓글</Title>
            </DotsAndTitle>
            <Link to='/'>
              <CloseIcon/>
            </Link>
          </Header>
        </HeaderWrapper>

        <Card>
          {comments && comments.map((comment, i) => {
            return (
              <React.Fragment key={comment.commentId}>
                <Comment
                  comment={comment}
                  onAddReply={addReply}
                  onEditComment={editComment}
                  onDeleteComment={deleteComment}
                  clearInput={clearInput}
                  postId={postId}
                />
              </React.Fragment>
            )
          })}
        </Card>

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
            disabled={isValid ? false : true}>
            <CommentBtnIcon $commentLength={input.length} />
          </CommentBtnWrapper>
        </CommentFormWrapper>
      </CommentModal>
  );
};
export default Comments;
