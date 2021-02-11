import React from 'react';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa'
import { useRouter } from 'next/router';
import {IoIosArrowRoundBack} from 'react-icons/io'

const Path = ({ data }) => {
    const R = useRouter();
    return (
        <Container>
            <div className="container">
                {data ?
                    <div style={{ cursor: 'pointer' }} onClick={() => R.push('/')}><FaHome /> Нүүр</div>
                    :
                    <div style={{ cursor: 'pointer' }} onClick={() => R.back()}><IoIosArrowRoundBack /> Буцах</div>
                }
                {data && data.Links.map(link => (
                    <div key={Math.random()}><a href={link.Path ? link.Path : '#'}>{link.Title}</a></div>
                ))}
            </div>
        </Container>
    );
};

export default Path;

const Container = styled.div`
    background:${({theme})=>theme.gradient};
    padding:12px 0px;
    .container{
        font-size: ${({ theme }) => theme.fontSizeSmall};
        display:flex;
        div{
            color:white;
            svg{
                margin-top:-3px;
                opacity:0.7;
                margin-right:5px;
            }
            &:after{
                content: "/";
                margin-left:7px;
                margin-right:7px;
            }
            &:last-child{
                opacity:0.7;
                &:after{
                    display:none;
                }
            }
            &:first-child{
                opacity:1;
            }
        }
    }
`