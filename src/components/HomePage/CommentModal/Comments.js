import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as sendIcon } from '../../../assets/images/sendIcon.svg';
import { ReactComponent as closeCircle } from '../../../assets/images/closeCircle.svg';
import axios from 'axios';
import Comment from './Comment';
import CommentsPopup from './CommentPopup';

const CommentModalWrapper = styled.div`
  background-color: #FFFFFF;
  padding-top: 10px;
`

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
  height: 75px;
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
  z-index: 2;
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

const Comments = (props, { onCloseCommentPage, onShowHomePage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [parentCommentId, setParentCommentId] = useState('');
  const [commentToEdit, setCommentToEdit] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://prod.healthiee.net/v1/comments?postId=${postId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        });
        setComments(response.data.data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();

  }, []);

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
        createdDate: new Date().toLocaleString(),
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
        createdDate: new Date().toLocaleString(),
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
      await axios.delete(`http://prod.healthiee.net/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
        }
      });

      const updateDeleteComments = comments.filter((comment) => comment.commentId !== commentId);
      setComments(updateDeleteComments);
    } catch (err) {
      console.log(err);
    }
    setIsEdit(false);
    setCommentToEdit('');
    setParentCommentId('');
    setInput('');
  }


  return (
    <CommentModalWrapper>
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
            <Link to='..'>
              <CloseIcon />
            </Link>
          </Header>
        </HeaderWrapper>

        <Card>
          {comments && comments.map((comment, i) => {
            return (
              <>
                <Comment
                  key={comment.commentId}
                  comment={comment}
                  onAddReply={addReply}
                  onEditComment={editComment}
                  onDeleteComment={deleteComment}
                  clearInput={clearInput}
                  postId={postId}
                />
              </>
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
            disabled={isValid ? false : true}
          >
            <CommentBtnIcon $commentLength={input.length} />
          </CommentBtnWrapper>
        </CommentFormWrapper>

      </CommentModal>
    </CommentModalWrapper>
  );
};
export default Comments;
