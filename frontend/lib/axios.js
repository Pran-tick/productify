import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, //sends cookies with requests so that backend knows we are authenticared.

})

export default api;