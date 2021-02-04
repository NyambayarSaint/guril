import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Footer = ({ menu, copyright }) => {
    const R = useRouter();
    return (
        <Container>
            <div className="container">
                <div className="box">
                    <div className="left">
                        {menu.map(el => (
                            <div className="li" onClick={()=> el.Path && R.push(el.Path)} key={Math.random()}>
                                {el.Name}
                            </div>
                        ))}
                    </div>
                    <div className="right">
                        {copyright}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    font-size:${({theme})=>theme.fontSizeSmall};
    background:${({theme})=>theme.gradient};
    padding:10px 0px;
    .box{
        display:flex;
        justify-content:space-between;
        color:white;
        .left{
            display:flex;
            .li{
                display:flex;
                align-items:center;
                &:hover{
                    cursor:pointer;
                }
                &:after{
                    content:"";
                    display:inline-block;
                    width:1px;
                    height:10px;
                    background:black;
                    margin:0px 15px;
                    opacity:0.5;
                }
                &:last-child{
                    &:after{
                        display:none;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .box{
            flex-direction:column;
            .left{
                flex-wrap:wrap;
                .li{
                    width:50%;
                    margin-bottom:10px;
                    &:nth-child(odd){
                        border-right: 1px solid rgba(255,255,255,0.4);
                    }
                    &:nth-child(even){
                        padding-left:15px;
                    }
                    &:after{
                        display:none;
                    }
                    &:last-child{
                        border-right:unset;
                    }
                }
            }
            .right{
                text-align:center;
                border-top:1px solid rgba(255,255,255,0.4);
                padding-top:10px;
            }
        }
    }
`