import React from "react";
import { motion } from "framer-motion";
import Root from "@/core/Root";
import SmBanner from "@/components/Smbanner";
import checkLanguage from '@/miscs/checkLanguage';
import BlogDetail from '@/components/BlogDetail';
import decrease from "@/components/miscs/decrease";
import minimize from "@/components/miscs/minimize";

const Blog = ({news, other}) => {
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root seo={{title: news.Title, description: decrease(news.Content, 120), thumb: minimize(news.Thumb, 'medium')}}>
                <SmBanner/>
                <BlogDetail data={news} other={other}/>
            </Root>
        </motion.div>
    );
};
export default Blog;

export async function getServerSideProps({params, req}){

    const queryString = `
    {
        newsletters(limit: 6) {
          Title
          Thumb {url formats}
          Content
          Slug
          createdAt
        }
    }
    `;

    let data = await checkLanguage(`/newsletters?Slug=${params.id}`, req, true);
    let other = await checkLanguage(queryString, req);
    return {props: {news: data.data[0], other: other.data.newsletters}}

}
