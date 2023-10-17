import {useState} from "react";

const useAccountInput = (condition) => {
  const [enterValue, setEnterValue] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  const enterValid = condition(enterValue);
  const error = !enterValid && isTouch;

  const inputHandler = (event) => {
    setEnterValue(event.target.value);
  };

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
    inputHandler,
    blurHandler,
    reset,
    setEnterValue,
  });
}

export default useAccountInput;