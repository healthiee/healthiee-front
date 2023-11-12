import styles from './Contents.module.css';
import { ReactComponent as AttachFile } from '../../assets/images/attachFile.svg';
import { ReactComponent as Heart } from '../../assets/images/heart.svg';
import { useState} from 'react';

const Contents = (props) => {

  const [heart, setHeart] = useState(false);

  const heartClickHandler = () => {
    if (heart) {
      setHeart(false);
      props.post.love -= 1;
    } else {
      setHeart(true);
      props.post.love += 1;
    }
  };

  const heartStyle = heart ? styles.active : styles.heart;

  const showCommentPage = () => {
    props.onShowCommentPage();
  }

  return (
    <article className={styles.article}>
      <div className={styles.content_info}>
        <div className={styles.profile}>
          <div className={styles.profile_img}>
            <img src={props.post.profileImg} alt="profile_img" />
          </div>
          <div className={styles.profile_box}>
            <h1>{props.post.nickname}</h1>
            <div className={styles.profile_tags}>
              {props.post.tags.map(tag => <div className={styles.profile_tag} key={tag.name} style={{ backgroundColor: `${tag.color}` }}>{tag.name}</div>)}
            </div>
          </div>
        </div>

        <div className={styles.icons}>
          <AttachFile style={{ marginBottom: '10px' }} />
          <div onClick={heartClickHandler}>
            <Heart className={heartStyle} />
            <p>{props.post.love}</p>
          </div>
        </div>
      </div>

      <div className={styles.content_img}>
        <img src={props.post.postImg} alt="content_img" />
      </div>

      <div className={styles.comment}>
        <div className={styles.comment_head}>
          <h2>{props.post.created_at}</h2>
          <h2 onClick={showCommentPage} >
            댓글 {props.post.comments}개
          </h2>
        </div>
        <p>{props.post.body}</p>
        <div>
          
        </div>
      </div>
      
    </article>)
};

export default Contents;