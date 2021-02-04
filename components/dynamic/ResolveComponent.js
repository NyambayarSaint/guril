import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';

const importComponent = Name => lazy(()=>import(`../${Name}`));

const ResolveComponent = ({data}) => {

    const [views, setViews] = useState([]);

    useEffect(()=>{
        async function loadViews(){
            const componentPromises = data.map(async (el,i) => {
                const Comp = await importComponent(sanitizeComponentName(el.__component));
                return <Comp key={'cmp'+i} data={el}/>
            });
            Promise.all(componentPromises).then(setViews);
        }
        loadViews()
    },[data])
    return (
        <React.Suspense fallback={<Container><h2>Уншиж байна...</h2></Container>}>
            {views}
        </React.Suspense>
    );
};

export default ResolveComponent;

const sanitizeComponentName = (name) => {
    let final = name.slice(name.indexOf(".")+1, name.length).replace(/-/g, '');;
    return capitalizeFirstLetter(final)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Container = styled.div `
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
`