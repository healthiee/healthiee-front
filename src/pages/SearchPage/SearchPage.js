import {ReactComponent as ArrowBack} from '../../assets/icons/ArrowBack_icon.svg';
import {ReactComponent as SearchIcon} from '../../assets/images/search.svg';
import {ReactComponent as Person} from '../../assets/images/person.svg';
import {ReactComponent as Description} from '../../assets/images/description.svg';
import { NavLink, Outlet, Link, useParams, useNavigate } from "react-router-dom";
import styles from './SearchPage.module.css';
import { Fragment, useState } from 'react';



const SearchPage = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState('');

  const searchHandler = () => {
    if(info.length === 0) {
      return
    }
    navigate(`/result/${info}`);
  }

  const inputHandler = (event) => {
    setInfo(event.target.value);
  }

  const activeStyle = ({isActive}) => isActive ? `${styles.nav_icon} ${styles.active}` : styles.nav_icon;

  return (
    <Fragment>
      <Link to='/search' className={styles.arrow}>
        <ArrowBack width='24px' height='24px'/>
      </Link>

      <div className={styles.input_box}>
        <div className={styles.icon}><SearchIcon/></div>
        <div className={styles.input}>
          <input type="text" placeholder={params.nickname} onChange={inputHandler}/>
        </div>
        <div>
          <button type='button' onClick={searchHandler} className={styles.btn}>확인</button>
        </div>
      </div>

      <div className={styles.nav}>
        <div>
          <NavLink to={`/result/${params.nickname}`} className={activeStyle} end><Person/></NavLink>
        </div>
        <div>
          <NavLink to={`/result/${params.nickname}/posts`} className={activeStyle}><Description/></NavLink>
        </div>
      </div>

      <div>
        <Outlet/>
      </div>
    </Fragment>
  )
};

export default SearchPage;