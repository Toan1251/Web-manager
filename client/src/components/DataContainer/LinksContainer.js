import React, {useEffect} from 'react';
import DataCompact from './DataCompact'

const LinksContainer = ({links, name, isDown, onClick, ctnId}) => {

    useEffect(() => {
        document.getElementById(ctnId).style.display = isDown ? 'flex' : 'none';
    }, [isDown, ctnId]);

    return (
        <div className="container">
            <DataCompact name={name} isDown={isDown} onClick={onClick}/>
            <ul id={ctnId} className="links-container hidden">
                {links.map((link, index) => {
                    return (
                        <li key={index}>
                            <a href={link} target="_blank" rel="noreferrer"><p>{link}</p></a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}

export default LinksContainer;