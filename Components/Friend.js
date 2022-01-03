import { Avatar } from '@mui/material';
import { addDoc, getDocs } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components'
import { useAuth } from '../Auth';
import {collection , query, where } from 'firebase/firestore';
import {db} from "../Firebase";

const Friend = ({photoURL, displayName, id}) => {
    console.log(photoURL,displayName);

    const {currentUser} = useAuth();


    const createChat = async (id) => {
        const chatsRef = collection(db,"chats");
        const q = query(chatsRef,where("users","array-contains",currentUser.uid));
        const querySnapshot = await getDocs(q);

        const ChatAlreadyExist = (friend_id)=>!!querySnapshot?.docs.find(chat => chat.data().users.find(user => user === friend_id)?.length>0)

        //this above line is used to check through all the users collection for the friend_id which is passed if that is equal to the passed id so it will return a boolean exp with !!  and we do check if that already exist or not
        
        
        console.log('create Chat');
        if(!ChatAlreadyExist(id)){
            addDoc(chatsRef, {users: [currentUser.uid,id]})
        }else{
            console.log('chat Already exists');
        }

    }

    return (
        <Container onClick={()=>createChat(id)}>
            <FriendAvatar src={photoURL}/>
            <ChatContainer>
                <div style={{gridArea : 'name'}}>
                    {displayName}
                </div>
            </ChatContainer>
        </Container>
    );
}


export default Friend

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height: 67px;
    padding-left: 15px;
    word-break: break-word;
    :hover{
        background-color: #f5f5f5;
    }
`

const FriendAvatar = styled(Avatar)`
    margin: 5px;
    margin-right:15px;
`

const ChatContainer = styled.div`
    display:grid;
    padding:10px;
    width:100%;
    grid-template-columns: repeat()(3,1fr);
    border-bottom: 1px solid #ededed;
    gap:10px;
    grid-template-areas: "name name time"
    "latest_message latest_message.";
`