import React from 'react';
import styled from 'styled-components';
import {Parser} from 'html-to-react'
import minimize from './miscs/minimize';
const ContentParser = new Parser();

const Simplegrid = ({data}) => {
    return (
        <Container style={{backgroundImage:data.Background && `url(${minimize(data.Background,'large')})`}}>
            <div>
                <div className="row">
                    <div className={`box ${data.DivideOnMobile ? 'col-md-6' : 'col-6'} ${data.Flex && 'flexed'}`}>
                        {ContentParser.parse(data.Left)}
                    </div>
                    <div className={`box ${data.DivideOnMobile ? 'col-md-6' : 'col-6'} ${data.Flex && 'flexed'}`}>
                        {ContentParser.parse(data.Right)}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Simplegrid;

const Container = styled.div `
    padding-top:10vh;
    padding-bottom:10vh;
    padding-left:10vw;
    padding-right:10vw;
    background-size: cover;
    background-position:center center;
    background-repeat:no-repeat;
    overflow-x:hidden;
    border-top:1px solid rgba(0,0,0,0.05);
    border-bottom:1px solid rgba(0,0,0,0.05);
    .box{
        &.flexed{
            display:flex;
            flex-direction:column;
            justify-content:center;
        }
    }
    .__se__float-left{
        float:left;
        padding-right:15px;
        &:last-child{
            padding-right:0px;
        }
    }
    figcaption{
        padding:7px 15px;
        background:rgba(0,0,0,0.05);
        text-align:center !important;
        p,h1,h2,h3,h4,h5,h6,span,div{
            margin:0px;
            background:transparent !important;
            text-align:center !important;
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:8px;
        padding-right:8px;
        padding-top:5vh;
        padding-bottom:5vh;
        h1{
            span{
                font-size: ${props=>props.theme.fontSizeMedium} !important;
                font-weight:bold !important;
            }
            font-size: ${props=>props.theme.fontSizeMedium} !important;
            font-weight:bold !important;
        }
        hr{
            margin-top:0px;
            margin-bottom:0px;
        }
        h2,h3,h4,h5,h6,span,div,p{
            font-size: ${props=>props.theme.fontSize} !important;
        }
        h1,h2,h3,h4,h5,h6{
            margin-bottom:20px;
        }
        figure{
            text-align:center;
        }
        .col-6{
            &:first-child{
                padding-right:8px;
            }
            &:last-child{
                padding-left:8px;
            }
        }
        .col-md-6{
            margin-bottom:15px;
            &:first-child{
                margin-bottom:5vh;
                padding-bottom:5vh;
                border-bottom:1px solid rgba(0,0,0,0.05);
            }
            &:last-child{
                margin-bottom:0px;
            }
            img{
                max-width:70vw;
            }
            p{
                &:last-child{
                    margin-bottom:0px;
                }
            }
        }
        figcaption{
            font-size: 12px !important;
            p,h1,h2,h3,h4,h5,h6,span,div{
                font-size: 12px !important;
            }
        }
    }
`