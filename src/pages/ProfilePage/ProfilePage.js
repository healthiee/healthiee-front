import { NavLink, Outlet, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import styles from './ProfilePage.module.css';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import { ReactComponent as Menu } from '../../assets/images/menu.svg';
import { ReactComponent as Description } from '../../assets/images/description.svg';
import { ReactComponent as EventAvailable } from '../../assets/images/eventAvailable.svg';
import { ReactComponent as BadgeLevel1 } from '../../assets/images/BadgeIllustration/badgeLevel1.svg';
import { ReactComponent as BadgeLevel2 } from '../../assets/images/BadgeIllustration/badgeLevel2.svg';
import { ReactComponent as BadgeLevel3 } from '../../assets/images/BadgeIllustration/badgeLevel3.svg';
import { ReactComponent as BadgeLevel4 } from '../../assets/images/BadgeIllustration/badgeLevel4.svg';
import { ReactComponent as BadgeLevel5 } from '../../assets/images/BadgeIllustration/badgeLevel5.svg';
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

const ForthPage = () => {

  const [setting, setSetting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userPostsData = useLoaderData().userPostsData;
  const memberInfoData = useLoaderData().memberInfoData;
  const [memberInfo, setMemberInfo] = useState(memberInfoData);

  const randomColor = ['#FCADFF', '#FFE0E0', '#A7FFF5', '#DDFFD6', '#B1E7FF', '#FBFF93', '#C9CDFF', '#D3D3D3', '#E6C9FF'];

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

  const Badges = () => {
    if (userPostsData <= 10) {
      return <Badge1 />;
    } else if (userPostsData <= 30) {
      return <Badge2 />;
    } else if (userPostsData <= 100) {
      return <Badge3 />;
    } else if (userPostsData <= 365) {
      return <Badge4 />;
    } else {
      return <Badge5 />;
    }
  };

  useEffect(() => {
    if (location.state?.updated) {
      loader().then(data => {
        setMemberInfo(data.memberInfoData);
      });
    }
  }, [location.state]);

  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <div className={styles.header}>
          <h1>{memberInfo.nickname}</h1>
          <div><Menu onClick={settingHandler} style={{ cursor: 'pointer' }} /></div>
          {setting && <Setting onClose={closePopup} />}
        </div>

        <div className={styles.profile}>
          <div className={styles.profile_img}>
            {Badges()}
            <img src={memberInfo.profileUrl} alt="profile_img" />
          </div>
          <div className={styles.follow}>
            <p>{memberInfo.followerCount}</p>
            <p>팔로워</p>
          </div>
          <div className={styles.follow}>
            <p>{memberInfo.followingCount}</p>
            <p>팔로잉</p>
          </div>
        </div>

        <div className={styles.profile_info}>
          <h3>{memberInfo.name}</h3>
          <p>{memberInfo.bio}</p>
        </div>

        <div className={styles.profile_tags}>
          {memberInfo.workouts && memberInfo.workouts.map(tag => <div className={styles.tag} style={{ backgroundColor: randomColor[Math.floor(Math.random() * randomColor.length)] }}>{tag}</div>)}
        </div>

        <div className={styles.profile_btn}>
          <button onClick={profileEditHandler}>프로필 편집</button>
        </div>
      </div>

      <div className={styles.profile_nav}>
        <div>
          <NavLink to='/profile' className={activeStyle} end><Description /></NavLink>
        </div>
        <div>
          <NavLink to='/profile/event' className={activeStyle}><EventAvailable /></NavLink>
        </div>
      </div>

      <div className={styles.contents}>
        <Outlet />
      </div>
    </div>
  )
};

export default ForthPage;

export async function loader() {
  try {
    //MemberInfo Data
    const memberId = '736cf454-2818-4fd9-a077-300b6f5efe64';
    const memberRes = await api.get(`http://prod.healthiee.net/v1/members/${memberId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
      }
    });
    const memberInfoData = memberRes.data.data;

    //UserPosts Data
    const userPostsRes = await api.get('http://prod.healthiee.net/v1/workouts', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
      }
    })
    const userPostsData = userPostsRes.data.data.totalCount;
    return { memberInfoData, userPostsData };
  } catch (err) {
    console.error(err);
  }
};