import styles from './Contents.module.css';
import {ReactComponent as AttachFile} from '../../assets/images/attachFile.svg';

const Contents = () => {
  return (
  <article>
    <div className={styles.content_info}>
      <div className={styles.profile}>
        <div className={styles.profile_img}></div>
        <div className={styles.profile_box}>
          <h1>nickname</h1>
          <div className={styles.profile_tags}>tags</div>
        </div>
      </div>
      <div className={styles.icons}>icons</div>
    </div>

    <div className={styles.content_img}>
      img
    </div>

    <div className={styles.comment}>
      <div className={styles.comment_head}>
        <h2>2023년 9월 21일</h2>
        <h2>댓글 4개</h2>
      </div>
      <p>오늘 운동도 끝!</p>
    </div>
  </article>)
};

export default Contents;