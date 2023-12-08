import { Fragment } from "react";
import styles from './Popup.module.css';
import {ReactComponent as Close} from '../../../assets/images/close.svg';
import {ReactComponent as Delete} from '../../../assets/images/delete.svg';
import {ReactComponent as Edit} from '../../../assets/images/edit.svg';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Popup = (props) => {

  const [deletePost, setDeletePost] = useState(false);
  const navigate = useNavigate();
  const postId = props.postId;

  const closePopupHandler = () => {
    props.onPopup(false);
  };

  const cautionHandelr = () => {
    setDeletePost(true);
  };

  const editPostHandler = () => {
    navigate(`/post/${postId}/edit`);
  };

  const deletePostHandler = () => {

    axios.delete(`http://prod.healthiee.net/v1/posts/${postId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      }
    }).then(response => {
      console.log(response);
      navigate('/')
    }).catch(error => {
      console.log(error);
    })
  }

  return(
    <Fragment>
      <div onClick={closePopupHandler} className={styles.backdrop}></div>

      {deletePost && <div className={styles.caution}>
        <div className={styles.message}>
          <h1>게시물을 삭제하시겠습니까?</h1>
          <h2>이 동작은 실행 취소할 수 없습니다.</h2>
        </div>
        <div className={styles.btns}>
          <button onClick={closePopupHandler} type="button">취소하기</button>
          <button onClick={deletePostHandler} type="button">삭제하기</button>
        </div>
      </div>}

      {!deletePost && <div className={styles.container}>
        <div className={styles.close}>
          <Close onClick={closePopupHandler} width='24' height='24' fill="#FF9F4E"/>
        </div>

        <div onClick={cautionHandelr} className={styles.box}>
          <div><Delete fill="#FF9F4E"/></div>
          <p>게시물 삭제하기</p>
        </div>

        <div onClick={editPostHandler} className={styles.box}>
          <div><Edit fill="#FF9F4E"/></div>
          <p>게시물 수정하기</p>
        </div>
      </div>}
    </Fragment>
  )
};

export default Popup;