import React from 'react';

const TextBreak = ({string}) => {
    if(string.includes("|")){
        let tmp = string.split("|");
        return (
            <>
                {tmp.map(el=><>{el}<br/></>)}
            </>
        );
    }
    return string
};

export default TextBreak;