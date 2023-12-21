import styles from './RecommendPost.module.css';
import defalutImg from '../../assets/images/defaultImg.png'

const RecommendPost = () => {
  return (
    <div className={styles.box}>
      <div className={styles.photo}>
        <img src={defalutImg} alt='default' />
      </div>
      <div className={styles.profile}>
        <div></div>
        <p>
          132_ddo
        </p>
      </div>
    </div>
  )
}

export default RecommendPost;