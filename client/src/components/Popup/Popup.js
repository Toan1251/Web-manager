import React, { useState, useEffect } from "react";
import './Popup.css';
import { FiAlertCircle, FiLoader, FiCheckCircle } from "react-icons/fi"


const ErrorPopup = ({message, type, setIsError}) => {

    const [icon, setIcon] = useState(<FiAlertCircle />);

    useEffect(() => {
        const deletePopup = () => {
            const ele = document.getElementById('popup-container')
            ele.style.animationName = 'slideOut';
            ele.style.animationDuration = '6s';
            ele.style.animationIterationCount = '1';
            setTimeout(()=> {
                ele.style.display = 'none';
                setIsError(false);
            }, 1000)
        }
        const ele = document.getElementById('popup');
        const container = document.getElementById('popup-container')
        switch(type){
            case 'error': {
                setIcon(<FiAlertCircle color="white"  />)
                ele.style.background = '#F24766'
                container.addEventListener('click', deletePopup)
                break;
            }
            case 'loading': {
                setIcon(<FiLoader color="black" className="loading-animation" />)
                ele.style.background = '#ffff64'
                break;
            }
            case 'success': {
                setIcon(<FiCheckCircle color="white" />)
                ele.style.background = '#3cff3c'
                container.addEventListener('click', deletePopup)
                break;
            }
            default : {
                return;
            }
        }
    }, [type, setIsError])


    return (
        <div className="error-container" id="popup-container">
            <div id="popup" className="error">
                <div className="div-icon">
                    {icon}
                </div>
                <p className="error-title">{type}</p>
            </div>
            <div className="message">
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ErrorPopup;