import styles from './Contents.module.css';
import {ReactComponent as AttachFile} from '../../assets/images/attachFile.svg';
import {ReactComponent as Heart} from '../../assets/images/heart.svg';
import { useState } from 'react';
import defaultProfile from '../../assets/images/defaultProfile.png';
import defaultImg from '../../assets/images/defaultImg.png';


const Contents = (props) => {

  //좋아요
  const [heart, setHeart] = useState(false);
  //... 더보기
  const [more, setMore] = useState(true);
  

  const heartClickHandler = () => {
    if (heart) {
      setHeart(false);
      props.post.likeCount -= 1;
    } else {
      setHeart(true);
      props.post.likeCount += 1;
    }
  };

  const moreHandler = () => {
    setMore(false);
  };

  const date = props.post.createdDate
  const dateFormat = `${date.slice(0,4)}년 ${date.slice(5,7)}월 ${date.slice(8,10)}일`

  const heartStyle = heart ? styles.active : styles.heart;

  const showCommentPage = () => {
    props.onShowCommentPage();
  }

  return (
  <article className={styles.article}>
    <div className={styles.content_info}>
      <div className={styles.profile}>
        <div className={styles.profile_img}>
        <img src={defaultProfile} alt="profile_img" />
        </div>
        <div className={styles.profile_box}>
          <h1>{props.post.member.nickname}</h1>
          <div className={styles.profile_tags}>
            {props.post.member.workouts.map(tag => <div className={styles.profile_tag} key={tag} style={{backgroundColor:'#E6C9FF'}}>{tag}</div>)}
          </div>
        </div>

      <div className={styles.icons}>
        <AttachFile style={{marginBottom:'10px'}}/>
        <div onClick={heartClickHandler}>
          <Heart className={heartStyle}/>
          <p>{props.post.likeCount}</p>
        </div>
      </div>

    <div className={styles.content_img}>
      <img src={defaultImg} alt="content_img" />
    </div>

    <div className={styles.comment}>
      <div className={styles.comment_head}>
        <h2>{dateFormat}</h2>
        <h2>댓글 {props.post.commentCount}개</h2>
      </div>
      <p className={more ? `${styles.more}` : ''}>{more ? props.post.content.slice(0,60) : props.post.content} {more ? <button onClick={moreHandler}>...더보기</button> : ''}</p>
    </div>
  </article>)
};

export default Contents;