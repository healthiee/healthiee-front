import { NavLink } from "react-router-dom";
import styles from './HomeNavigaion.module.css';
import {ReactComponent as Home} from '../../assets/images/home.svg';
import {ReactComponent as Location} from '../../assets/images/location.svg';
import {ReactComponent as Person} from '../../assets/images/person.svg';
import {ReactComponent as PostAdd} from '../../assets/images/postAdd.svg';
import {ReactComponent as Search} from '../../assets/images/search.svg';

const HomeNavigation = () => {

  const activeStyle = ({isActive}) => isActive ? styles.active : '';

  return(
    <nav className={styles.nav}>
      <div className={styles.nav_icon}>
        <NavLink to='first' className={activeStyle}><Search/></NavLink>
      </div>
      <div className={styles.nav_icon}>
        <NavLink to='second' className={activeStyle}><Location/></NavLink>
      </div>
      <div className={styles.nav_icon}>
        <NavLink to='/' className={activeStyle} end><Home/></NavLink>
      </div>
      <div className={styles.nav_icon}>
        <NavLink to='createPost' className={activeStyle}><PostAdd/></NavLink>
      </div>
      <div className={styles.nav_icon}>
        <NavLink to='profile' className={activeStyle}><Person/></NavLink>
      </div>
    </nav>
  )
};

export default HomeNavigation;