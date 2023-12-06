import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthLogin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
      const code = new URLSearchParams(window.location.search).get('code');
    const AuthCode = {
      code: code,
    };
  axios.post('http://prod.healthiee.net/v1/auth/login', AuthCode, {
      withCredentials: true
    })
      .then(response => {
        const { token } = response.data.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Email verified successfully!', response);
        navigate('/')
      })
      .catch(error => {
        console.log("login requset fail : " + error);
      })

  }, [])

  return (
    <>
    </>
  )
};

export default AuthLogin;