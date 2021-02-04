import React from 'react';
import styled from 'styled-components';
import minimize from '@/miscs/minimize';
import formatDate from '@/miscs/formatDate';
import {Parser} from 'html-to-react';
import months from "@/miscs/months";
import decrease from './miscs/decrease';
import Link from 'next/link';
import SocialFixed from './miscs/SocialFixed';

const BlogDetail = ({data, other}) => {
    const ContentParser = new Parser();
    const ParsedContent = ContentParser.parse(data.Content);
    return (
        <Container className="container">
            <SocialFixed thumb={minimize(data.Thumb, 'medium')} title={data.Title} url={data.Slug} description={decrease(data.Content, 160)}/>
            <div className="row">
                <div className="col-md-9 left">
                    <img className="mainimg" src={minimize(data.Thumb, 'large')} />
                    <h1 className="maintitle">{data.Title}</h1>
                    <div className="datecon">
                        <span>{formatDate(data.createdAt)} / By {data.created_by.firstname+' '+data.created_by.lastname}</span>
                    </div>
                    <div className="content sun-editor-editable sun-editor">
                        {ParsedContent}
                    </div>
                </div>
                <div className="col-md-3 right">
                    {other.map((el,i)=>{
                        let date = new Date(el.createdAt)
                        return(
                            <div className="box" key={'box'+i}>
                                <Link href={'/news/'+el.Slug}>
                                    <a>
                                        <div className="img" style={{backgroundImage: `url(${minimize(el.Thumb, 'small')})`}}>
                                            <div className="date">
                                                <p>{date.getDate()}</p>
                                                <small>{months[date.getMonth()]}</small>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                <Link href={'/news/'+el.Slug}><a><h5>{decrease(el.Title, 45)}...</h5></a></Link>
                                <Link href={'/news/'+el.Slug}><a><p>{decrease(el.Content, 160)}...</p></a></Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    );
};

export default BlogDetail;

const Container = styled.div `
    padding-top:10vh;
    padding-bottom:10vh;
    .left{
        .mainimg{
            width:100%;
            margin-bottom:15px;
        }
        .linedtext{
            margin-bottom:15px;
        }
        .maintitle{
            margin-bottom:15px;
        }
        .datecon{
            font-weight:400;
            font-style:italic;
            margin-bottom:15px;
        }
        .content{
            margin-bottom:30px;
            padding-bottom:15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
        }
    }
    .right{
        .box{
            overflow:hidden;
            margin-bottom:30px;
            .img{
                height:160px;
                background-size: auto 100%;
                background-position:center center;
                transition:0.5s ease;
                &:hover{
                    background-size: auto 105%;
                    cursor:pointer;
                }
                .date{
                    margin-left:15px;
                    background:white;
                    width:fit-content;
                    width:-moz-fit-content;
                    padding:5px 15px;
                    text-align:center;
                    p {
                    margin-bottom: 0px;
                    font-weight: 600;
                    font-size: ${(props) => props.theme.fontSize2};
                    opacity: 0.9;
                    }
                    small {
                        margin-top: -5px;
                        display: block;
                    }
                }
            }
            h5{
                margin-top:10px;
            }
        }           
    }
    @media only screen and (max-width: 768px){
        padding-top:30px;
        padding-bottom:30px;
        .maintitle{
            font-size: ${props=>props.theme.fontSizeMedium};
            font-weight:bold;
        }
    }
`