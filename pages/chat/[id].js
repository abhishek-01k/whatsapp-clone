import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React from 'react';
import styled from "styled-components"
import ChatContent from '../../Components/ChatContent';
import { db } from '../../firebase';

function ChatBox({chat,id,messages}) {
    return (
        <Container>
            <CHatContainer>
                <ChatContent chat={chat} chat_id={id} messagesProps={messages}/>
            </CHatContainer>
           
        </Container>
    );
}

export default ChatBox;

export async function getServerSideProps(context){
    const messagesRef = collection(db,"chats",context.query.id,"messages");
    const q = query(messagesRef,orderBy("timestamp","asc"));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id,timestamp:doc.data.timestamp?.toDate().getTime()}))


    const docRef = doc(db,"chats",context.query.id);
    const docSnap = await getDoc(docRef)
    return{
        props: {
            chat:JSON.stringify(docSnap.data()),
            id:context.query.id,
            messages:JSON.stringify(messages)
        }
    }
}

const Container = styled.div`

    display:flex;
    background-color:#f8fafc;
    width:100%;

`

const CHatContainer = styled.div`
    flex:1;

`