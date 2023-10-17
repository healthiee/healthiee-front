import styles from './Home.module.css';
import { Fragment } from 'react';
import {ReactComponent as Tune} from '../../assets/images/tune.svg';
import {ReactComponent as Notification} from '../../assets/images/notification.svg';
import logo from '../../assets/images/logo.png'
import Contents from './Contents';

const Home  = () => {
  return(
    <Fragment>
      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <Notification/>
      </header>

      <div className={styles.tune}>
        <Tune/>
      </div>

      <div className={styles.contents}>
        <Contents/>
        <Contents/>
        <Contents/>
      </div>
    </Fragment>
  )
};

export default Home;