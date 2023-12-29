import styles from './SearchPost.module.css'

const SearchPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
      <div className={styles.posts}></div>
    </div>
  )
};

export default SearchPost;

export function loader () {

}