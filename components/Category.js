import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import checkLanguage from './miscs/checkLanguage';
import minimize from './miscs/minimize';

const Category = () => {

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        loadCategory();
    },[])
    const loadCategory = async () => {
        let res = await checkLanguage(query, null);
        let tmp = res.data.categories
        tmp && setCategories(tmp);
    }
    
    return (
        <Container>
            <h2>Ангилал</h2>
            <div className="con">
                {categories && categories.map(el=>(
                    el.Slug ?
                            <div className="box" key={Math.random()}>
                                <Link href={'/p/categories-child?slug='+el.Slug}>
                                    <a>
                                        <img src={minimize(el.Thumb[0],'medium')} />
                                    </a>
                                </Link>
                                <Link href={'/p/categories-child?'+el.Slug}><a><p>{el.Title}</p></a></Link>
                            </div>
                    :
                    <div className="box" key={Math.random()}>
                        <img src={minimize(el.Thumb[0],'medium')} />
                        <p>{el.Title}</p>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Category;

const Container = styled.div`
    padding-left:10vw;
    padding-right:10vw;
    padding-top:5vh;
    padding-bottom:5vh;
    h2{
        margin-bottom:5vh;
    }
    .con{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        gap:30px;
        .box{     
            width:calc(33% - 30px);
            display:flex;
            flex-direction:column;
            justify-content:center;
            img{
                width:100%;
                margin-bottom:10px;
            }
            p{
                margin-bottom:0px;
                text-align:center;
            }
        }
    }
`

const query = `
{
    categories {
      Title
      Thumb {
        url
        formats
      }
      Slug
    }
}
`