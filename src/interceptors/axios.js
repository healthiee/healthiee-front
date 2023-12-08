// import axios from "axios";

// // axios.defaults.withCredentials = true;

// axios.interceptors.response.use(response => response, async error => {
//   if (error.response.status === 401) {
//     const response = await axios.post('http://prod.healthiee.net/v1/auth/refresh', {}, 
//     { withCredentials: true });
//     const data = error.response.data
//     console.log(data);
    

//     if (response.status === 200) {
//       const { token } = response.data.data;
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       return axios(error.config);
//     }
//   }

//   return error;
// });