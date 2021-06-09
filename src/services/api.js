import axios from 'axios'

//key: 8002ac52c2cd31253a6b1d2083e54c745607d1f4
//base url: 'https://api-ssl.bitly.com/v4/'

const key = '8002ac52c2cd31253a6b1d2083e54c745607d1f4'

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
    }
})

export default api