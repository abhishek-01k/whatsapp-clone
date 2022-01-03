import React from 'react';
import styled from "styled-components"
import Sidebar from "./Sidebar"

const Layout = ({children})=> 
{
    return (
        <Wrapper>
            <Container>
                <Sidebar />
                {children}
            </Container>
            
        </Wrapper>
    );
}

export default Layout;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height:100vh;
`

const Container = styled.div`
    display: flex;
    width: 90vw;
    height: 95vh;
    margin:auto;
    box-shadow: 0 0 1rem 0.05rem rgba(0,0,0,0.2);
    
    background: white;

    @media (max-width: 1040px) {
        width: 100%;
        height: 100vh;
        margin:0;
    }

`
