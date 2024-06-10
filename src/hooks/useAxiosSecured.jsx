import axios from "axios"
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
export const   axiosSecured = axios.create({
    baseURL: 'https://bistro-boss-server-sigma-lyart.vercel.app'
})

const useAxiosSecured = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();

    const [navigateFlag, setNavigateFlag] = useState(false);
    // request interceptors to add authorization header for every secure call to the api 
    axiosSecured.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        // console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;  
    }, function(error){
        // Do something with request error  
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosSecured.interceptors.response.use(function(response){
        return response;
    }, 
    // function(error){
    //     return  Promise.reject(error)
    // })
    // },
    // use ^ or 
     async (error) => {
        const status = error.response.status;
        // console.log('Status error in the interceptor', status);
        // for 401  or 403 logOut the user and move the user to the login
        if(status === 401 || status === 403){
            await logOut();
            setNavigateFlag(true);
            
        }
        return Promise.reject(error)
    });

    useEffect(() => {
        if(navigateFlag){
            navigate('/');
        }

    },[navigateFlag, navigate])
    return axiosSecured
};

export default useAxiosSecured;