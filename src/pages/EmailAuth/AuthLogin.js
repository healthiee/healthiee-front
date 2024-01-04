import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/instance';

const AuthLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const AuthCode = {
      code: code,
    };
    api.post('v1/auth/login', AuthCode, {
      withCredentials: true
    })
      .then(response => {
        const { token } = response.data.data;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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