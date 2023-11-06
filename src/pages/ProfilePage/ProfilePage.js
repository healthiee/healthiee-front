import { NavLink, Outlet } from "react-router-dom";
import styles from './ProfilePage.module.css';
import {ReactComponent as Menu} from '../../assets/images/menu.svg';
import {ReactComponent as Description} from '../../assets/images/description.svg';
import {ReactComponent as EventAvailable} from '../../assets/images/eventAvailable.svg';

const ProfilePage = () => {

  const activeStyle = ({isActive}) => isActive ? `${styles.nav_icon} ${styles.active}` : styles.nav_icon;

  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <div className={styles.header}>
          <h1>nickname</h1>
          <div><Menu/></div>
        </div>

        <div className={styles.profile}>
          <div className={styles.profile_img}></div>
          <div className={styles.follow}>
            <p>657</p>
            <p>팔로워</p>
          </div>
          <div className={styles.follow}>
            <p>343</p>
            <p>팔로잉</p>
          </div>
        </div>

        <div className={styles.profile_info}>
          <h3>초롱이</h3>
          <p>헬따 화이팅</p>
        </div>

        <div className={styles.profile_tags}>
          tag
        </div>

        <div className={styles.profile_btn}>
          <button>프로필 편집</button>
        </div>
      </div>

      <div className={styles.profile_nav}>
        <div>
          <NavLink to='/profile' className={activeStyle} end><Description/></NavLink>
        </div>
        <div>
          <NavLink to='/profile/event' className={activeStyle}><EventAvailable/></NavLink>
        </div>
      </div>

      <div className={styles.contents}>
        <Outlet/>
      </div>
    </div>
  )
};

export default ProfilePage;