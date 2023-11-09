import styles from './Home.module.css';
import { Fragment, useState, useEffect, useRef } from 'react';
import { ReactComponent as Tune } from '../../assets/images/tune.svg';
import { ReactComponent as Notification } from '../../assets/images/notification.svg';
import logo from '../../assets/images/logo.png';
import Contents from './Contents';
import NotificationPopup from '../../pages/Notification';

const Home = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const swipeRef = useRef(null);

  const showNotification = () => {
    setPopupVisible(true);
  };
  const showHomePage = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
  swipeRef.current.classList.toggle(styles.showNotificaton) 
  }, [popupVisible]);

  return (
    <Fragment>
      <div className={styles.NotificationPopup} ref={swipeRef}>
        {popupVisible && <NotificationPopup onClose={showHomePage} />}
      </div>

      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.notifiaction}>
          <Notification onClick={showNotification} />
        </div>
      </header>

      <div className={styles.tune}>
        <Tune />
      </div>

      <div className={styles.contents}>
        <Contents />
        <Contents />
        <Contents />
      </div>
    </Fragment>
  );
};

export default Home;