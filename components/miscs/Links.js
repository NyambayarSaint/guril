import Link from 'next/link'
import { FiChevronDown } from 'react-icons/fi'
import { motion } from 'framer-motion'

const ulMotion = {
    rest: {
        opacity: 0,
        y: -10,
        ease: 'easeOut',
        duration: 0.15,
        type: 'tween',
        scaleY: 0
    },
    hover: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
            duration: 0.15,
            type: "tween",
            ease: "easeIn"
        }
    }
}

const Links = (props) => {
    return (
        props.data.map((link, i) => {
            if (link.children) {
                return (
                    <motion.a key={link.url + i} className="parent-menu-a" initial="rest" whileHover="hover" animate="rest">
                        {link.title}
                        <FiChevronDown />
                        <motion.ul variants={ulMotion}>
                            {link.children.map((ch, k) => {
                                return (
                                    <Link key={`ch${k}`} href={ch.url}>
                                        <a>{ch.title}</a>
                                    </Link>
                                )
                            })}
                        </motion.ul>
                    </motion.a>
                )
            }
            else {
                return (
                    <Link key={link.url + i} href={link.url}>
                        <a className="parent-menu-a">
                            {link.title}
                        </a>
                    </Link>
                )
            }

        })
    )
}

export default Links