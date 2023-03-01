import React, {useEffect} from "react";
import DataCompact from "./DataCompact";

const ImagesContainer = ({images, name, isDown, onClick, ctnId}) => {

    useEffect(() => {
        document.getElementById(ctnId).style.display = isDown ? 'flex' : 'none';
    }, [isDown, ctnId]);

    return (
        <div className="container">
            <DataCompact name={name} isDown={isDown} onClick={onClick}/>
            <div id={ctnId} className="images-container hidden">
                {images.map((image,index) => {
                    return (
                    <a href={image} key={index} target="_blank" rel="noreferrer">
                        <img src={image} alt={image} className='image-view'/>
                    </a>
                    )
                })}
            </div>
        </div>
    )
}

export default ImagesContainer