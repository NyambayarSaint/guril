import { useRouter } from 'next/router';
import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

const Search = () => {

    const [width, setWidth] = useState(null);
    const R = useRouter();
    const input = useRef();

    useEffect(() => {
        let left = document.querySelector('#logo').offsetLeft + 142
        let right = document.querySelector('#search').offsetLeft + 20
        setWidth(right - left);
        input.current.focus();
    }, []);

    const handleSearch = (e) => {
        if(e.key === "Enter"){
            R.push(`/search?q=${e.target.value}`);
        }
    }

    return (
        <Container>
            <input ref={input}
                onKeyDown={handleSearch}
                style={{ width: width && width }}
                placeholder="Хайх..."
            />
        </Container>
    );
};

export default Search;

const Container = styled.div`
    margin:25px 0px;
    border:1px solid rgba(0,0,0,0.2);
    input{
        padding:5px 15px;
        border:none;
        transition:0.5s ease;
        width:100px;
    }
    @media only screen and (max-width: 768px){
        position: fixed;
        top: 250px;
        margin:0px;
        input{
            width:calc(100vw - 68px);
        }
    }
`