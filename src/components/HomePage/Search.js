import styles from './Search.module.css'
import {ReactComponent as Searchimg} from '../../assets/images/search.svg';

const Search = (props) => {

  const cancleButtonHandler = () => {
    props.onBackdrop();
  };

  const searchHandelr = (event) => {
    event.preventDefault();
  }

  return(
    <div className={styles.backdrop} onClick={cancleButtonHandler}>
      <form onSubmit={searchHandelr} className={styles.container}>
        <div>
          <Searchimg className={styles.icon}/>
          <input className={styles.search} placeholder='보고 싶은 키워드 검색하기' type="text" />
        </div>
        <div className={styles.choose}>
          <button type='button'>전체 선택</button>
        </div>

        <div className={styles.checkbox}>
          <label><input type="checkbox" name='exercises'/>오운완</label>
          <label><input type="checkbox" name='exercises'/>오운완</label>
          <label><input type="checkbox" name='exercises'/>오운완</label>
        </div>

        <div className={styles.btns}>
          <button type='button' onClick={cancleButtonHandler}>취소하기</button>
          <button type='submit'>확인</button>
        </div>
      </form>
    </div>
  )
};

export default Search;