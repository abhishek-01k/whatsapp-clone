import {useEffect, useContext, createContext, useState, useLayoutEffect } from "react";
import {auth ,db} from "./Firebase";
import Login from "./pages/Login";
import Loading from "./Components/Loading";
import {doc ,serverTimestamp, setDoc} from '@firebase/firestore';


const AuthContext = createContext();

export const AuthProviders = ({children})=>{

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        return auth.onIdTokenChanged(async (user) =>{

            if(!user){
                console.log("No USer");
                setCurrentUser(null);
                setLoading(false);
            
            return ;
            }

            const token = await user.getIdToken()
            
            const userData = {
                displayName: user.displayName,
                email:user.email,
                lastSeen:serverTimestamp(),
                photoURL:user.photoURL
            }
            await setDoc(doc(db,"users",user.uid),userData)

            console.log('userToken' , token);
            setCurrentUser(user);
            setLoading(false);
        })


    },[])



    if(loading){
        return <Loading />
    }

    if(!currentUser){
        return <Login />
    }
    else{
        // console.log(currentUser);
        return (
            <AuthContext.Provider value={{currentUser}}>
                   
                {children}
            </AuthContext.Provider>

        )
    }
}

export const useAuth = ()=> useContext(AuthContext)
