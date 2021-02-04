import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Darken = ({ status }) => {
    return (
        <motion.div initial={{opacity:0}} exit={{opacity:0}} animate={{opacity:1}}>
            <Container status={status}>
            </Container>
        </motion.div>

    );
};

export default Darken;

const Container = styled.div`
    display:none;
    position:fixed;
    z-index:95;
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.6);
    ${({ status }) => status && `
        display:block;
    `}
`