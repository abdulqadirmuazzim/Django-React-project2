import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from "../api"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import { useEffect, useState } from 'react';

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(()=>{
        auth().catch(()=> setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const response = await api.post('/api/token/refresh/', {refresh: refreshToken});
            if (response.status === 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else{
                setIsAuthorized(false);
            }
            
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decode = jwtDecode(token);
        const tokenExpriation = decode.exp
        const now = Date.now() / 1000;

        if (tokenExpriation < now){
            await refreshToken()
        } else{
            setIsAuthorized(true)
        }
    }
    if (isAuthorized === null){
        return <div>Loading...</div>;
    }
    return isAuthorized ? children : <Navigate to="/login"/>;
}

export default ProtectedRoute;