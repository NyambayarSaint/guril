import fetch from "node-fetch";
import parseCookies from '@/miscs/parseCookies';

const checkLanguage = async (queryString, req, normal) =>{

    const cookies = parseCookies(req);
    const httpObject = { method: 'post', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ query: `query ${queryString}`})}

    if(normal){
        return new Promise(async(resolve, reject) => {
            if(cookies['tb-lang'] === "en"){
                const res = await fetch(`http://ad-ubguril.tavanbogd.com${queryString}`);
                const pageData = await res.json();
                return resolve({data: pageData});
            }
            else{
                const res = await fetch(`http://ad-ubguril.tavanbogd.com${queryString}`);
                const pageData = await res.json();
                return resolve({data: pageData});
            }
        })
    }
  
    return new Promise(async(resolve, reject)=>{
      if(cookies['tb-lang'] === "en"){
          const res = await fetch('http://ad-ubguril.tavanbogd.com/graphql', httpObject)
          const pageData = await res.json()
          return resolve({data: pageData.data});
      }
      else{
          const res = await fetch('http://ad-ubguril.tavanbogd.com/graphql', httpObject)
          const pageData = await res.json()
          return resolve({data: pageData.data});
      }
    })
    
}

export default checkLanguage