import React, { useEffect } from 'react';

const Erxes = ({data}) => {
    useEffect(()=>{
        window.erxesSettings = { messenger: { brand_id: data.Brand, }, forms: [{ brand_id: data.Brand, form_id: data.Form, }], };
        var script = document.createElement('script');
        script.src = "https://erxes.tavanbogd.mn/widgets/build/formWidget.bundle.js";
        script.async = true;
        var entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(script, entry);
    },[])
    return (
        <React.Fragment></React.Fragment>
    );
};

export default Erxes;