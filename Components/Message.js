import moment from 'moment';
import React from 'react';
import styled from "styled-components"
import { useAuth } from '../Auth';

const Message = ({user,message,timestamp}) => {

    const {currentUser} = useAuth();


    const loginMail = currentUser.email; //here email id of user who logged interface
    const MessageType = user === loginMail ? MyMessage : FriendMessage

    return (
        <Container>
            

            <MessageType>
               <div style={{margin:"0",textAlign:"initial"}}>{message}</div> 
                <Timestamp> {moment(timestamp).format('LT')}</Timestamp>

               
            </MessageType>

            
        </Container>
    );
};

export default Message;

const Container = styled.div`
    display: flex;

`

const MessageBubble = styled.div`
    padding:15px;
    
    background-color:white;
    text-align:end;
    margin-bottom: 10px;
    position:relative;
`

const MyMessage = styled(MessageBubble)`
    margin-left:auto;
    background-color:#dcf8c6;
    border-radius:8px 8px 8px 8px;
`

const FriendMessage = styled(MessageBubble)`
    background-color:white;
   
    border-radius:8px 8px 8px 8px;

`
const MessageTail = styled.span`
    margin-top:-2px;

`

const Timestamp = styled.div`
    
    color:gray;
    padding:10px;
    font-size: 9px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;
    display:contents;

`
