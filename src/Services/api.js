import axios from 'axios';
import { getUserLocalStorage } from '../context/util';

const apiGold = axios.create({
    baseURL: 'https://goldcsapi.onrender.com/api'
});

apiGold.interceptors.request.use(
    (config) => { 
        const user = getUserLocalStorage();
        config.headers.Authorization = user?.token; 

        return config; 
    },
    (error) => {
        return Promise.reject(error)
     }
)

export default apiGold