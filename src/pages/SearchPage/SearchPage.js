import {ReactComponent as ArrowBack} from '../../assets/icons/ArrowBack_icon.svg';
import {ReactComponent as SearchIcon} from '../../assets/images/search.svg';
import { NavLink, Outlet } from "react-router-dom";
import styles from './SearchPage.module.css';
import { Fragment } from 'react';



const SearchPage = () => {
  return (
    <Fragment>
      <div className={styles.arrow}>
        <ArrowBack width='24px' height='24px'/>
      </div>

      <div className={styles.box_container}>
        <div className={styles.box}>
          <SearchIcon/>
          <p>healthiee</p>
        </div>
      </div>

    </Fragment>
  )
};

export default SearchPage;