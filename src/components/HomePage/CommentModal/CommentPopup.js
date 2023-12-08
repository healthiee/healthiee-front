import React, { useState } from 'react';
import { styled } from 'styled-components';

const CommentPopupBack = styled.div`
  height: 100%;
`

const CommentPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 52px;
  border-radius: 15px;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 6px #00000029;
  position: absolute; 
  margin-top: 10px;
  padding: 10px 17px;
`

const TextEdit = styled.p`
  font-size: 8px;
`

const TextDelete = styled.p`
  font-size: 8px;
`

const Line = styled.div`
  width: 72px;
  height: 2px;
  background-color: #D3D3D3;
`

const CommentPopup = ({ commentId, content, onEditComment, onDeleteComment, clearInput, onClosePopup }) => {
  const [isEdit, setIsEdit] = useState(false);

  // Edit Comment
  const editComment = () => {
    if (!isEdit) {
      onEditComment(content, commentId);
    } else {
      clearInput();
      setIsEdit(false);
    }
    onClosePopup();
  }

  // Delete Comment
  const deleteComment = () => {
    onDeleteComment(commentId);
  }
  
  return (
    <CommentPopupBack>
      <CommentPopupWrapper>
        <TextEdit onClick={editComment}>댓글 수정하기</TextEdit>
        <Line />
        <TextDelete onClick={deleteComment}>댓글 삭제하기</TextDelete>
      </CommentPopupWrapper>
    </CommentPopupBack>
  );
};

export default CommentPopup;