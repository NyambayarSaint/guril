import React, { useState } from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import {IoMdClose, IoIosPlay} from 'react-icons/io'
import SublimeVideo from 'react-sublime-video'
import ScrollAnimation from 'react-animate-on-scroll';
import "@/core/animate-scroll.scss";

const Totogrid4 = ({data}) => {
    
    const [video, setVideo] = useState('')

    return (
        <>
        <Container>
            {data.Title && <h1 className="maintitle">{data.Title}</h1>}
            <div className="row">
                {data.Grids.map(el=>{
                    return(
                        <div className="col-md-3" style={{marginBottom:30}} key={Math.random()}>
                            <ScrollAnimation animateIn='fadeIn'>
                                {el.Title && <h4 className="title">{el.Icon && <img src={minimize(el.Icon, 'thumbnail')}/>}{el.Title}</h4>}
                                {el.Image && <div className="img" style={{backgroundImage:`url(${minimize(el.Image, 'medium')})`}}></div>}
                                {el.Video && <button onClick={()=>setVideo(el.Video)}>VIDEO <IoIosPlay/></button>}
                                {el.Description && <p className="description">{el.Description}</p>}
                            </ScrollAnimation>
                        </div>
                    )
                })}
            </div>
        </Container>
        {video &&
        <PopupVideo>
            <div className="container" style={{position:'relative'}}>
                <Button onClick={()=>setVideo('')}><IoMdClose/></Button>
                <SublimeVideo autoPlay src={minimize(video)} />
            </div>
        </PopupVideo>
        }
        </>
    );
};

export default Totogrid4;

const Container = styled.div `
    margin-top:5vh;
    margin-bottom:5vh;
    padding-left:10vw;
    padding-right:10vw;
    .maintitle{
        text-align:center;
        font-weight:400;
        margin-bottom:5vh;
        font-size: 2.5vw;
    }
    .title{
        font-size: 1.5vw;
        font-weight:400;
        img{
            height:40px;
            width:40px;
            margin-right:15px;
        }
    }
    .description{
        margin-top:15px;
    }
    .img{
        height:16vw;
        width:100%;
        background-size: cover;
        background-position:center center;
        background-repeat:no-repeat;
    }
    button{
        width:100%;
        background:none;
        border:1px solid;
        margin-top:20px;
        padding:0.7vw 0px;
        font-size: ${props=>props.theme.fontSizeMedium};
    }
    @media only screen and (max-width: 768px){
        padding-left:8px;
        padding-right:8px;
        .maintitle{
            font-size: ${props=>props.theme.fontSizeMedium};
            margin-bottom:20px;
            font-weight:500;
        }
        .title{
            font-size: ${props=>props.theme.fontSize};
            font-weight:500;
            img{
                width:25px;
                height:25px;
            }
        }
        .img{
            height:60vw;
        }
        .col-md-4,.row{
            padding:0px;margin:0px;
        }
        .col-md-4{
            margin-bottom:10px !important;
        }
        .description{
            font-weight:400;
        }
    }
`

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
        right:30px;
        z-index:1000;
        min-width:unset;
        width:100px;
    }
    @media only screen and (max-width: 768px){
        button{
            min-width:unset;
            height:35px;
            width:75px;
        }
    }
`

const Button = styled.button `
    border:1px solid ${props=>props.color};
    color: ${props=>props.color};
    background:rgba(255,255,255,0.4);
    width:20vw;
    min-width:250px;
    height:45px;
    transition:0.5s ease;
    outline:none;
    margin:0px auto;
    display:block;

    svg{
        font-size:25px;
        margin-left:0px;
    }
`