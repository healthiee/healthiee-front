import styles from './Search.module.css';
import { useState } from 'react';
import axios from 'axios';
import {ReactComponent as SearchIcon} from '../../assets/images/search.svg';
import {ReactComponent as Tag} from '../../assets/images/tag.svg';

const Search = () => {

  const [info, setInfo] = useState('');

  const infoHandler = (event) => {
    setInfo(event.target.value);
  }

  const searchHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={searchHandler}>
        <div className={styles.input_box}>
          <div className={styles.icon}><SearchIcon/></div>
          <div className={styles.input}>
            <input type="text" onChange={infoHandler} placeholder='사람, 태그 , 정보 검색하기'/>
          </div>
          <div>
            <button className={styles.btn}>확인</button>
          </div>
        </div>
      </form>

      <div className={styles.tag}>
        <Tag/>
        <div className={styles.info}>{info}</div>
        <p>태그</p>
      </div>

      <div className={styles.tag}>
        <Tag/>
        <div className={styles.person}>healthiee</div>
        <p>사람</p>
      </div>

    </div>
  )
};

export default Search;