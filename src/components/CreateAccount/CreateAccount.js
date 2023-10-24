import React, {useState, useRef} from "react";
import styles from './CreateAccount.module.css';
import useAccountInput from "../../hooks/use-accountInput";

//img
import {ReactComponent as BackArrow} from '../../assets/images/backArrow.svg';
import {ReactComponent as DefaultProfile} from '../../assets/images/defaultProfile.svg';
import {ReactComponent as Close} from '../../assets/images/close.svg';
import {ReactComponent as Done} from '../../assets/images/done.svg';
import {ReactComponent as Search} from '../../assets/images/search.svg';




const SignupPage = ()=> {

  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const [tag, setTag] = useState('');
  const [exercises, setExercises] = useState([]);
  const presentationRef = useRef();

  // const randomColor = "#"+(parseInt(Math.random()*0xffffff)).toString(16);

  // form : name & nickname

  const {enterValue:inputName, error:nameError, inputHandler:inputNameHandler, blurHandler:blurNameHandler, enterValid:nameValid,reset:nameReset } = useAccountInput(value => value.trim().length >= 2);

  const {enterValue:inputNickname, error:nicknameError, inputHandler:inputNicknameHandler, blurHandler:blurNicknameHandler,enterValid:nicknameValid, reset:NicknameReset, setEnterValue:nickNameValue, doubleCheck, setDoubleCheck } = useAccountInput(value => value.trim().length >= 4);

  const clearNickHandelr = () => {
    nickNameValue('');
  }

  // form : nickname double check

  const doubleCheckHandler = () => {
    //if true
    setDoubleCheck(true);
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
    setExercises([...exercises, {name: tag, color: "#"+(parseInt(Math.random()*0xffffff)).toString(16)}]);
    setTag('');
  }

  const deleteTagHandler = (event) => {
    console.log(event);

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
    event.preventDefault();

    if(!nameValid || !nicknameValid) {
      return
    }

    console.log(inputName);
    console.log(inputNickname);
    console.log(exercises);
    console.log(presentationRef.current.value);
    nameReset();
    NicknameReset();
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
          <input id="name" onChange={inputNameHandler} onBlur={blurNameHandler} type="text" value={inputName} className={nameStyleControl} placeholder="이름을 입력해주세요."/>
        </div>

        <div className={styles.form_input}>
          <label htmlFor="nickname">닉네임 <span className={styles.star}>*</span></label>
          <div className={styles.form_input_nick}>
            <input id="nickname" onChange={inputNicknameHandler} onBlur={blurNicknameHandler} type="text" value={inputNickname} className={nicknameStyleControl} placeholder="20자 이하의 영문 대소문자, 숫자, 언더바"/>
            {inputNickname && !doubleCheck&& <button type="button" onClick={clearNickHandelr}><Close width="24px" height="24px"/></button>}
            {inputNickname && doubleCheck && <button><Done/></button>}
          </div>

          <div className={styles.button_container}>
          <button disabled={!nicknameValid} className={styles.checkbutton} type="button" onClick={doubleCheckHandler}>중복 확인</button>
        </div>

        </div>

        <h2>프로필 사진</h2>

        <div className={styles.profile_container}>
          <input className={styles.profile_input} type="file" accept="image/*" id="profileimg" onChange={saveImgFile} ref={imgRef}/>
          {imgFile ? <img src={imgFile} alt="profile img"/> : <DefaultProfile className={styles.defaultimg}/>}
          <div className={styles.label_container}>
            <label htmlFor="profileimg" className={styles.profile_label}>사진 등록하기</label>
          </div>
        </div>

        <h2>지금 하고 있는 운동을 알려주세요. (최대 5개)</h2>
        <div className={styles.form_input_exercise}>
          <Search className={styles.search_icon}/>
          <input type="text" placeholder="내가 하는 운동 검색하기" className={styles.input_style} onChange={addTagHandler} value={tag}/>
          <button onClick={addTagButton} disabled={tagButtonValid} type="button">확인</button>
        </div>
        <div className={styles.tags}>
          {exercises.map(tag => <div key={tag.name} className={styles.tag} style={{backgroundColor:`${tag.color}`}} onClick={deleteTagHandler}>
            {tag.name}
            <Close width="10px" height="10px"/>
          </div>)}
        </div>

        <div className={styles.presentation}>
          <h2>자기소개</h2>
          <textarea name="presentation" cols="30" rows="10" placeholder="간단하게 자신을 소개해주세요.(50자이내)" ref={presentationRef}></textarea>
        </div>
        <button disabled={!buttonValid} className={styles.next_button} type="submit">다음</button>
      </form>
    </div>
  )
};

export default SignupPage;