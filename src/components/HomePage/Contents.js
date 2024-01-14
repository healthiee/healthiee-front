import styles from './Contents.module.css';
import {ReactComponent as AttachFile} from '../../assets/images/attachFile.svg';
import {ReactComponent as Heart} from '../../assets/images/heart.svg';
import { useState } from 'react';
import defaultProfile from '../../assets/images/defaultProfile.png';
import defaultImg from '../../assets/images/defaultImg.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ReactComponent as NextBtn} from '../../assets/images/nextBtn.svg';
import {ReactComponent as BackBtn} from '../../assets/images/backBtn.svg';

// tag color

const randomColor = ['#FCADFF', '#FFE0E0', '#A7FFF5', '#DDFFD6', '#B1E7FF', '#FBFF93', '#C9CDFF', '#D3D3D3', '#E6C9FF'];
const shuffleColor = randomColor.sort(()=> Math.random() - 0.5);

let k = 0;
let count = 1;

const Contents = (props) => {

  //게시물 이미지 업로드

  const [imgUrl, setImgUrl] = useState(props.post.medias.length > 0 ? props.post.medias[0].url : defaultImg);

  // Image button (이전, 다음)

  const nextBtnHandler = () => {
    if( k < props.post.medias.length - 1) {
      k++
      count++
      setImgUrl(props.post.medias[k].url);
    }
  };

  const backBtnHandler = () => {
    if( k > 0 ) {
      k--
      count--
      setImgUrl(props.post.medias[k].url);
    }
  };

  //좋아요
  const [heart, setHeart] = useState(props.post.liked ? true : false); //좋아요를 했는지 여부에 대한 판단
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
  const viewTags = [];
  let i = 0;

  for( const workout of workouts) {
    const tag = {'name': workout, 'color': shuffleColor[i]};
    tags.push(tag);
    i++;
  }

  if (tags.length > 2) {
    viewTags.push(tags[0]);
    viewTags.push(tags[1]);
  }

  const postId = props.post.postId;

  // 좋아요 server 전송
  const heartData = (method) => {
    axios({
      method: method,
      url: `http://prod.healthiee.net/v1/posts/${postId}/like`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
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
        <img src={props.post.member.profileUrl ? props.post.member.profileUrl : defaultProfile} alt="profile_img" />
        </div>
        <div className={styles.profile_box}>
          <h1>{props.post.member.nickname}</h1>
          <div className={styles.profile_tags}>
            {viewTags.length > 0 ? viewTags.map(tag => <div className={styles.profile_tag} key={tag.name} style={{backgroundColor:`${tag.color}`}}>{tag.name}</div>) : tags.map(tag => <div className={styles.profile_tag} key={tag.name} style={{backgroundColor:`${tag.color}`}}>{tag.name}</div>)}
          </div>
          {viewTags.length > 0 && <p className={styles.tag_message}>태그 {tags.length - 2}개 더보기</p>}
        </div>
      </div>
      <div className={styles.icons}>
        <div className={styles.category}>
          {props.post.category && props.post.category.name}
        </div>
        <AttachFile className={styles.file_box}/>
        <div className={styles.heart_box} onClick={heartClickHandler}>
          <Heart className={heartStyle}/>
          <p>{props.post.likeCount}</p>
        </div>
      </div>
    </div>

    <div className={styles.content_img}>
      <div className={styles.img_count}>{`${count} / ${props.post.medias.length}`}</div>
      <div onClick={backBtnHandler} className={styles.back}><BackBtn/></div>
        <img src={imgUrl} alt="content_img" />
      <div onClick={nextBtnHandler} className={styles.next}><NextBtn/></div>
    </div>

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