import React from 'react';
import styled from 'styled-components';

const Longmessage = ({data}) => {
    return (
        <Container>
            <span>{data.Text}</span>
        </Container>
    );
};

export default Longmessage;

const Container = styled.div `
    width:100%;
    text-align:center;
    ${'' /* background:${({theme})=>theme.mainColor2}; */}
    background-image: ${({theme})=>theme.gradient};
    padding:5px;
    span{
        color:white;
        text-shadow:1px 1px 2px rgba(0,0,0,0.5);
    }
`