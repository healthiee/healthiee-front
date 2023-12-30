import { Fragment } from "react";
import styles from './Setting.module.css';
import {ReactComponent as Close} from '../../../assets/images/close.svg';
import {ReactComponent as Logout} from '../../../assets/images/logout.svg';
import {ReactComponent as Replay} from '../../../assets/images/replay.svg';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/instance";

const Setting = (props) => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();

  const closePopupHandler = () => {
    props.onClose(false);
  };

  const cautionHandler = () => {
    setDeleteAccount(true);
  };

  const logOutHandler = async () => {
    try {
      await api.post('http://prod.healthiee.net/v1/auth/logout', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
        }
      })
      navigate('/screen');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccountHandler = async () => {
    try {
      await api.delete('http://prod.healthiee.net/v1/members', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
        }
      })
      navigate('/screen');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <div onClick={closePopupHandler} className={styles.backdrop}></div>

      {deleteAccount && <div className={styles.caution}>
        <div className={styles.message}>
          <h1>헬띠를 탈퇴하시겠습니까?</h1>
          <h2>계정을 탈퇴하면 회원님의 모든 활동이 사라지고 이 동작은 되돌릴 수 없습니다.</h2>
        </div>
        <div className={styles.btns}>
          <button onClick={closePopupHandler} type="button">취소하기</button>
          <button onClick={deleteAccountHandler} type="button">탈퇴하기</button>
        </div>
      </div>}

      {!deleteAccount && <div className={styles.container}>
        <div className={styles.close}>
          <Close onClick={closePopupHandler} width='24' height='24' fill="#FF9F4E"/>
        </div>

        <div onClick={cautionHandler} className={styles.box}>
          <div><Logout fill="#FF9F4E"/></div>
          <p>계정 탈퇴하기</p>
        </div>

        <div onClick={logOutHandler} className={styles.box}>
          <div><Replay fill="#FF9F4E"/></div>
          <p>로그아웃</p>
        </div>
      </div>}
    </Fragment>
  )
};

export default Setting;