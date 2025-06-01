import useAuth from '@/hooks/auth-provider';

import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const API = () => {
    const navigate = useNavigate();


    const backendHost = import.meta.env.VITE_APIENDPOINT;
    // const backendHost = "http://10.0.12.7:3001";
    // const backendHost = "http://192.168.0.102:3001";
    // const backendHost = "https://link-sharing-app-server-4tmo.onrender.com"

    const { setToken, token, refreshToken, logoutAuth } = useAuth();
    const api = axios.create({ baseURL: backendHost });
    const apiPrivate = axios.create({ baseURL: backendHost, withCredentials: true });
    
    apiPrivate.interceptors.request.use(
        (config ) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    
    apiPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401) {
                logoutAuth()
                setTimeout( ()=>navigate('/login'), 1000);
            }
              
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const res = await api.post(`/auth/refresh`, { refreshToken });
                setToken( res.data.token );
                const newToken = res.data.token;
                prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(prevRequest);
            }
            
            return error.response.data;
        }
    );

    return { api, apiPrivate, backendHost }
}

export default API;
