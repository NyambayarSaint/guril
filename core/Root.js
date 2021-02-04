import Header from '@/core/Header'
import Footer from '@/core/Footer';
import {MenuContext} from '@/miscs/ContextMenuProvider';
import { useContext } from "react";
import styled from "styled-components";
import PreSeo from "@/components/miscs/PreSeo";
import Darken from '@/components/Darken';

export default function Root(props) {
    const {menu} = useContext(MenuContext);
    const { darken } = useContext(MenuContext);
    const {general} = useContext(MenuContext);
    const {information} = useContext(MenuContext);
    return (
        <Body>
            <Darken status={darken} />
            <PreSeo seo={props.seo}/>
            <Header menu={menu || []}/>
            {props.children}
            {general.length && <Footer menu={general} copyright={information}/>}
        </Body>
    )
}

const Body = styled.div `

    font-size: ${(props) => props.theme.fontSize};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${props => props.theme.fontWeightNormal};
    span,h3,div,p,li,a{
        font-weight: inherit;
        color:inherit;
    }
    input{
        outline:none;
    }
    img{
        max-width:100%;
    }
    .rec-carousel-item{
        display:flex;
        align-items:center;
    }
    .rec-pagination{
        button{

        }
        .rec-dot_active{
            box-shadow:0 0 1px 3px ${({theme})=>theme.mainColor};
            background:white;
        }
    }
    .rec-arrow{
        background-color: rgba(255,255,255,0.6);
        outline:none;
        &:hover{
            background:${({theme})=>theme.mainColor} !important;
        }
    }
`