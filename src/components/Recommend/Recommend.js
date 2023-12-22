import styles from './Recommend.module.css';
import RecommendPost from './RecommendPost';
import { Fragment } from 'react';

const Recommend = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.line}></div>
          <div className={styles.title}>이번주 핫게시물</div>
        </div>
        <div className={styles.post_box}>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.line}></div>
          <div className={styles.title} style={{backgroundColor:'#FBFF93', borderColor:'#F8FF36'}}>핫 플레이스</div>
        </div>
        <div className={styles.post_box}>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.line}></div>
          <div className={styles.title} style={{backgroundColor:'#B1E7FF', borderColor:'#7EAAFF'}}>동네 맛집</div>
        </div>
        <div className={styles.post_box}>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.line}></div>
          <div className={styles.title} style={{backgroundColor:'#FFE0E0', borderColor:'#FD9A9A'}}>추천 팔로워</div>
        </div>
        <div className={styles.post_box}>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
          <RecommendPost/>
        </div>
      </div>
    </Fragment>
  )
}

export default Recommend;