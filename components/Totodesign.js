import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const Totodesign = ({data}) => {
    return (
        <Container>
            {data.Boxes.map((el)=>{
                return(
                    <div className="design-box" style={{width: el.Spacing+'%'}} key={Math.random()}>
                        <img src={minimize(el.Image,'large')} />
                        <div className={`text ${el.Position ? el.Position : 'top'}`}>
                            <p>{el.Text}</p>
                        </div>
                    </div>
                )
            })}
        </Container>
    );
};

export default Totodesign;

const Container = styled.div `
    display:flex;
    flex-wrap:wrap;
    .design-box{
        position:relative;
        img{
            width:100%;
            height:100%;
            object-fit:cover;
            min-height:250px;
        }
        .text{
            position:absolute;
            text-align:center;
            margin-left:5%;
            width:90%;
            color:white;
            text-shadow:1px 1px 4px rgba(0,0,0,0.5);
            p{
                font-size:${props=>props.theme.fontSizeMedium};
                margin-top:1rem;
            }
            &.bottom{
                bottom:15px;
            }
            &.top{
                top:15px;
            }
        }
    }
    @media only screen and (max-width: 768px){
        .design-box{
            width:100% !important;
            .text{
                p{
                    font-size: ${props=>props.theme.fontSize};
                }
            }
        }
    }
`