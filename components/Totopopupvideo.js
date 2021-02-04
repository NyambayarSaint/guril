import React, { useState } from 'react';
import styled from 'styled-components';
import {Parser} from 'html-to-react';
import minimize from './miscs/minimize';
import SublimeVideo from 'react-sublime-video';
import {IoIosPlay,IoMdClose} from 'react-icons/io'

const ContentParser = new Parser();

const Totopopupvideo = ({data}) => {

    const [popup, setPopup] = useState(false);

    return (
        <>
            <Container style={{backgroundImage: `url(${minimize(data.Background, 'large')})`}}>
                <div className="effect">
                    <div className="content" style={{background:'transparent'}}>
                        {ContentParser.parse(data.Content)}
                    </div>
                    {data.Video && <Button onClick={()=>setPopup(true)}><IoIosPlay/></Button>}
                </div>
            </Container>
            {popup && 
            <PopupVideo>
                <div style={{position:'relative'}}>
                    <Button onClick={()=>setPopup(false)}><IoMdClose/></Button>
                    <SublimeVideo autoPlay src={minimize(data.Video)} />
                </div>
            </PopupVideo>
            }
        </>
    );
};

export default Totopopupvideo;

const PopupVideo = styled.div `
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:999;
    background:rgba(0,0,0,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    button{
        position:absolute;
        top:15px;
        right:15px;
        z-index:1000;
    }
`

const Container = styled.div `
    background-size: cover;
    background-position:center center;
    overflow:hidden;
    &:hover{
        .effect{
            background:rgba(0,0,0,0.4);
            transform:scale(1.1);
        }
    }
    .effect{
        padding-top:10vh;
        padding-bottom:10vh;
        padding-left:10vw;
        padding-right:10vw;
        text-align:center;
        transition:2s ease;
    }
    button{
        border:1px solid white;
        color:white;
        margin-top:3vh;
    }
    .content{
        color:white;
        img{
            width:6vw;
        }
        h1{
            font-weight:300;
            margin-bottom:3vh;
            margin-top:3vh;
        }
        h2{
            font-weight:300;
            line-height:35px;
            margin-bottom:0px;
        }
    }
    @media only screen and (max-width: 768px){
        img{
            width:15vw !important;
        }
        span{
            font-size: inherit !important;
        }
        h1{
            font-size: ${props=>props.theme.fontSizeMedium} !important;
            line-height:${props=>props.theme.fontSizeMedium} !important;
        }
        h2{
            font-size: ${props=>props.theme.fontSize} !important;
            line-height:22px !important;
        }
    }
`

const Button = styled.button `
    border:1px solid;
    background:rgba(255,255,255,0.4);
    opacity:0.6;
    width:75px;
    height:50px;
    transition:0.5s ease;
    outline:none;
    &:hover{
        opacity:1
    }
    svg{
        font-size:30px;
    }
    @media only screen and (max-width: 768px){
        height:35px !important;
    }
`