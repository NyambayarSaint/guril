import React from 'react';
import styled from 'styled-components';
import minimize from './miscs/minimize';

const SmBanner = ({data}) => {
    return (
        <Container className="container-fluid" style={{backgroundImage: `url(${data ? minimize(data.Background, 'large') : 'https://legendsportsnetwork.com/wp-content/uploads/2018/12/news.jpg'})`}}>
            <div className="row">
                <div className="col-md-12 bottom">
                    <h1>{data && data.Title || 'News'}</h1>
                </div>
            </div>
        </Container>
    );
};

export default SmBanner;

const Container = styled.div `
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    .row{
        background: rgba(0,0,0,0.6);
    }
    .bottom{
        padding-top:10vh;
        padding-bottom:10vh;
        color:white;
        h1{
            text-align:center;
            font-weight:bold;
            font-size: ${props => props.theme.fontSizeBig};
        }
        .Slug{
            text-align:center;
        }
    }
    @media only screen and (max-width: 768px){
        h1{
            font-size: ${props=>props.theme.fontSizeMedium};
        }
    }
`