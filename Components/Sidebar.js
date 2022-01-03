import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components"
import { Avatar, Icon, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomVerticalMore from './CustomMoreVertical';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { style } from '@mui/system';
import {useAuth} from "../Auth";
import {collection, getDocs , query, where, onSnapshot } from 'firebase/firestore';
import {db} from "../Firebase";

import Chat from './Chat.js';
import Friend from './Friend';
import Fuse from "fuse.js"


const Sidebar = ()=> {
    
    // console.log(currentUser);

    const [friends,setFriends] =  useState([]);
    const [chats,setChats] =  useState([]);

    const [searchFriends,setSearchFriends] =useState(false);

    const [input,setInput] = useState("");
   
    const fuse = new Fuse(friends,{
        keys:['email','displayName']
    })

    const friends_result = fuse.search(input)



    const inputAreaRef = useRef(null);
    const {currentUser} = useAuth();

   
    
    useEffect(()=>{
        
        const chatsRef = collection(db,"chats")
        const q = query(chatsRef, where("users","array-contains",currentUser.uid));

        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            setChats(querySnapshot.docs.map(doc =>({...doc.data(),id : doc.id})))
        })

        
        return unsubscribe
    },[currentUser.uid])

    useEffect(()=>{
        async function fetchFriends(){
            const usersRef = collection(db,"users");
            const q = query(usersRef, where("email","!=",currentUser?.email));
            const querySnapshot = await getDocs(q);
            console.log('querySnapshot',querySnapshot)
            setFriends(querySnapshot.docs.map(doc =>({...doc.data(),id:doc.id})))
        }
        fetchFriends()
    },[currentUser?.email])

//    console.log(currentUser);
//     console.log(friends);

    useEffect(()=>{
        const checkIfClickedOutside = e =>{
            if(!inputAreaRef.current.contains(e.target)){
                setTimeout(()=>{
                    setSearchFriends(false);
                },3000);
            }
            else{
                setSearchFriends(true);
            }
        }

        document.addEventListener("mousedown",checkIfClickedOutside)
        return ()=>{
            document.removeEventListener("mousedown",checkIfClickedOutside)
        }
    },[])

    return (
        <Container>
            <Header>
                <UserAvatar src={currentUser.photoURL} alt={"avatar-image"}/>
                <IconGroup>
                    <IconButton>
                        <ChatIcon  />
                    </IconButton>

                    <CustomVerticalMore />
                </IconGroup>

            </Header>
            
            <SearchCHat>
                <SearchBar>
                    <SearchIcon fontSize="small" sx={{opacity:0.5,}}/>
                    <SearchInput ref={inputAreaRef} placeholder="Search or start a new chat"
                    onChange = {e=>setInput(e.target.value)}
                    />

                </SearchBar>
            </SearchCHat>
            
            {searchFriends ?
                <>{
                    friends_result.map(({item}) =>(
                        <Friend
                            key={item.id}
                            photoURL= {item.photoURL}
                            displayName = {item.displayName}
                            id={item.id} />
                    ))
                }
                </>
                :
                <>
                {chats.map(chat=> (
                    <Chat 
                        key={chat.id}
                        id={chat.id}
                        users={chat.users}
                        latestMessage={chat.latestMessage}
                        timestamp = {chat.timestamp}
                    />
                ))}
                </>
        }






            {/* {chats.map(chat => (
            <Chat
            key = {chat.id}
            id ={chat.id}
            users = {chat.users} />) )} */}

                {/* had to use () instead of {} in arrow functions */}

            {/* {friends.map(friend =>(
                <Friend
                    key = {friend.id}
                    photoURL = {friend.photoURL}
                    displayName = {friend.displayName}
                    id={friend.id}
                />
            ))} */}
            
                
            
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 45vw;
    margin-bottom: 20px;
    box-shadow: 0 0 1rem 0.05rem rgba(0,0,0,0.2);
    height: 100%;

`

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color:white;
    justify-content: space-between;
    align-items: center;
    padding:15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    width:100%;
`

const UserAvatar = styled(Avatar)`

    cursor: pointer;
    :hover{
        opacity:0.8;
    }

`

const IconGroup = styled.div``

const SearchCHat =styled.div`
    background-color: #f6f6f6;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 20px;
`

const SearchBar =styled.div`
    display: flex;
    padding: 5px;
    padding-left: 8px;
    border-radius: 10px;
    border-bottom: 1px solid #ededed;
    background:white;
`

const SearchInput = styled.input`
width:100%;
border:none;
outline:none;
padding-left: 15px;
`