import React, { useEffect } from 'react';
import {Parser} from 'html-to-react';
import styled from 'styled-components';

const Erxesform = ({data}) => {
    const ContentParser = new Parser();

    useEffect(()=>{
        if(data.TopicID) window.erxesSettings = { knowledgeBase: { topic_id: data.TopicID || '' }, messenger: { brand_id: data.Brand, }};
        else window.erxesSettings = { forms: [{ brand_id: data.Brand || '', form_id: data.Form || '', }], messenger: { brand_id: data.Brand, } };
        var script = document.createElement('script');
        if(data.TopicID) script.src = "https://erxes.tavanbogd.mn/widgets/build/knowledgebaseWidget.bundle.js";
        else script.src = "https://erxes.tavanbogd.mn/widgets/build/formWidget.bundle.js";
        script.async = true;
        var entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(script, entry);
    },[])

    return (
        <Container>
            <div className={`${data.Container && 'container'}`}>
                {ContentParser.parse(data.ErxesDiv)}
            </div>
        </Container>
    );
};

export default Erxesform;

const Container = styled.div `
    padding-top:5vh;
    padding-bottom:5vh;
`
