import { Fragment, useState, useEffect, useRef } from "react";
import styles from './SearchTab.module.css'
import logo from '../../assets/images/logo.png'
import {ReactComponent as Notification} from '../../assets/images/notification.svg';
import NotificationPopup from '../Notification';
import Search from '../../components/Search/Search';

const SearchTab = () => {

  const [popupVisible, setPopupVisible] = useState(false);
  const swipeRef = useRef(null);

  // Notification Modal
  const showNotification = () => {
    setPopupVisible(true);
  };

  const closeNotification = () => {
    swipeRef.current.classList.toggle(styles.showNotificaton);
    setTimeout(() => {
      setPopupVisible(false);
    }, 500);
  };
  
  useEffect(() => {
  swipeRef.current.classList.toggle(styles.showNotification, popupVisible) 
  }, [popupVisible]);

  return (
    <Fragment>
      <div className={styles.notificationPopup} ref={swipeRef}>
        {popupVisible && <NotificationPopup onClose={closeNotification} />}
      </div>

      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.notifiaction}>
          <Notification onClick={showNotification} />
        </div>
      </header>

      <Search/>
    </Fragment>
  )
};

export default SearchTab;