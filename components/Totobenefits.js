import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';
import {BsChevronDown} from 'react-icons/bs'
import Link from 'next/link';

const Totobenefits = ({data}) => {
    return (
        <Container>
            {data.Title &&
            <>
                <div className="chevron"><BsChevronDown/></div>
                <h1 className="main-title">{data.Title}</h1>
            </>
            }
            <div className="wrapper">
                {data.Benefits.map((el,i)=>{
                    return(
                        <div key={i+Math.random()} className="benefits" style={{backgroundImage:`url(${minimize(el.Image, 'large')})`}}>
                            {el.Slug ?
                            <Link href={'/p/'+el.Slug}>
                                <a>
                                    <div className="effect">
                                        <div className="content">
                                            <h4 className="title">{el.Title}</h4>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                            :
                            <div className="effect">
                                <div className="content">
                                    <h4 className="title">{el.Title}</h4>
                                </div>
                            </div>
                            }
                            
                        </div>
                    )
                })}
            </div>
        </Container>
    );
};

export default Totobenefits;

const Container = styled.div`
    .main-title{
        text-align:center;
        padding: 0px 15px;
        padding-bottom:5vh;
        font-weight:600;
        opacity:0.9;
    }
    .chevron{
        text-align:center;
        font-size:26px;
        font-weight:100;
        margin-bottom:15px;
        opacity:0.8;
    }
    .wrapper{
        display:flex;
        width:100%;
        flex-wrap:wrap;
        .benefits{
            flex:1;
            color:white;
            height:50vh;
            background-size: cover;
            background-repeat:no-repeat;
            background-position: center center;
            &:hover{
                .effect{
                    background:rgba(0,0,0,0.0);
                    cursor:pointer;
                }
            }
            .effect{
                transition:0.6s ease;
                width:100%;
                height:100%;
                background:rgba(0,0,0,0.5);
                display:flex;
                justify-content:center;
                align-items:center;
                .content{
                    padding:15px;
                    h4{
                        text-align:center;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        .main-title{
            font-size: ${props=>props.theme.fontSizeMedium};
            padding-bottom:15px;
            margin-bottom:0px;
        }
        .chevron{
            margin-bottom:0px;
        }
        .wrapper{
            .benefits{
                height:45vw;
                .content{
                    .title{
                        font-size: ${props=>props.theme.fontSize};
                    }
                }
            }
        }
    }
`
