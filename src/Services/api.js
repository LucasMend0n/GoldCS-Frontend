import axios from 'axios'; 

const apiGold = axios.create({
    baseURL: 'https://goldcsapi.onrender.com/api'
})

export default apiGold