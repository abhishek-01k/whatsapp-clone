import React from 'react';
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../firebase";
import {getAuth } from "@firebase/auth";


const getFriendData = async (users) => {
    
    const {currentUser} = getAuth();
    const friendId = users?.filter(user =>user!=currentUser?.uid)
    
    const docRef = doc(db,"users",friendId[0])
    const docSnap = await getDoc(docRef)
    return docSnap.data();
};

export default getFriendData;