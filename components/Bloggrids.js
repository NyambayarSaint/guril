import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import {useRouter} from 'next/router'
import { motion } from "framer-motion";
import {BsArrowRight} from 'react-icons/bs';
import {FaWindowClose} from 'react-icons/fa'

import checkLanguage from "@/miscs/checkLanguage";
import months from "@/miscs/months";
import minimize from '@/miscs/minimize';
import decrease from "@/miscs/decrease";


const BlogGrids = ({data}) => {

    const R = useRouter()
    const [current, setCurrent] = useState(3); //INITIAL LOAD COUNT
    const [newsData, setData] = useState([]);
    const [filter, setFilter] = useState('DESC');
    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const increaser = 3
    const [types, setTypes] = useState([])
    
    useEffect(()=>{
        goLoadMore()
    },[current, filter])

    const goLoadMore = async () => {
        let queryString = `
        {
            newsletters(sort: "createdAt:${filter}", limit:${current}) {
            Title
            Thumb {url formats}
            Content
            Slug
            createdAt
            }
        }
        `;
        let res = await checkLanguage(queryString, null);
        setData(res.data.newsletters)
        setLoad(true)
    }

    const filterHandler = e => setFilter(e.target.value);
    const loadmoreHandler = () => setCurrent(current + increaser);
    
    const handleEnter = async (e) => {
        if(e.key === 'Enter'){
            if(search !== ""){
                setLoad(false);
                let res = await checkLanguage(`/newsletters?Title_contains=${search}`, null, true)
                res.data.length ? setSearchedData(res.data) : window.alert(`${data.NoResult} "${search}"`);
                return setLoad(true);
            }
            closeSearchHandler();
        }
    }
    const closeSearchHandler = () => {
        setSearchedData([]);
        setSearch('');
    }
    return (
        <Container>
            <div className="row">
                <div className="col-md-12 top">
                    <div className="row">
                        <div className="col-md-12 bigcaption"><h5>{data.Title}</h5></div>
                        <div className="col-4 sections">
                            {!searchedData.length ?
                                <div className="search">
                                    <input placeholder={data.SearchPlaceholder} value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleEnter} />
                                </div>
                            : null}
                        </div>
                        <div className="col-4 sections">
                            {!searchedData.length ?
                                <select onChange={filterHandler}>
                                    <option value="DESC">{data.NewToOld}</option>
                                    <option value="ASC">{data.OldToNew}</option>
                                </select>
                            : null}
                        </div>
                    </div>
                </div>
                

                    <motion.div animate="show" initial="hide" variants={container} className="box-container">
                        {searchedData.length ? <motion.p className="col-12">{data.SearchResult} "<span style={{fontWeight:'bold',cursor:'pointer'}} onClick={closeSearchHandler}>{search}" <FaWindowClose/></span></motion.p> : null}
                    {load ? 
                        searchedData.length ?
                        searchedData.map((el,i)=>{
                            let date = new Date(el.createdAt)
                            return(
                                <div className="col-md-4" style={{marginBottom: 30, float:'left'}} key={'cols'+i}>
                                    <motion.div className="box" variants={elem}>
                                        <Link href={'/news/' + el.Slug}>
                                            <a>
                                                <motion.div variants={elemImg} className="img" style={{backgroundImage: `url(${minimize(el.Thumb,'medium')})`}}>
                                                </motion.div>
                                            </a>
                                        </Link>
                                        <div className="text">
                                            <Link href={'/news/' + el.Slug}>
                                                <a>
                                                    <motion.h4 variants={elemText} className="title">{decrease(el.Title, 54)}...</motion.h4>
                                                </a>
                                            </Link>
                                            <motion.p variants={elemP}>{decrease(el.Content, 100, 100)}...</motion.p>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })
                        :
                        newsData.map((el,i)=>{
                            return(
                                <div className="col-md-4" style={{marginBottom: 30, float:'left'}} key={'cols'+i}>
                                    <motion.div className="box" variants={elem}>
                                        <Link href={'/news/' + el.Slug}>
                                            <a>
                                                <motion.div variants={elemImg} className="img" style={{backgroundImage: `url(${minimize(el.Thumb,'medium')})`}}>
                                                </motion.div>
                                            </a>
                                        </Link>
                                        <div className="text">
                                            <Link href={'/news/' + el.Slug}>
                                                <a>
                                                    <motion.h4 variants={elemText} className="title">{decrease(el.Title, 54)}...</motion.h4>
                                                </a>
                                            </Link>
                                            <motion.p variants={elemP}>{decrease(el.Content, 100, 100)}...</motion.p>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })
                    : null}
                    </motion.div>
                    <div className="button-container">
                    {!searchedData.length ? load ? <button className="loadmore" onClick={loadmoreHandler}>{data.LoadMore}</button> : <button className="loadmore loading"><img src="/img/spinner.gif"/></button> : null}
                    </div>
                </div>
        </Container>
    );
};

export default BlogGrids;

const Container = styled.div`
    padding-left:10vw;
    padding-right:10vw;
    margin-bottom:5vh;
    .top{
        .bigcaption{
            text-align:center;
            padding-top:4vh;
            padding-bottom:4vh;
            border-bottom:1px solid rgba(0,0,0,0.1);
            margin-bottom:3vh;
            h5{
                margin:0px;
            }
        }
        .sections{
            margin-bottom:3vh;
            select{
                padding:6px 8px;
                border:none;
                border-radius:unset;
                border:1px solid black;
                outline:none;
                width:100%;
            }
            input{
                padding:6px 8px;
                border:none;
                border-radius:unset;
                border-bottom:1px solid black;
                outline:none;
                width:100%;
            }
        }  
    }
    .box-container{
        width:100%;
        .box{
            .img{
                min-height:200px;
                height:25vh;
                background-size: 100% auto;
                background-repeat:no-repeat;
                background-position:center;
                transition:0.3s ease;
                position:relative;
                &:hover{
                    background-size: 105% auto;
                }
            }
            a{
                color:black;
                text-decoration:none;
            }
            .title{
                font-size: ${({theme})=>theme.fontSize};
                margin-top:15px;
                border-bottom:1px solid black;
                padding-bottom:5px;
                min-height:44px;
            }
            p{
                min-height:72px;
            }
        }
    }
    .button-container{
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        button{
            border:none;
            background:none;
            border:1px solid rgba(0,0,0,0.1);
            padding:10px 30px;
            outline:none;
        }
    }
    @media only screen and (max-width: 768px){
        padding-left:8px;
        padding-right:8px;
        .row{
            margin:0px;
        }
    }
`;

const container = {
    show: {
        transition: {
            staggerChildren: 0.5
        }
    }
}
const elem = {
    hide: {
        opacity: 0,
        y: 50
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}
const elemText = {
    hide: {
        opacity: 0,
        x: 50
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}
const elemP = {
    hide: {
        opacity: 0,
        x: -50
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}
const elemImg = {
    hide: {
        opacity: 0,
        y: -50
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.7
        }
    }
}