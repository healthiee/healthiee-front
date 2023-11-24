import styles from './PostForm.module.css';
import {ReactComponent as ArrowBack} from '../../assets/icons/ArrowBack_icon.svg';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as Search} from '../../assets/images/search.svg';
import {ReactComponent as Close} from '../../assets/images/close.svg';
import {ReactComponent as AddBox} from '../../assets/images/addBox.svg';
import Kakko from './Kakao';

const PostForm = (props) => {

  const [tag, setTag] = useState('');
  const [exercises, setExercises] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [location, setLocation] = useState('');
  const textRef = useRef();

  // form : upload images

  // 이미지 상대경로 저장
  const addImagesHandler = (event) => {
    const imageLists = event.target.files;
    const imageUrlList = [...imgList];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlList.push(currentImageUrl);
    }

    setImgList(imageUrlList);
  }

  // x버튼 클릭 시 이미지 삭제
  const deleteImageHandler = (id) => {
    setImgList(imgList.filter((_, index) => index !== id))
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

  const locationHandler = (event) => {
    setLocation(event);
  };

  // form 제출
  
  const submitHandler = (event) => {
    event.preventDefault();


  };

  return(
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to='..'><ArrowBack width='24' height='24'/></Link>
      </div>

      <form className={styles.form_container} onSubmit={submitHandler}>
        <div className={styles.photo_container}>
          <div className={styles.photo_title}>
            <h1>사진등록</h1>
            <p>최대 8장까지 업로드할 수 있습니다.</p>
          </div>
          <div className={styles.imglist}>
            <label htmlFor="input-file" onChange={addImagesHandler}>
              <input hidden type="file" id='input-file' multiple/>
              <div className={styles.addbtn}>
                <AddBox width='24' height='24'/>
              </div>
            </label>

            <div className={styles.img}>
              {imgList.map((image, id) => (
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
          <textarea ref={textRef} name="bios" id="" cols="30" rows="10"></textarea>
        </div>

        <div className={styles.tag_container}>
          <h1>태그 등록 <span>(최대 5개)</span></h1>
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
          <Kakko onLocation={locationHandler}/>       
        </div>

        <div className={styles.btn}>
          <button type='submit'>게시글 등록</button>
        </div>
      </form>


    </div>
  )
};

export default PostForm;