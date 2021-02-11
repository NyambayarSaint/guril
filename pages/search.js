import Path from '@/components/Path';
import Root from '@/core/Root';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from "react";

const printers = () => {

    const { handleDarken } = useContext(MenuContext);

    useEffect(()=>{
        handleDarken('close');
    },[])

    return (
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Root>
                    <Path/>
                    <div className="container" style={{marginTop:30,marginBottom:30}}>
                        <strong>Result: </strong>No results found!
                    </div>
                </Root>
            </motion.div>
    );
};

export default printers;

export async function getServerSideProps({params, req}){
    // let res = await checkLanguage('/home', req, true);
    return {props: {data: ''}}
}