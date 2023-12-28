import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from './ProfilePage.module.css';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import {ReactComponent as Menu} from '../../assets/images/menu.svg';
import {ReactComponent as Description} from '../../assets/images/description.svg';
import {ReactComponent as EventAvailable} from '../../assets/images/eventAvailable.svg';
import {ReactComponent as BadgeLevel1} from '../../assets/images/BadgeIllustration/badgeLevel1.svg';
import {ReactComponent as BadgeLevel2} from '../../assets/images/BadgeIllustration/badgeLevel2.svg';
import {ReactComponent as BadgeLevel3} from '../../assets/images/BadgeIllustration/badgeLevel3.svg';
import {ReactComponent as BadgeLevel4} from '../../assets/images/BadgeIllustration/badgeLevel4.svg';
import {ReactComponent as BadgeLevel5} from '../../assets/images/BadgeIllustration/badgeLevel5.svg';
import defaultProfile from '../../assets/images/defaultProfile.png';
import Setting from './SettingPage/Setting';
import api from "../../utils/instance";

const Badge1 = styled(BadgeLevel1)`
  position: absolute;
  width: 53px;
  height: 57px;
  margin: 44px 0 0 13px;
`
const Badge2 = styled(BadgeLevel2)`
  position: absolute;
  width: 53px;
  height: 57px;
  margin: 44px 0 0 13px;
`
const Badge3 = styled(BadgeLevel3)`
  position: absolute;
  margin-top: 30px;
`
const Badge4 = styled(BadgeLevel4)`
  position: absolute;
  margin-top: 30px;
`
const Badge5 = styled(BadgeLevel5)`
  position: absolute;
  margin-top: 30px;
`
const profileDummy = {
  profileimg: defaultProfile,
  follower: 657,
  following: 343,
  nickname: 'chorong_2',
  name: '초롱이',
  body: '헬띠 화이팅',
  tags: [{name: '크로스핏', color: '#FCADFF'}, 
  {name: '테니스', color: '#FFE0E0'}, 
  {name: '웨이트', color: '#B1E7FF'}, 
  {name: '축구', color: '#D3D3D3'}, 
  {name: '필라테스', color: '#C9CDFF'}]
};

const ForthPage = () => {

  const [setting, setSetting] = useState(false);
  const navigate = useNavigate();
  const [totalWorkoutCount, setTotalWorkoutCount] = useState(0);

  const settingHandler = () => {
    setSetting(true);
  }

  const closePopup = () => {
    setSetting(false);
  }

  const activeStyle = ({isActive}) => isActive ? `${styles.nav_icon} ${styles.active}` : styles.nav_icon;

  const profileEditHandler = () => {
    navigate('/editprofile')
  }

  useEffect(() => {
    const fetchTotalWorkoutCount = async () => {
      try {
        const res = await api.get('http://prod.healthiee.net/v1/workouts', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        })
        setTotalWorkoutCount(res.data.data.totalCount);
      } catch (err) {
        console.log(err);
      }
    }

    fetchTotalWorkoutCount();
  }, [])

  const Badges = () => {
    if (totalWorkoutCount <= 10) {
      return <Badge1 />;
    } else if (totalWorkoutCount <= 30) {
      return <Badge2 />;
    } else if (totalWorkoutCount <= 100) {
      return <Badge3 />;
    } else if (totalWorkoutCount <= 365) {
      return <Badge4 />;
    } else {
      return <Badge5 />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <div className={styles.header}>
          <h1>{profileDummy.nickname}</h1>
          <div><Menu onClick={settingHandler} style={{cursor:'pointer'}}/></div>
          {setting && <Setting onClose={closePopup}/>}
        </div>

        <div className={styles.profile}>
          <div className={styles.profile_img}>
            {Badges()}
            <img src={profileDummy.profileimg} alt="profile_img" />
          </div>
          <div className={styles.follow}>
            <p>{profileDummy.follower}</p>
            <p>팔로워</p>
          </div>
          <div className={styles.follow}>
            <p>{profileDummy.following}</p>
            <p>팔로잉</p>
          </div>
        </div>

        <div className={styles.profile_info}>
          <h3>{profileDummy.name}</h3>
          <p>{profileDummy.body}</p>
        </div>

        <div className={styles.profile_tags}>
          {profileDummy.tags.map(tag => <div className={styles.tag} style={{backgroundColor:`${tag.color}`}}>{tag.name}</div>)}
        </div>

        <div className={styles.profile_btn}>
          <button onClick={profileEditHandler}>프로필 편집</button>
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

export default ForthPage;