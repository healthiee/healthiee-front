import styles from './Home.module.css';
import { useLoaderData } from 'react-router-dom';
import { Fragment, useState, useEffect, useRef } from 'react';
import {ReactComponent as Tune} from '../../assets/images/tune.svg';
import {ReactComponent as Notification} from '../../assets/images/notification.svg';
import logo from '../../assets/images/logo.png'
import Contents from './Contents';
import NotificationPopup from '../../pages/Notification';
import Search from './SearchPage/Search';
import axios from 'axios';
import Comment from './Comment';

const Home  = () => {

  const [backdrop, setBackdrop] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const swipeRef = useRef(null);
  const swipeCommentRef = useRef(null);

  const dummy = useLoaderData();
  
  // Search Page

  const searchHandler = () => {
    if(backdrop) {
      setBackdrop(false);
    } else {
      setBackdrop(true);
    }
  }

  // Notification Page
  
  const showNotification = () => {
    setPopupVisible(true);
  };

  const showCommentPage = () => {
    setCommentVisible(true);
  }

  const closeNotification = () => {
    swipeRef.current.classList.toggle(styles.showNotificaton);
    setTimeout(() => {
      setPopupVisible(false);
    }, 500);
  };

  useEffect(() => {
  swipeRef.current.classList.toggle(styles.showNotificaton, popupVisible) 
  }, [popupVisible]);
  
  // Comment Page

  useEffect(() => {
    swipeCommentRef.current.classList.toggle(styles.showComment)
  }, [commentVisible]);

  const searchButtonStyle = backdrop? styles.active : '';

  return(
    <Fragment>
      <div className={styles.notificationPopup} ref={swipeRef}>
        {popupVisible && <NotificationPopup onClose={closeNotification} />}
      </div>
      <div className={styles.commentModalPopup} ref={swipeCommentRef}>
        {commentVisible && <Comment />}
      </div>
      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.notifiaction}>
          <Notification onClick={showNotification} />
        </div>
      </header>

      <div className={styles.tune}>
        <Tune className={searchButtonStyle} style={{cursor:'pointer'}} onClick={searchHandler}/>
        {backdrop && <Search onBackdrop={searchHandler}/>}
      </div>

      <div className={styles.contents}>
        {dummy.map(post => <Contents key={post.postId} post={post} onShowCommentPage={showCommentPage}/>)}
      </div>
    </Fragment>
  );
};

export default Home;

//server에서 정보 받아오기

export async function loader () {
  const response = await axios.get('http://prod.healthiee.net/v1/posts',{
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      }
    })

  if(response.status !== 200) {
    return <p>response error</p>
  } else {
    return response.data.data.content;
  }
};