import styles from './Contents.module.css';
import {ReactComponent as AttachFile} from '../../assets/images/attachFile.svg';
import {ReactComponent as Heart} from '../../assets/images/heart.svg';
import { useState } from 'react';
import defaultProfile from '../../assets/images/defaultProfile.png';
import defaultImg from '../../assets/images/defaultImg.png';
import axios from 'axios';
import { Link, useRouteLoaderData } from 'react-router-dom';

// tag color

const randomColor = ['#FCADFF', '#FFE0E0', '#A7FFF5', '#DDFFD6', '#B1E7FF', '#FBFF93', '#C9CDFF', '#D3D3D3', '#E6C9FF'];
const shuffleColor = randomColor.sort(()=> Math.random() - 0.5);

const Contents = (props) => {

  const token = useRouteLoaderData('token');

  //좋아요
  const [heart, setHeart] = useState(false);
  //... 더보기
  const [more, setMore] = useState(true);

  const heartClickHandler = () => {
    if (heart) {
      setHeart(false);
      props.post.likeCount -= 1;
      heartData('DELETE');
    } else {
      setHeart(true);
      props.post.likeCount += 1;
      heartData('POST');
    }
  };

  const heartStyle = heart ? styles.active : styles.heart;

  // 게시물 더보기

  const moreHandler = () => {
    setMore(false);
  };

  const date = props.post.createdDate
  const dateFormat = `${date.slice(0,4)}년 ${date.slice(5,7)}월 ${date.slice(8,10)}일`

  const showCommentPage = () => {
    props.onShowComment();
  }

  // tag color 
  const workouts = props.post.hashtags;
  const tags = [];
  let i = 0;

  for( const workout of workouts) {
    const tag = {'name': workout, 'color': shuffleColor[i]};
    tags.push(tag);
    i++;
  }

  const postId = props.post.postId;

  // 좋아요 server 전송
  const heartData = (method) => {
    axios({
      method: method,
      url: `http://prod.healthiee.net/v1/posts/${postId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      console.log(response);
      }).catch(error => {
        console.log(error);
      })
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
            {tags.map(tag => <div className={styles.profile_tag} key={tag.name} style={{backgroundColor:`${tag.color}`}}>{tag.name}</div>)}
          </div>
        </div>
      </div>
      <div className={styles.icons}>
        <AttachFile style={{marginBottom:'10px'}}/>
        <div onClick={heartClickHandler}>
          <Heart className={heartStyle}/>
          <p>{props.post.likeCount}</p>
        </div>
      </div>
    </div>

    <Link key={props.post.postId} to={`/post/${props.post.postId}`}>
      <div className={styles.content_img}>
        <img src={defaultImg} alt="content_img" />
      </div>
    </Link>
    <div className={styles.comment}>
      <div className={styles.comment_head}>
        <h2>{dateFormat}</h2>
        <Link key={props.post.postId} to={`/comments?postId=${props.post.postId}`}>
          <h2 onClick={showCommentPage}>댓글 {props.post.commentCount}개</h2>
        </Link>
      </div>
      <p className={more ? `${styles.more}` : ''}>{more ? props.post.content.slice(0,60) : props.post.content} {more && props.post.content.length > 40 ? <button onClick={moreHandler}>...더보기</button> : ''}</p>
    </div>

  </article>)
};

export default Contents;