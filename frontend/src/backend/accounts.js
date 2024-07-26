import axios from "axios";
import {urlAuthApi} from '../dictionary/dictionary.js'


export const getAccounts = async()=>{
    try {
        const response = await axios.get(urlAuthApi+'/account/account',{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}


export const getAccount = async(id)=>{
    try {
        const response = await axios.get(urlAuthApi+'/account/accountid/'+id,{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const insertAccount = async(data)=>{
    try {
        const response = await axios.post(urlAuthApi+'/account/accountinst',data,{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const updateAccount = async(data)=>{
    try {
        const response = await axios.patch(urlAuthApi+'/account/accountupt',data,{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const getElements = async(key)=> {
    try {
        const response = await axios.get(urlAuthApi+'/account/element/'+key,{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}

export const deleteAccount = async(id)=>{
    try {
        const response = await axios.delete(urlAuthApi+'/account/accountd/'+id,{withCredentials: true,});
        return response;
    } catch (error) {
        throw error
    }
}