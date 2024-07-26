import axios from "axios";
import {urlAuthApi} from '../dictionary/dictionary.js'

export const login = async(user,pws)=>{
    try {
        const body = {user, pws}
        console.log(body);
        const response = await axios.post(urlAuthApi+'/user/signIn',body,{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const countrys = async()=>{
    try {
        const response = await axios.get(urlAuthApi+'/company/country',{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const setCountrys = async(code)=>{
    try {
        const response = await axios.post(urlAuthApi+'/company/country/',{code},{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}


export const setCompany = async(code,companyName, country)=>{
    try {
        const body = {code,companyName, country};
        const response = await axios.post(urlAuthApi+'/company',body,{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const logout = async()=>{
    try {        
        const response = await axios.post(urlAuthApi+'/user/signOut',{},{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const checkAuth = async()=>{
    try {
        const response = await axios.get(urlAuthApi+'/user/checkAuth',{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

