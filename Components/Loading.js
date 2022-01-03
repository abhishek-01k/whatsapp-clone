import React from 'react';
import {Circle} from 'better-react-spinkit';
import styled from "styled-components";

function Loading() {
    return (
        <Container>
            <Loadingcon>
                <img
                src="https://1.bp.blogspot.com/-PM8_Rig8V0M/XxFkv-2f3hI/AAAAAAAACSU/vB1BqbuhFCMyJ8OGCVstFiMLFmavCLqrwCPcBGAYYCw/s1600/whatsapp-logo-1.png"
                alt="Image"
                style={{marginBottom:30}}
                height={200}
                />
                <Circle color="#3CBC28" size={60}/>
            </Loadingcon>
        </Container>
    );
}

export default Loading;


const Container =styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height:100vh;
`

const Loadingcon= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`