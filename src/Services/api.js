import axios from 'axios';
import { getUserLocalStorage } from '../context/util';

let url = '' 

if(import.meta.env.PROD){
    url = 'https://goldcsapi.onrender.com/api'
}
else if(import.meta.env.DEV){
    url = 'https://localhost:7211/api'
}

const apiGold = axios.create({
    baseURL: url
});

apiGold.interceptors.request.use(
    (config) => { 
        const user = getUserLocalStorage();
        config.headers.Authorization = `Bearer ${user?.token}`;

        return config; 
    },
    (error) => {
        return Promise.reject(error)
     }
)

export default apiGold