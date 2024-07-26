import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth,login, logout, setCompany } from "../backend/auth";

const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [dbs, setDbs] = useState(null);
    const [roll, setRoll] = useState(null);
    const [currentDB, setCurrentDB] = useState(null);
    const [dataConfig, setDataConfig] = useState(null);
   

    const signUp = async(email, psw) => {};
    const  signIn = async(email, psw) => {
        try {            
          const response = await login(email,psw)//Loguar el usuario
          setUser(response.data);          
        } catch (error) {
            throw error
        }

    };
    const signout = async() => {
        try {
            //eliminar la cookie
            const response = await logout(); 
            console.log(response);       
            setCurrentDB(null);
            setRoll(null);
            setDbs(null);            
            setUser(null);
        } catch (error) {
            throw error
        }
    };

    const getDbs = async(dataUser)=>{
       //agregar la lista de base datos 
       if (user) {
        setDbs(user.getCompanies)
       }       
    }

    const checkUser = async()=>{
       try {
        const response = await checkAuth();        
        console.log(response.data);
        setUser(response.data)       
       } catch (error) {
        console.log(error.response.data || error.message);
       }
       finally{ setLoading(false);}
    }

    const setCurrentCompany = async(data)=>{
       try {
        const {id, Name} = data;
        const response = await setCompany(id,Name);
        console.log(response.data.data);
        setDataConfig(response.data.data);
       } catch (error) {
        console.log(error.data || error.message)
       }
    };

    useEffect(() => {        
       checkUser();//validar si estoy autenticado y resetear el usuario
    }, []);

    useEffect(() => {
         if(user){
            getDbs(user);
            if(user.currentCompany)setCurrentDB({id: user.currentCompany.code,Name: user.currentCompany.companyName});
            if(user.configCompany)setDataConfig(user.configCompany);
        };
         
    }, [user])
    

    return (
        <authContext.Provider value={{ signUp, signIn, signout, setCurrentDB,setCurrentCompany,user, loading,currentDB,dbs,roll,dataConfig }}>
            {children}
        </authContext.Provider>
    );

}