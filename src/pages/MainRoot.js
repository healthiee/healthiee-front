import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import HomeNavigation from '../components/HomePage/HomeNavigation';
import styles from './MainRoot.module.css';

const MainRoot = () => {
  return(
    <Fragment>
      <main>
        <Outlet/>
      </main>
      <div className={styles.nav_back}>
        <nav>
          <HomeNavigation/>
        </nav>
      </div>
    </Fragment>
  )
};

export default MainRoot;