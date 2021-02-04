import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { GoPrimitiveDot } from 'react-icons/go'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import minimize from "../miscs/minimize";

const Carousel = ({ data }) => {
    const unique = Math.floor(Math.random() * 100);
    const { Slide } = data;
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        document.querySelector(`#container-${unique} .toggle-container .dots`).classList.add('active');
        const trigg = document.querySelector(`#container-${unique} #next`);
        // setInterval(()=>trigg && trigg.click(), 5 * 1000);
    }, []);
    useEffect(() => {
        let elementList = [...document.querySelectorAll(`#container-${unique} .toggle-container .dots`)];
        elementList.forEach((el, i) => current === i ? el.classList.add('active') : el.classList.remove('active'));
    }, [current])
    const dotHandler = (i) => setCurrent(i)
    const arrowHandler = (type) => {
        type === -1 ? setCurrent(current - 1) : setCurrent(current + 1);
        if (type === -1) return current > 0 ? setCurrent(current - 1) : setCurrent(Slide.length - 1);
        return current < Slide.length - 1 ? setCurrent(current + 1) : setCurrent(0);
    }
    return (
        <>
            <Container id={`container-${unique}`} position={Slide[current].Position} height={data.Height}>
                <Slider image={minimize(Slide[current].Image || Slide[current])}
                    text={Slide[current].Text}
                    link={Slide[current].Link}
                    position={Slide[current].Position}
                />
                <motion.div initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1 } }} className="toggle-container">
                    <a href={Slide[current].Link ? Slide[current].Link : '#'} className="link-back"></a>
                    <li id="prev" onClick={() => arrowHandler(-1)}>
                        <BsChevronLeft fontSize={20} />
                    </li>
                    <div className="cntr">
                        {Slide.map((el, i) => (
                            <li className="dots" onClick={() => dotHandler(i)} key={el._id}>
                                <GoPrimitiveDot />
                            </li>
                        ))}
                    </div>
                    <li id="next" onClick={() => arrowHandler(1)}>
                        <BsChevronRight fontSize={20} />
                    </li>
                </motion.div>
            </Container>
        </>
    );
};

export default Carousel;

const Slider = ({ image, text, position }) => (
    <AnimatePresence>
        <motion.div
            className="img"
            style={{ backgroundImage: `url(${image})` }}
            key={image}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { duration: 1, ease: "easeInOut", delay: 0.3 },
            }}
            exit={{
                opacity: 0,
                transition: { duration: 1, ease: "easeInOut", delay: 0.3 },
            }}
        >
            <div className="effect">
                <motion.div className={`box ${position}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: { damping: 10, stiffness: 100, delay: 1.5, duration: 1 },
                    }}
                    exit={{ opacity: 0, x: 0 }}
                >
                    {text && <div className="caption">{text}</div>}
                </motion.div>
            </div>
        </motion.div>
    </AnimatePresence>
);

const Container = styled.div`
    ${({ height }) => height ? `height: ${height}` : `height:36.5vw`};
    position: relative;
    overflow: hidden;
    background-image: url(/img/slider-fallback.png);
    background-size: cover;
    background-repeat:no-repeat;
    background-position: center center;
    .img {
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        .effect{
            width:100%;
            height:100%;
            ${'' /* background-image:linear-gradient(to top, white, transparent, transparent); */}
            padding:15px;
            .box{
                padding:15px 30px;
                background-image: ${({theme})=>theme.gradient};
                position:absolute;
                bottom:60px;
                ${({position}) => position === 'Left' ? `left: 10vw;` : `right: 10vw;`};
                .caption{
                    font-weight:bold;
                    text-shadow:calc(30px / 10) 0px 0px rgba(0,0,0,0.15);
                    font-size:30px;
                    font-style:italic;
                    line-height:30px;
                }
            }
        }
    }
    h1 {
        font-size: 50px;
        text-shadow:1px 1px 7px rgba(0,0,0,0.5);
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }
    .toggle-container{
        position:relative;
        height:100%;
        z-index:1;
        color:black;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .link-back{
            width:100%;
            height:100%;
            position:absolute;
            z-index:-1;
        }
        li{
            list-style-type:none;
            transition:0.3s ease;
            &:hover{
                cursor:pointer;
                transform:scale(1.3);
            }
        }
        #prev{
            padding:30px;
            svg{
                font-size:50px;
                color:rgba(0,0,0,0.6);
            }
        }
        #next{
            padding:30px;
            svg{
                font-size:50px;
                color:rgba(0,0,0,0.6);
            }
        }
        .cntr{
            align-self:flex-end;
            display:flex;
            margin-bottom:30px;
            li{
                svg{
                    font-size:20px;
                    color:rgba(255,255,255,1);
                }
                &.active{
                    svg{
                        color:${({ theme }) => theme.mainColor2};
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 768px){
        min-height:unset;
        max-height:unset;
        min-height:260px;
        h1{
            font-size: ${props => props.theme.fontSizeMedium};
        }
        .toggle-container{
            #next,#prev{
                svg{
                    font-size:25px;
                }
            }
            .cntr{
                margin-bottom:10px;
            }
        }
    }
`;