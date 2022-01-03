import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import getFriendData from '../utilities/getFriendData';
import moment from 'moment';


const Chat = ({id,users,timestamp,latestMessage}) => {

    console.log(id);
    console.log(users);
    const router = useRouter();
    const enterChat = ()=>{
        router.push(`/chat/${id}`)
    }


    function truncate(string,n){
        return string?.length>n ? string.substr(0,n-1)+'...' : string;
    }

   const [friend,setFriend] =  useState({});

    useEffect(()=>{
        if(users.length > 0){
            getFriendData(users).then(data =>{
                setFriend(data);
            });
        }
        else{
            console.log("cannot proceed");
        }
    },[users])


    return (
        <Container onClick={enterChat}>
            <FriendAvatar src={friend.photoURL} />
            <ChatContainer>
                <Name style={{ gridArea:'name'}}>{friend.displayName}</Name>
                <div style={{ gridArea:'latest_message'}}>{
                truncate(latestMessage,15)
                }</div>
                <Time style={{ gridArea:'time'}}>{timestamp?moment(timestamp?.toDate()).format('LT'):''}</Time>
            </ChatContainer>
            
        </Container>
    );
};

export default Chat;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height:67px;
    padding-left: 15px;
    word-break: break-word;
    :hover{
        background-color: #f5f5f5;
    }

    @media (max-width: 768px) {
        padding-left: 8px !important;
    }

`

const FriendAvatar = styled(Avatar)`
    margin: 5px;
    margin-right:15px;

    @media (max-width: 768px) {
      margin:0px !important;
      width:30px !important;
      height: 30px !important;
    }
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

    @media (max-width: 768px) {
        grid-template-areas: "name time" "latest_message .";
    }

`


const Name = styled.div`

@media (max-width: 768px) {
    font-size: 14px ;
}

`

const Time = styled.div`
`