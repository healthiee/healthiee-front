import styles from './PostForm.module.css';
import {ReactComponent as ArrowBack} from '../../assets/icons/ArrowBack_icon.svg';
import { useState, useRef } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import {ReactComponent as Search} from '../../assets/images/search.svg';
import {ReactComponent as Close} from '../../assets/images/close.svg';
import {ReactComponent as AddBox} from '../../assets/images/addBox.svg';
import Kakko from './Kakao';
import axios from 'axios';

const PostForm = (props) => {

  const categories = useLoaderData();
  const data = props.data;
  const defaultImg = [];
  const defaultTag = [];
  const defaultImgId = [];
  const defaultCategory = data ? data.category.categoryId.toString() ? data.category.categoryId.toString() : 'default' : 'default';

  // 이미지 불러오기

  if(data) {
    for(const img of data.medias) {
      const imgUrl = img.url;
      defaultImg.push(imgUrl);
      defaultImgId.push(img.id);
    }

    // 태그 불러오기
    const dataTag = data.hashtags;
    const randomColor = ['#FCADFF', '#FFE0E0', '#A7FFF5', '#DDFFD6', '#B1E7FF', '#FBFF93', '#C9CDFF', '#D3D3D3', '#E6C9FF'];

    for (const tag of dataTag) {
      const shuffleColor = randomColor.sort(()=> Math.random() - 0.5);
      defaultTag.push({name: tag, color: shuffleColor[Math.floor(Math.random())]})
    }
  }

  const [tag, setTag] = useState('');
  const [exercises, setExercises] = useState(defaultTag);
  const [showImgList, setShowImgList] = useState(defaultImg); // 이미지 미리보기
  const [imgList, setImgList] = useState([]); // 서버에 보내는 이미지
  const [imgId, setImgId] = useState(defaultImgId) 
  const [location, setLocation] = useState({});
  const [valid, setValid] = useState({
    imgValid : true,
    contentValid : true,
    hashtagsValid : true
  });
  const textRef = useRef();
  const [radioCheck, setRadioCheck] = useState(defaultCategory);
  const navigate = useNavigate();

  // form : radio box

  const radioCheckHandler = (event) => {
    console.log(event.target.id)
    setRadioCheck(event.target.id)
  }

  // form : upload images

  // 이미지 상대경로 저장
  const addImagesHandler = (event) => {
    const imageLists = event.target.files;
    const imageUrlList = [...showImgList];
    const imageFile = [...imgList];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlList.push(currentImageUrl);
      imageFile.push(imageLists[i]);
    }

    setImgList(imageFile);
    setShowImgList(imageUrlList);
    setImgId('images')
  }

  // x버튼 클릭 시 이미지 삭제
  const deleteImageHandler = (id) => {
    setShowImgList(showImgList.filter((_, index) => index !== id));
    setImgList(imgList.filter((_, index) => index !== id));
    imgId.splice(id,1)
  }

  // form : add tags

  const addTagHandler = (event) => {
    setTag(event.target.value);
  }

  const addTagButton = () => {

    if (tag.trim().length === 0) {
      return;
    }
    for (const exercise of exercises) {
      if (exercise.name === tag) {
        return;
      }
    }

    const randomColor = ['#FCADFF', '#FFE0E0', '#A7FFF5', '#DDFFD6', '#B1E7FF', '#FBFF93', '#C9CDFF', '#D3D3D3', '#E6C9FF'];
    
    const shuffleColor = randomColor.sort(()=> Math.random() - 0.5);

    setExercises([...exercises, {name: tag, color: shuffleColor[Math.floor(Math.random())]}]);
    setTag('');
  }

  const deleteTagHandler = (event) => {

    for (const exercise of exercises) {
      if (exercise.name === event.target.innerText ) {
        const upload = exercises.filter(data => {
          return data.name !== exercise.name;
        })
        setExercises(upload);
        setTag('');
        return
      }
    }
  }

  const tagButtonValid = exercises.length >= 5;

  // form : 위치정보 가져오기

  const locationHandler = (position, address) => {
    setLocation({'position' : position, 'address': address});
  };

  // form 제출
  
  const submitHandler = (event) => {
    event.preventDefault();

    // Required 판단

    const info = {...valid};

    if (imgId.length === 0) {
      info.imgValid = false;
    } else {
      info.imgValid = true;
    }

    if (!textRef.current.value) {
      info.contentValid = false;
    } else {
      info.contentValid = true;
    }

    if (exercises.length === 0) {
      info.hashtagsValid = false;
    } else {
      info.hashtagsValid = true;
    }

    if(imgId.length === 0 || textRef.current.value.trim().length === 0 || exercises.length === 0) {
      setValid(info);
      return
    };

    // Required 충족시 form 제출

    const workouts = [];

    for (const exercise of exercises) {
      const workout = exercise.name;
      workouts.push(workout);
    }

    let categoryId = '';

    if (categoryId !== 'default') {
      categoryId = Number(radioCheck);
    }


    //method에 따라 formData, url, contentType 유동적 변경

    const method = props.method;
    let formData = '';
    let url = '';
    let contentType = '';

    console.log(method)

    // method === post

    if (method === 'post') {
      url = 'http://prod.healthiee.net/v1/posts';
      contentType  = 'multipart/form-data';

      formData = new FormData();

      for (let i=0; i<imgList.length; i++) {
        formData.append('images', imgList[i])
      }

      const data = {
        'content' : textRef.current.value,
        'location' : {'latitude': location.position.lat, 'longitude': location.position.lng, 'addressName': location.address},
        'hashtags' : workouts,
        'categoryId' : categoryId,
      }

      formData.append('data', new Blob([JSON.stringify(data)], {
        type: "application/json"
      }))
    }

    // method === patch

    if(method === 'patch') {
      url = `http://prod.healthiee.net/v1/posts/${data.postId}`;
      contentType  = "application/json";

      formData = {
        'content' : textRef.current.value,
        'location' : {'latitude': location.position.lat, 'longitude': location.position.lng, 'addressName': location.address},
        'hashtags' : workouts,
        'mediaIds' : imgId,
        'categoryId' : categoryId,
      }
    }

    axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        'Content-Type' : contentType,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
      }
    }).then(response => {
      console.log(response.data);
      navigate('/');
    }).catch(error => {
      console.log('에러발생', error);
    })
  };

  // method === patch 일 경우 사진 추가 아이콘 숨김
  const method = props.method === 'patch';

  return(
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to='..'><ArrowBack width='24' height='24'/></Link>
      </div>

      <form className={styles.form_container} onSubmit={submitHandler}>

        <div className={styles.category_container}>
          <h1>카테고리</h1>
          <div className={styles.category_box}>
            <div className={radioCheck === 'default' ? `${styles.category} ${styles.active}` : styles.category}>
              <input hidden onChange={radioCheckHandler} type="radio" name='category' id='default'/>
              <label htmlFor='default'>카테고리 없음</label>
            </div>
            {categories.map(category => <div className={radioCheck === category.codeId.toString() ? `${styles.category} ${styles.active}` : styles.category} key={category.name}>
              <input hidden onChange={radioCheckHandler} type="radio" name='category' id={category.codeId}/>
              <label htmlFor={category.codeId}>{category.name}</label>
            </div>)}
          </div>
        </div>

        <div className={styles.photo_container}>
          <div className={styles.photo_title}>
            <h1>사진등록</h1>
            <p>최대 8장까지 업로드할 수 있습니다.</p>
          </div>
          {!valid.imgValid && <p style={{color: 'red'}}>이미지를 1장 이상 등록해주세요.</p>}
          <div className={styles.imglist}>
            {!method ? <label htmlFor="input-file" onChange={addImagesHandler}>
              <input hidden type="file" id='input-file' multiple/>
              <div className={styles.addbtn}>
                <AddBox width='24' height='24'/>
              </div>
            </label> : ''}

            <div className={styles.img}>
              {showImgList.map((image, id) => (
                <div className={styles.images} key={id}>
                  <img src={image} alt={id} />
                  <Close onClick={()=>deleteImageHandler(id)} className={styles.closebtn} width='20' height='20'/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.content_container}>
          <h1>게시글 작성</h1>
          {!valid.contentValid && <p style={{color: 'red'}}>게시글을 작성해주세요.</p>}
          <textarea ref={textRef} name="bios" id="" cols="30" rows="10" defaultValue={data ? data.content : ''}></textarea>
        </div>

        <div className={styles.tag_container}>
          <div className={styles.tag_title}>
            <h1>태그 등록 <span>(최대 5개)</span></h1>
            {!valid.hashtagsValid && <p style={{color: 'red'}}>태그를 한개 이상 등록해주세요.</p>}
          </div>
          <div className={styles.form_input_exercise}>
            <Search className={styles.search_icon}/>
            <input name="workouts" type="text" placeholder="관련 태그를 등록해주세요." className={styles.input_style} onChange={addTagHandler} value={tag}/>
            <button onClick={addTagButton} disabled={tagButtonValid} type="button">확인</button>
          </div>
          <div className={styles.tags}>
            {exercises.map(tag => <div key={tag.name} className={styles.tag} style={{backgroundColor:`${tag.color}`}} onClick={deleteTagHandler}>
              <p>{tag.name}</p>
              <Close width="10px" height="10px"/>
            </div>)}
          </div>
        </div>

        <div className={styles.location_container}>
          <h1>위치 등록</h1>
          <Kakko method={props.method} data={data} onLocation={locationHandler}/>       
        </div>

        <div className={styles.btn}>
          <button type='submit'>게시글 등록</button>
        </div>
      </form>


    </div>
  )
};

export default PostForm;

//카테고리 불러오기
export async function loader () {

  const response = await axios.get('http://prod.healthiee.net/v1/codes', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`,
    }
  })

  if(response.status !== 200) {
    return <p>response error</p>
  } else {
    return response.data.data;
  }
}