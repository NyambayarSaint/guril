import React from 'react';
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi'
import { AiOutlineClose, AiOutlineDown } from 'react-icons/ai'
import { useState } from 'react';
import { useRouter } from 'next/router';
import minimize from '@/components/miscs/minimize';
import Search from './Search';
import HamburgerMenu from 'react-hamburger-menu';

const Header = () => {
    const R = useRouter();
    const { menu, handleDarken, config} = useContext(MenuContext);
    const [currentSubmenu, setCurrentSubmenu] = useState(null);
    const [search, setSearch] = useState(false);
    const [mobile, setMobile] = useState(false);

    return (
        <>
            <div id="header-padding" style={{ height: config.width > 768 ? 140 : 63 }}></div>
            <Container mobile={mobile}>
                <div className="container">
                    <div className="left">
                        <img id="logo" src="/img/logo.png" onClick={() => R.push('/')} />
                        <img id="logo-white" src="/img/logo-white.png" onClick={() => R.push('/')} />
                        <HamburgerMenu className="burger" strokeWidth={4} height={18} menuClicked={() => setMobile(!mobile)} isOpen={mobile} />
                        {!search &&
                            <div className="menu-con">
                                {menu.length && menu.map(element => (
                                    <div className="parent"
                                        onMouseEnter={() => element.Sub.length && setCurrentSubmenu(element)}
                                        onMouseLeave={() => setCurrentSubmenu(null)}
                                        key={Math.random()}
                                        onClick={() => element.Path && R.push(element.Path)}
                                    >
                                        {element.Name} {element.Sub.length ? <AiOutlineDown /> : ''}
                                    </div>
                                ))}
                                {currentSubmenu &&
                                    <div className="submenu-con"
                                        onMouseEnter={() => setCurrentSubmenu(currentSubmenu)}
                                        onMouseLeave={() => setCurrentSubmenu(null)}>

                                        <div className="l"><div className="arrow"></div><span>{currentSubmenu.Name}</span></div>
                                        <div className="r">{currentSubmenu.Sub.map(el => (
                                            <div className="box" key={Math.random()}
                                                style={{ cursor: el.Path && 'pointer' }}
                                                onClick={() => el.Path && R.push(el.Path)}>

                                                {el.Icon && <img src={minimize(el.Icon, 'medium')} />}
                                                <p>{el.Name}</p>

                                            </div>
                                        ))}</div>
                                    </div>
                                }
                            </div>
                        }
                        {search && <Search/>}
                    </div>
                    <div className="right">
                        <li id="search">
                            {!search && <BiSearch onClick={() => {
                                setSearch(true);
                                handleDarken();
                            }} />}
                            {search && <AiOutlineClose onClick={() => {
                                setSearch(false);
                                handleDarken();
                            }} />}
                        </li>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Header;

const Container = styled.div`
box-shadow:rgba(0, 0, 0, 0.09) 0px 2px 4px 0px;
position:fixed;
width:100%;
z-index:99;
top:0;
background:white;
background-image: url('/img/pattern.png');
background-size: 120px;
${'' /* background-image: linear-gradient(to right, ${({theme})=>theme.mainColor}, ${({theme})=>theme.mainColor3}); */}
${'' /* background-image: ${({theme})=>theme.gradient}; */}
.container{
    display:flex;
    justify-content:space-between;
    font-size:16px;
    gap:30px;
    .left{
        display:flex;
        gap:30px;
        flex:1;
        min-height:84px;
        justify-content:space-between;
        .burger{
            display:none;
        }
        #logo-white{
            display:none;
        }
        #logo{
            width:120px;
            margin-top:10px;
            margin-bottom:10px;
            &:hover{
                cursor:pointer;
            }
        }
        .menu-con{
            display:flex;
            align-items:flex-end;
            position:relative;
            .parent{
                padding:50px 0px 10px;
                position:relative;
                font-weight:bold;
                text-transform:uppercase;
                opacity:0.9;
                background:white;
                ${'' /* color:white; */}
                ${'' /* font-style:italic; */}
                ${'' /* text-shadow:calc(22px / 5) 0px 0px rgba(0,0,0,0.15); */}
                ${'' /* font-size:22px; */}
                svg{
                    display:none;
                }
                &:before{
                    content:"";
                    display:inline-block;
                    width:2px;
                    height:10px;
                    background:rgba(0,0,0,0.2);
                    margin:0px 15px;
                }
                &:after{
                    content:"";
                    width:100%;
                    height:4px;
                    background:${({ theme }) => theme.mainColor};
                    background-image: linear-gradient(to right, ${({theme})=>theme.mainColor}, ${({theme})=>theme.mainColor2}, ${({theme})=>theme.mainColor2}, ${({theme})=>theme.mainColor3});
                    display:block;
                    position:absolute;
                    left:0px;
                    bottom:-1px;
                    opacity:0;
                    transition:0.3s ease;
                }
                &:hover{
                    cursor:pointer;
                    &:after{
                        opacity:1;
                    }
                }
                &:first-child{
                    &:before{
                        display:none;
                    }
                }
            }
            .submenu-con{
                border-left:unset;
                position:absolute;
                top:0px;
                margin-top:140px;
                box-shadow:rgba(0, 0, 0, 0.09) 0px 2px 4px 0px;
                display:flex;
                background:white;
                .l{
                    ${'' /* background:rgba(0,0,0,0.1); */}
                    padding:30px;
                    position:relative;
                    border-left:1px solid rgba(0,0,0,0.1);
                    border-top:1px solid rgba(0,0,0,0.1);
                    border-bottom:1px solid rgba(0,0,0,0.1);
                    .arrow{
                        width: 0; 
                        height: 0; 
                        border-top: 15px solid transparent;
                        border-bottom: 15px solid transparent;
                        border-left: 15px solid rgba(255,255,255,1);
                        position:absolute;
                        left:100%;
                        z-index:9;
                    }
                    span{
                        font-weight:bold;
                        line-height:16px;
                    }
                }
                .r{
                    padding:30px;
                    padding-left:45px;
                    display:flex;
                    gap:30px;
                    background-image: ${({theme})=>theme.gradient};
                    .box{
                        text-align:center;
                        display:flex;
                        align-items:center;
                        &:hover{
                            p{
                                font-weight:bold;
                                text-decoration:underline;
                            }
                        }
                        img{
                            width:80px;
                            margin-bottom:15px;
                        }
                        p{
                            margin:0px;
                            font-weight:bold;
                            color:white;
                            line-height:18px;
                            margin-top:5px;
                        }
                    }
                }
            }
        }
    }
    .right{
        display:flex;
        align-items:flex-end;
        padding:10px 0px;
        li{
            list-style-type:none;
            padding:0px 15px;
            border-right:1px solid rgba(0,0,0,0.1);
            opacity:0.6;
            &:hover{
                cursor:pointer;
            }
            svg{
                font-size:20px;
                transition:0.3s ease;
                &:hover{
                    color:${({ theme }) => theme.mainColor};
                }
            }
            &:last-child{
                border-right:unset;
            }
        }
        #carticon{
            opacity:1;
        }
    }
}
@media only screen and (max-width: 768px){
    .container{
        flex-direction:column;
        background: ${({ theme }) => theme.mainColor};
        #logo{
            width:113px !important;
            display:none;
        }
        #logo-white{
            width:113px !important;
            display:block !important;
        }
        .left{
            justify-content:space-between;
            align-items:center;
            gap: unset;
            min-height:unset;
            padding:20px 0px;
            .menu-con{
                position:absolute;
                flex-direction:column;
                top:63px;
                align-items:flex-start;
                left:0px;
                width:100%;
                padding:15px 15px;
                box-shadow:rgba(0,0,0,0.3) 0px 15px 15px 0px;
                background:white;
                border-top:2px solid rgba(0,0,0,0.05);
                transition:0.5s ease;
                margin-left:0px;
                ${({ mobile }) => !mobile && `
                    margin-left:-100%;
                `};
                .parent{
                    padding:0px 0px;
                    margin:10px 0px;
                    svg{
                        display:inline-block;
                        opacity:0.5;
                        margin-left:5px;
                    }
                    &:before{
                        ${'' /* background: ${({theme})=>theme.mainColor};
                        width:3px; */}
                    }
                    &:first-child{
                        &:before{
                            display:inline-block !important;
                        }
                    }
                    &:after{
                        margin-left:32px;
                        width:calc(100% - 32px);
                        bottom:-4px;
                    }
                }
                .submenu-con{
                    position:relative;
                    width:calc(100vw - 30px);
                    margin-top:15px;
                    box-shadow:unset;
                    .l{
                        display:none;
                    }
                    .r{
                        background:rgba(0,0,0,0.04);
                        padding:15px;
                        display:block;
                        width:100%;
                        overflow-x:scroll;
                        white-space:nowrap;
                        .box{
                            width:fit-content;
                            display:inline-block;
                            margin-right:30px;
                            &:last-child{
                                margin-right:0px;
                            }
                        }
                    }
                }
            }
            .burger{
                display:block;
                span{
                    background:white !important;
                }
            }
        }
        .right{
            display:flex;
            flex-direction: column;
            position: fixed;
            right: 0px;
            top: 250px;
            li{
                padding:6px 15px;
                background:${({ theme }) => theme.mainColor};
                color:white;
                margin-bottom:15px;
                &:hover{
                    opacity:1;
                }
            }
        }
    }
}
`