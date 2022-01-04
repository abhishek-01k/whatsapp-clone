import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import ChatIcon from '@mui/icons-material/Chat';
import CustomVerticalMore from './CustomMoreVertical';
import { InsertEmoticon, Mic } from '@mui/icons-material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Message from './Message';
import getFriendData from '../utilities/getFriendData';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useAuth } from '../Auth';
import moment from 'moment';

const ChatContent = ({chat,chat_id,messagesProps}) => {

    const [friend,setFriend] = useState([])
    const chatParse = JSON.parse(chat)

    const [input,setInput] = useState("")
    const {currentUser} = useAuth();
    const [message,setMessage] = useState([])

    const messagesEndRef = useRef(null)

    useEffect(()=>{
        setMessage(JSON.parse(messagesProps))

    },[messagesProps])

    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
    }

    useEffect(()=>{
        scrollToBottom()
    },[message])


    useEffect(()=>{
        const messagesRef = collection(db,"chats",chat_id,"messages");
        const q = query(messagesRef,orderBy("timestamp","asc"))
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            setMessage(querySnapshot.docs.map(doc =>({...doc.data(),id:doc.id,timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
    
        return unsubscribe;
    },[chat_id])


    useEffect(() =>{
        if(chatParse.users?.length>0){
          
            getFriendData(chatParse.users).then(data=>{setFriend(data)})
        }
        else{
            console.log('without chatparse');
        }
    },[chatParse.users, chat_id])

    


    const sendMessage = async (e) =>{
        e.preventDefault();
        //store the user active time


        const usersRef = doc(db,"users",currentUser.uid);
        setDoc(usersRef,{lastSeen: serverTimestamp()},{merge:true})
        //send message

        const messagesRef = collection(db,"chats",chat_id,"messages");

        await addDoc(messagesRef, {
            timestamp: serverTimestamp(),
            message:input,
            user:currentUser.email,
            photoURL:currentUser.photoURL
        })
        //add the latest message and time
        const chatRef = doc(db,"chats",chat_id);
        setDoc(chatRef,{
            latestMessage: input,
            timestamp:serverTimestamp()

        },{merge:true});
        setInput('')
    }



    const handleKeyPress = (event) =>{
        if(event.key==='Enter'){
            
        }
    }

    return (
        <Container>
            <Header>
                <Avatar src={friend.photoURL} />
                <HeaderInfo>
                        <h3>{friend.displayName}</h3>
                        <div>Last Active: {moment(friend.lastSeen?.toDate()).fromNow()} </div>
                </HeaderInfo>

                    <IconButton>
                        <ChatIcon/>
                    </IconButton>

                    <IconButton>
                        <CustomVerticalMore/>
                    </IconButton>

            </Header>

            <MessageContainer>
                {/* {Messages} */}
                {/* <Message
                
                /> */}

                {message.map(message => <Message
                    key={message.id}
                    user = {message.user}
                    message={message.message}
                    timestamp={message.timestamp}
                />)}

                <div style={{marginBottom:100}} ref={messagesEndRef} />

            </MessageContainer>



            <InputContainer>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>

                <IconButton>
                    <AttachFileIcon />
                </IconButton>

                <form style={{flex:1, marginRight:"5px" }} onSubmit={sendMessage}>
                <Input  onChange={e=>setInput(e.target.value)}                   placeholder="Type a message"
                    value={input} />

                    <button hidden type="submit"  disabled={!input} 
                    onClick={sendMessage} >
                        Send Message
                    </button>

                </form>

                

                <IconButton style={{paddingLeft:"12px"}}>
                    <Mic  />
                </IconButton>

            </InputContainer>


        </Container>




    );
};

export default ChatContent;

const Container = styled.div`
display:flex;
flex-direction: column;
height: 100%;
`
const Button = styled.button``

const Header = styled.div`
    position: sticky;
    background-color:white;
    z-index: 100;
    top:0;
    display:flex;
    padding:11px;
    height: 80px;
    align-items: center;
    border-bottom:1px solid whitesmoke;
`

const HeaderInfo = styled.div`
    margin-top:5px;
    flex: 1;
    margin-left: 13px;

    >h3{
        margin-top:0px;
        margin-bottom:3px;
    }

    >div{
        font-size: 14px;
        color:gray;
    }
`


const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding:10px;
    position: sticky;
    bottom:0;
    background-color:#f0f0f0;
    z-index: 100;

`

const Input = styled.input`
    flex: 1;
    outline:0;
    border:none;
    border-radius: 30px;
    padding:20px;
    width:100%
    /* margin-left: 15px;
    margin-right:15px; */
`

const MessageContainer = styled.div`
    padding: 20px;
    background-color: #e5ded8;
    flex: 1;
    width:100%;
    background-image: url('/bg-dark-image.png');
    background-repeat: repeat;
    background-attachment: fixed;
    opacity:0.8;
    overflow: auto;

`