import React from 'react';
import styled from 'styled-components';

const Divider = ({data}) => {
    return (
        <Container visible={data.Visible} style={{marginTop: data.Top, marginBottom: data.Bottom}}></Container>
    );
};

export default Divider;

const Container = styled.div `
    background:white;
    background-size: 21px;
    background-repeat:repeat-x;
    background-position: center;
    height:12px;
    width:100%;
    opacity:0;
    ${({visible})=> visible && `
        background-image: url('/img/dots.png');
        opacity:1;
    `};
`