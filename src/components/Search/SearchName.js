import styles from './SearchName.module.css'

const SearchName = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img}></div>
      <div className={styles.name}>name</div>
      <p>사람</p>
    </div>
  )
};

export default SearchName;

export function loader () {

}