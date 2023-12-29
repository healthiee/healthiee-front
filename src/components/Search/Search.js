import styles from './Search.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ReactComponent as SearchIcon} from '../../assets/images/search.svg';
import {ReactComponent as Tag} from '../../assets/images/tag.svg';

const Search = () => {

  const [info, setInfo] = useState('');
  const [nickname, setNickName] = useState([]);
  
  const navigate = useNavigate();

  const infoHandler = (event) => {
    setInfo(event.target.value);

    if (event.target.value.length > 0) {
      axios.get(`http://prod.healthiee.net/v1/members?nickname=${event.target.value}`,{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
        }
      }).then(response => {
        setNickName(response.data.data.content);
      }).catch(error => {
        console.log(error);
      })
    }
  
  }

  const searchHandler = () => {
    if (info.length > 0) {
      navigate(`/result/${info}`);
    }
  }

  return (
    <div>
      <div className={styles.input_box}>
        <div className={styles.icon}><SearchIcon/></div>
        <div className={styles.input}>
          <input type="text" onChange={infoHandler} placeholder='사람, 태그 , 정보 검색하기'/>
        </div>
        <div>
          <button type='button' className={styles.btn} onClick={searchHandler}>확인</button>
        </div>
      </div>

      <div className={styles.tag}>
        <Tag/>
        <div className={styles.info}>{info}</div>
        <p>태그</p>
      </div>

      {info && nickname.map(name =>
        <Link to='/profile' key={name.memberId} className={styles.tag}>
          <Tag/>
          <div className={styles.person}>{name.nickname}</div>
          <p>사람</p>
        </Link>
      )}

    </div>
  )
};

export default Search;