import axios from 'axios'

const api = axios.create({
	baseURL : 'http://prod.healthiee.net/',
})

export default api