import styles from './Home.module.css';
import { Fragment, useState, useEffect, useRef } from 'react';
import {ReactComponent as Tune} from '../../assets/images/tune.svg';
import {ReactComponent as Notification} from '../../assets/images/notification.svg';
import logo from '../../assets/images/logo.png'
import Contents from './Contents';
import NotificationPopup from '../../pages/Notification';
import defaultProfile from '../../assets/images/defaultProfile.png';
import defaultImg from '../../assets/images/defaultImg.png';
import Search from './SearchPage/Search';
import Comment from './Comment';

const dummy = [{
  nickname : 'chorong_2',
  tags : [{name: '오운완', color: '#FCADFF'}, {name: '필라테스', color: '#B1E7FF'}, {name: '축구', color: '#FBFF93'}],
  profileImg : defaultProfile,
  postImg : defaultImg,
  created_at : '2023년 9월 21일',  // post 생성날짜로 대체
  body : '오늘 운동도 끝',
  comments : 4,
  love : 25
},{
  nickname : 'chorong_4',
  tags : [{name: '오운완', color: '#FCADFF'}, {name: '필라테스', color: '#B1E7FF'}],
  profileImg : defaultProfile,
  postImg : defaultImg,
  created_at : '2023년 11월 29일',  // post 생성날짜로 대체
  body : '오늘 운동도 끝',
  comments : 10,
  love : 19,
}]

const Home  = () => {

  const [backdrop, setBackdrop] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const swipeRef = useRef(null);
  const swipeCommentRef = useRef(null);
  
  // Search Page

  const searchHandler = () => {
    if(backdrop) {
      setBackdrop(false);
    } else {
      setBackdrop(true);
    }
  }

  const searchButtonStyle = backdrop? styles.active : '';

  // Notification Page
  
  const showNotification = () => {
    setPopupVisible(true);
  };
  const showHomePage = () => {
    setPopupVisible(false);
    setCommentVisible(false);
  };

  const showCommentPage = () => {
    setCommentVisible(true);
  }

  useEffect(() => {
  swipeRef.current.classList.toggle(styles.showNotificaton) 
  }, [popupVisible]);

  // Comment Page
  useEffect(() => {
    swipeCommentRef.current.classList.toggle(styles.showComment)
  }, [commentVisible]);

  return(
    <Fragment>
      <div className={styles.commentModalPopup} ref={swipeCommentRef}>
        {commentVisible && <Comment />}
      </div>
      <div className={styles.notificationPopup} ref={swipeRef}>
        {popupVisible && <NotificationPopup onClose={showHomePage} />}
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
        {dummy.map(post => <Contents key={post.nickname} post={post} onShowCommentPage={showCommentPage} />)}
      </div>
    </Fragment>
  );
};

export default Home;