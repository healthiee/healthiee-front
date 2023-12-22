import styles from './Post.module.css';
import { useRouteLoaderData, Link, useParams } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import defaultProfile from '../../../assets/images/defaultProfile.png';
import defaultImg from '../../../assets/images/defaultImg.png';
import {ReactComponent as AttachFile} from '../../../assets/images/attachFile.svg';
import {ReactComponent as Heart} from '../../../assets/images/heart.svg';
import {ReactComponent as ArrowBack} from '../../../assets/icons/ArrowBack_icon.svg';
import {ReactComponent as Menu} from '../../../assets/images/menu.svg';
import Popup from './Popup';

const randomColor = ['#FCADFF', '#FFE0E0', '#A7FFF5', '#DDFFD6', '#B1E7FF', '#FBFF93', '#C9CDFF', '#D3D3D3', '#E6C9FF'];
const shuffleColor = randomColor.sort(()=> Math.random() - 0.5);

const Post = () => {
  
  const [popup, setPopup] = useState(false);
  const loaderdata = useRouteLoaderData('post-detail');
  const data = loaderdata[0]
  const [heart, setHeart] = useState(data.liked? true : false);

  const params = useParams();

  //팝업창
  const popupHandler = () => {
    if(!popup) {
      setPopup(true);
    } else {
      setPopup(false);
    }
  };

  //좋아요
  const heartClickHandler = () => {
    if (heart) {
      setHeart(false);
      data.likeCount -= 1;
      heartData('DELETE');
    } else {
      setHeart(true);
      data.likeCount += 1;
      heartData('POST');
    }
  };

  // tag color 
  const workouts = data.hashtags;
  const tags = [];
  let i = 0;

  for( const workout of workouts) {
    const tag = {'name': workout, 'color': shuffleColor[i]};
    tags.push(tag);
    i++;
  }

  //params로 대체
  const postId = params.id;

  // 좋아요 server 전송
  const heartData = (method) => {
    axios({
      method: method,
      url: `http://prod.healthiee.net/v1/posts/${postId}/like`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      }
    }).then(response => {
      console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }

  const heartStyle = heart ? styles.active : styles.heart;

  return(
    <div className={styles.container}>

      {popup && <Popup postId={data.postId} onPopup={setPopup}/>}

      <div className={styles.arrow}>
        <Link to='..'><ArrowBack/></Link>
        <div style={{cursor:'pointer'}}><Menu onClick={popupHandler}/></div>
      </div>

      <div className={styles.content_info}>
        <div className={styles.profile}>
          <div className={styles.profile_img}>
          <img src={defaultProfile} alt="profile_img" />
          </div>
          <div className={styles.profile_box}>
            <h1>{data.member.nickname}</h1>
            <div className={styles.profile_tags}>
              {tags.map(tag => <div className={styles.profile_tag} key={tag.name} style={{backgroundColor:`${tag.color}`}}>{tag.name}</div>)}
            </div>
          </div>
        </div>
        <div className={styles.icons}>
          <AttachFile style={{marginBottom:'10px'}}/>
          <div onClick={heartClickHandler}>
            <Heart className={heartStyle}/>
            <p>{data.likeCount}</p>
          </div>
        </div>
      </div>

      <div className={styles.content_img}>
        <img src={defaultImg} alt="content_img" />
      </div>

      <div className={styles.content}>
        {data.content}
      </div>

    </div>
  )
};

export default Post;

export async function loader ({params}) {

  const id = params.id;

  const response = await axios.get('http://prod.healthiee.net/v1/posts',{
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      }
    })

  if(response.status !== 200) {
    return <p>response error</p>
  } else {
    const responseArray = response.data.data.content.filter(post => post.postId === id)
    return responseArray;
  }
};