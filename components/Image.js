import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const Image = ({data}) => {
    console.log(data.Image.caption,'hehe')
    return (
        <Container
        center={data.Position === "center"}
        left={data.Position === "left"}
        right={data.Position === "right"}
        ghost={data.Ghost}
        >
            {data.Image.caption ?
                <a href={data.Image.caption} target="__blank"><img style={{ width: data.Width }} src={minimize(data.Image)} /></a>:
                <img style={{ width: data.Width }} src={minimize(data.Image)} />
            }
        </Container>
    );
};

export default Image;

const Container = styled.div `
    width:100%;
    position:relative;
    z-index:1;
    ${({center}) => center && `
        display:flex;
        justify-content:center;
    `};
    ${({left}) => left && `
        display:flex;
        justify-content:flex-start;
    `};
    ${({right}) => right && `
        display:flex;
        justify-content:flex-end;
    `};
    ${({ghost}) => ghost && `
        position:absolute;
        z-index:2;
    `};
`