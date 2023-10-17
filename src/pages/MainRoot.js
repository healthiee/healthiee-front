import { Outlet } from "react-router-dom";
import HomeNavigation from '../components/HomePage/HomeNavigation';
import styles from './MainRoot.module.css';

const MainRoot = () => {
  return(
    <div className={styles.container}>
      <main>
        <Outlet/>
      </main>
      <HomeNavigation/>
    </div>
  )
};

export default MainRoot;