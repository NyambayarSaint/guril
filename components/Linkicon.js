import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const Linkicon = ({ data }) => {
    console.log(data)
    return (
        <Container>
            <div className="container">
                {data.Piece.map(el => (
                    <a key={Math.random()} href={el ? el.Link : '#'} target="__blank">
                        <div className="piece">
                            <img className="img" src={minimize(el.Icon)} />
                            {el.Icon2 && <img className="img2" src={minimize(el.Icon2)} />}
                            <h5 className="title">{el.Title}</h5>
                            <div className="caption">{el.Caption}</div>
                        </div>
                    </a>
                ))}
            </div>
        </Container>
    );
};

export default Linkicon;

const Container = styled.div`
    background:rgba(0,0,0,0.02);
    .container{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        padding-top:30px;
        padding-bottom:30px;
        a{
            text-decoration:none;
            .piece{
                text-align:center;
                width:145px;
                padding:30px 15px;
                background:transparent;
                transition:0.3s ease;
                border-radius:15px;
                &:hover{
                    background:${({ theme }) => theme.mainColor2};
                    color:white;
                    .img{
                        display:none;
                    }
                    .img2{
                        display:block;
                    }
                }
                img{
                    width:67px;
                    height:67px;
                    margin-bottom:10px;
                    margin-left:auto;
                    margin-right:auto;
                }
                .img{
                    display:block;
                }
                .img2{
                    display:none;
                }
                .title{
                    font-weight:bold;
                    opacity:0.95;
                    margin-bottom:0px;
                }
                .caption{

                }
            }
        }
    }
`