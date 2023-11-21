import React, {useState, useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './CreateAccount.module.css';
import useAccountInput from "../../hooks/use-accountInput";
import axios from "axios";

//img
import {ReactComponent as BackArrow} from '../../assets/images/backArrow.svg';
import {ReactComponent as Close} from '../../assets/images/close.svg';
import {ReactComponent as Done} from '../../assets/images/done.svg';
import {ReactComponent as Search} from '../../assets/images/search.svg';
import defaultProfile from '../../assets/images/defaultProfile.png';



const SignupPage = ()=> {
  const location = useLocation();
  const [code, setCode] = useState(location.state?.code);
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const [tag, setTag] = useState('');
  const [exercises, setExercises] = useState([]);
  const presentationRef = useRef();
  const navigate = useNavigate();

  // form : name & nickname

  const {enterValue:inputName, error:nameError, inputHandler:inputNameHandler, blurHandler:blurNameHandler, enterValid:nameValid,reset:nameReset } = useAccountInput(value => value.trim().length >= 2);

  const {enterValue:inputNickname, error:nicknameError, inputNicknameHandler, blurHandler:blurNicknameHandler,enterValid:nicknameValid, reset:nicknameReset, doubleCheck, setDoubleCheck, invalid, setInvalid} = useAccountInput(value => value.trim().length >= 4);

  const clearNameHandler = () => {
    nameReset();
  }

  const clearNickHandler = () => {
    nicknameReset();
    setInvalid(false);
  }

  // form : nickname double check

  const doubleCheckHandler = () => {
    console.log('double')

    axios.get(`http://prod.healthiee.net/v1/members/${inputNickname}/check`)
    .then(
      response => {
        console.log(response);

        if(response.status === 200) {
          setDoubleCheck(true);
          return
        } else {
          setInvalid(true);
          return
        }

      }
    ).catch(error => {
      console.log(error);
    })
  }

  // form : profile img

  const saveImgFile = () => {

    try {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
      setImgFile(reader.result);
    };
    } catch {
      return
    }
  };

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

  // form : next button activate

  const buttonValid = !nameError && !nicknameError && nameValid && nicknameValid && doubleCheck;

  // form : from submit

  const submitHandler = (event) => {
    
    console.log('submit')
    event.preventDefault();

    if(!nameValid || !nicknameValid) {
      return
    }

    const workouts = [];

    for (const exercise of exercises) {
      const workout = exercise.name;
      workouts.push(workout);
    }

    const data = {
      'code' : code,
      'name' : inputName,
      'nickname' : inputNickname,
      'bio' : presentationRef.current.value,
      'workouts' : workouts
    }

    console.log(data);
    
    const formdata = new FormData();
    formdata.append('data',  new Blob([JSON.stringify(data)], {
      type: "application/json"
  }))

    axios.post('http://prod.healthiee.net/v1/auth/register', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log('에러발생', error);
    })

    //error 발생시 return
    navigate('/');
  }

  //button valid style

  const nameStyleControl = nameError ? `${styles.input_style} ${styles.invalid}` : styles.input_style

  const nicknameStyleControl = nicknameError ? `${styles.input_style} ${styles.invalid}` : doubleCheck ? `${styles.input_style} ${styles.valid}` : styles.input_style

  return(
    <div className={styles.container}>

      <div className={styles.back}><BackArrow/></div>

      <div className={styles.title}>
        <h1>계정 생성</h1>
        <p>*는 필수입력 항목입니다.</p>
      </div>

      <form className={styles.form_container} onSubmit={submitHandler}>
        <div className={styles.form_input}>
          <label htmlFor="name">이름 <span className={styles.star}>*</span></label>
          <div className={styles.form_input_nick}>
            <input id="name" name="name" onChange={inputNameHandler} onBlur={blurNameHandler} type="text" value={inputName} className={nameStyleControl} placeholder="이름을 입력해주세요"/>
            {inputName && <button type="button" onClick={clearNameHandler}><Close width="24px" height="24px"/></button>}
          </div>
        </div>

        <div className={styles.form_input}>
          <label htmlFor="nickname">닉네임 <span className={styles.star}>*</span></label>
          <div className={styles.form_input_nick}>
            <input id="nickname" name="nickname" onChange={inputNicknameHandler} onBlur={blurNicknameHandler} type="text" value={inputNickname} className={nicknameStyleControl} placeholder="20자 이하의 영문 대소문자, 숫자, 언더바"/>
            {inputNickname && !doubleCheck&& <button type="button" onClick={clearNickHandler}><Close width="24px" height="24px"/></button>}
            {inputNickname && doubleCheck && <span><Done/></span>}
          </div>
          {invalid && <p>이미 사용 중인 닉네임입니다.</p>}

          <div className={styles.button_container}>
            <button disabled={!nicknameValid} className={styles.checkbutton} type="button" onClick={doubleCheckHandler}>중복 확인</button>
          </div>
        </div>

        <h2>프로필 사진</h2>

        <div className={styles.profile_container}>
          <input name="image" className={styles.profile_input} type="file" accept="image/*" id="profileimg" onChange={saveImgFile} ref={imgRef}/>
          {imgFile ? <img src={imgFile} alt="profile img"/> : <img src={defaultProfile} alt="profile img" className={styles.defaultimg}/>}
          <div className={styles.label_container}>
            <label htmlFor="profileimg" className={styles.profile_label}>사진 등록하기</label>
          </div>
        </div>

        <h2>지금 하고 있는 운동을 알려주세요. (최대 5개)</h2>
        <div className={styles.form_input_exercise}>
          <Search className={styles.search_icon}/>
          <input name="workouts" type="text" placeholder="내가 하는 운동 검색하기" className={styles.input_style} onChange={addTagHandler} value={tag}/>
          <button onClick={addTagButton} disabled={tagButtonValid} type="button">확인</button>
        </div>
        <div className={styles.tags}>
          {exercises.map(tag => <div key={tag.name} className={styles.tag} style={{backgroundColor:`${tag.color}`}} onClick={deleteTagHandler}>
            <p>{tag.name}</p>
            <Close width="10px" height="10px"/>
          </div>)}
        </div>

        <div className={styles.presentation}>
          <h2>자기소개</h2>
          <textarea name="bio" cols="30" rows="10" placeholder="간단하게 자신을 소개해주세요.(50자이내)" ref={presentationRef}></textarea>
        </div>
        <button disabled={!buttonValid} className={styles.next_button} type="submit">다음</button>
      </form>
    </div>
  )
};

export default SignupPage;