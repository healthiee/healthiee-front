import axios from "axios";

axios.defaults.baseURL = 'http://prod.healthiee.net/';

axios.interceptors.response.use(response => response, async error => {

  if (error.response.status === 401) {
    const response = await axios.post('v1/auth/refresh', {}, {
      withCredentials: true
    });

    if (response.status === 200) {
      const { token } = response.data.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return axios(error.config);
    }
  }

  return error;
});
