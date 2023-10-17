import { Link } from "react-router-dom";
import { Fragment } from "react";
import styles from './HomeNavigaion.module.css';
import {ReactComponent as Home} from '../../assets/images/home.svg';
import {ReactComponent as Location} from '../../assets/images/location.svg';
import {ReactComponent as Person} from '../../assets/images/person.svg';
import {ReactComponent as PostAdd} from '../../assets/images/postAdd.svg';

const HomeNavigation = () => {
  return(
    <Fragment>
      <div className={styles.nav_icon}>
        <Link to='first'>a</Link>
      </div>
      <div className={styles.nav_icon}>
        <Link to='second'><Location/></Link>
      </div>
      <div className={styles.nav_icon}>
        <Link to=''><Home/></Link>
      </div>
      <div className={styles.nav_icon}>
        <Link to='third'><PostAdd/></Link>
      </div>
      <div className={styles.nav_icon}>
        <Link to='forth'><Person/></Link>
      </div>
    </Fragment>
  )
};

export default HomeNavigation;