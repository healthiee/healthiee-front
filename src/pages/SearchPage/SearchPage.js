import {ReactComponent as ArrowBack} from '../../assets/icons/ArrowBack_icon.svg';
import {ReactComponent as SearchIcon} from '../../assets/images/search.svg';
import {ReactComponent as Person} from '../../assets/images/person.svg';
import {ReactComponent as Description} from '../../assets/images/description.svg';
import { NavLink, Outlet, Link, useParams } from "react-router-dom";
import styles from './SearchPage.module.css';
import { Fragment } from 'react';



const SearchPage = () => {

  const params = useParams();

  const searchHandler = (event) => {
    event.preventDefault();
  }

  const activeStyle = ({isActive}) => isActive ? `${styles.nav_icon} ${styles.active}` : styles.nav_icon;

  return (
    <Fragment>
      <Link to='/search' className={styles.arrow}>
        <ArrowBack width='24px' height='24px'/>
      </Link>

      <form onSubmit={searchHandler}>
        <div className={styles.input_box}>
          <div className={styles.icon}><SearchIcon/></div>
          <div className={styles.input}>
            <input type="text" placeholder='healthiee'/>
          </div>
          <div>
            <button className={styles.btn}>확인</button>
          </div>
        </div>
      </form>

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