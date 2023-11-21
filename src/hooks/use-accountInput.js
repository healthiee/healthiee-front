import {useState} from "react";

const useAccountInput = (condition) => {
  const [enterValue, setEnterValue] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const enterValid = condition(enterValue);
  const error = !enterValid && isTouch;

  const inputHandler = (event) => {
    setEnterValue(event.target.value);
  };

  const inputNicknameHandler = (event) => {
    setDoubleCheck(false);
    setEnterValue(event.target.value);
    setInvalid(false);
  }

  const blurHandler = () => {
    setIsTouch(true);
  }

  const reset = () => {
    setEnterValue('');
    setIsTouch(false);
  }

  return({
    enterValue,
    error,
    enterValid,
    doubleCheck,
    invalid,
    inputHandler,
    blurHandler,
    reset,
    setDoubleCheck,
    setInvalid,
    inputNicknameHandler,
  });
}

export default useAccountInput;