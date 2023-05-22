import axios from 'axios'; 

const api = axios.create({
    baseURL: 'https://goldcsapi.onrender.com'
})

export default api