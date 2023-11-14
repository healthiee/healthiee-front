import axios from 'axios';

const API = axios.create({
    baseURL: 'http://prod.healthiee.net',
    headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': '{UUID}',
    },
});

export default API;