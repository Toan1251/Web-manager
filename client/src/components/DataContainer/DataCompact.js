import React from "react";
import './Data.css';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'

const DataCompact = ({name, isDown, onClick}) => {

    return (
        <button className="button-container" onClick={onClick}>
            <p className="name-container">{name}</p>
            <div className="div-icon">
                {isDown ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
            </div>
        </button>

    )
}

export default DataCompact