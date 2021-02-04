import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import ResolveComponent from "@/components/dynamic/ResolveComponent"
import checkLanguage from "@/components/miscs/checkLanguage";
import {MenuContext} from '@/miscs/ContextMenuProvider'
import { useContext } from "react";

const Index = ({data}) => {
    let {Layout} = data
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        setLoaded(true)
    },[])
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                {loaded && <ResolveComponent data={Layout}/>}
            </Root>
        </motion.div>
    );
    
};
export default Index;

export async function getServerSideProps({params, req}){
    let res = await checkLanguage('/home', req, true);
    return {props: {data: res.data}}
}