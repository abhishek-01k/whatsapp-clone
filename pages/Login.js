import React from 'react';
import styled from "styled-components";
import Head from 'next/head';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import {auth, provider} from "../Firebase";
import { signInWithPopup } from 'firebase/auth';


const login = () => {
    const loginWithGoogle = ()=>{
        signInWithPopup(auth, provider);
    }
    
    return (
        <Container>
            <Head>
               <title>Login</title> 
            </Head>

        <LoginContainer>
            <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png"   />
            
            <div>
            <SignButton  startIcon={<GoogleIcon />}
            onClick={loginWithGoogle}
            >Sign in with Google</SignButton>

            </div>
            

            
            
        </LoginContainer>

        </Container>
    );
};

export default login;

const Container=styled.div`
display: grid;
place-items:center;
height:100vh;
background-color:rgb(0,150,136);
width:100vw;
`

const LoginContainer = styled.div`
display:flex;
padding:100px;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Logo = styled.img`
height: 200px;
width: 200px;
margin-bottom: 50px;
`;

const SignButton= styled(Button)`
    &&&{border:none;
    box-shadow:0 4px 14px -3px rgba(0,0,0,0.7); ;
    background-color:white ;
    color: #b02730;
    font-weight: 300;
    font-size: 16px;
    padding-left:10px;
    padding-right: 10px;


:hover{
    background-color:#b02730;
    color: white;
    outline:none;
    box-shadow: none;
    border:none;
}}
    
    
`
