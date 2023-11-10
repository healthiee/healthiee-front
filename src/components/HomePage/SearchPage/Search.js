import styles from './Search.module.css'
import {ReactComponent as Searchimg} from '../../../assets/images/search.svg';
import { Fragment, useState, useEffect } from 'react';

const dummy = ['오운완', '맛집', '멤버 모집', '장비', '운동 소식', '핫플레이스', '축구', '농구', '테니스']

const Search = (props) => {

  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isKeyword, setIsKeyword] = useState(false);
  const [checkBoxList, setCheckBoxList] = useState(dummy);

  const cancleButtonHandler = () => {
    props.onBackdrop();
  };

  const searchHandler = (event) => {
    event.preventDefault();

    console.log('checkedList', checkedList);
  };

  const keywordHandler = (event) => {
    setKeyword(event.target.value)
  }

  useEffect(()=> {
    if (keyword.trim().length === 0) {
      setIsKeyword(false);
      setCheckBoxList(dummy);
    } else {
      setIsKeyword(true);
      const data = dummy.filter(item => item.includes(keyword));
      setCheckBoxList(data);
    }
  },[keyword])

  //checkbox

  const checkedItemHandler = (value, check) => {
    
    if(check) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }

    if(!check) {
      setCheckedList(checkedList.filter(item => item !== value))
      return;
    }

  };

  const checkHandler = (event, value) => {
    checkedItemHandler(value, event.target.checked);
  };

  const allcheckHandler = () => {

    if(!isChecked) {
      setCheckedList(checkBoxList);
    } else {
      setCheckedList([]);
    }

    setIsChecked(!isChecked)
  }; 

  const allCheckStyle = isChecked ? `${styles.active}` : '';

  return(
    <Fragment>
    <div className={styles.backdrop} onClick={cancleButtonHandler}></div>

    <form onSubmit={searchHandler} className={styles.container}>
      <div>
        <Searchimg className={styles.icon}/>
        <input onChange={keywordHandler} className={styles.search} placeholder='보고 싶은 키워드 검색하기' type="text" />
      </div>

      <div className={styles.choose}>
        <button className={allCheckStyle} type='button' onClick={allcheckHandler}>전체 선택</button>
      </div>

      <div className={styles.checkboxs}>
        {checkBoxList.map((item, idx) => (
        <div className={styles.checkbox} key={idx}>
          <input type="checkbox" id={item} checked={checkedList.includes(item)} onChange={e => checkHandler(e, item)}/>
          <label htmlFor={item}>{item}</label>
        </div>
        ))}
      </div>

      <div className={styles.btns}>
        <button type='button' onClick={cancleButtonHandler}>취소하기</button>
        <button type='submit'>확인</button>
      </div>
    </form>
    </Fragment>
  )
};

export default Search;