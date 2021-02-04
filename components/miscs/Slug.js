import Links from '@/miscs/Links'
import { useEffect, useState } from 'react'


const Slug = (props) => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        setMenu(generateSlug())
    },[]);
    return (
        <div className={`Slug ${props.border ? 'border' : ''}`} style={props.style}>
            <Links data={menu} />
        </div>
    )

}

export default Slug

const generateSlug = () => {
    let host = window.location.host
    let full = window.location.href
    let protocol = window.location.protocol
    let relative = full.slice(protocol.length + 2, full.length).replace(host, '');
    let count = relative.split('/');
    const final = count.map((el, i) => {
        let send = {}
        i == 0 ? send['title'] = 'Нүүр хуудас' : send['title'] = el.replace(/_/g,' ').replace(/-/g,' ')
        let tmp = '';
        for (let k = 0; k <= i; k++) { tmp = tmp + '/' + count[k] }
        send['url'] = tmp.replace('//', '/');
        send.title.length > 50 ? send.title = send.title.slice(0,50) + "..." : send.title = send.title
        return send
    });
    return final
}
