import axios from 'axios';
import Cookies from 'js-cookie';
import env from '@/config/env';


const api = axios.create({
    baseURL: env.apiUrl,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
    }
});

export default api;
