import React, { useState, useEffect } from "react";
import '../components/DataContainer/Data.css'
import '../components/Popup/Popup.css'
import ImagesContainer from "../components/DataContainer/ImagesContainer";
import LinksContainer from "../components/DataContainer/LinksContainer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi'
// import {store} from '../store/store'

import { selectUrlData, selectUrlStatus, getDataById, changeStatus } from "../store/UrlSlice";

const CrawlResult = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const data = useSelector(selectUrlData);
    const status = useSelector(selectUrlStatus);

    useEffect(() => {
        dispatch(getDataById(id));
        setTimeout(() => {
            dispatch(changeStatus('idle'));
        }, 2000)
    }, [dispatch, id])


    const [imagesDown, setImagesDown] = useState(false);
    const [stylesDown, setStylesDown] = useState(false);
    const [scriptsDown, setScriptsDown] = useState(false);
    const [linksDown, setLinksDown] = useState(false);

    const setAllDown = () =>{
        setImagesDown(false);
        setStylesDown(false);
        setScriptsDown(false);
        setLinksDown(false);
    }

    return (
        <div>
            {status === 'loading' ? <FiLoader className="loading-animation" /> : 
            <div className="data-container">
                <p className="website"><strong>Website: </strong><a href={`${data.data.url}`} target="_blank" rel="noreferrer">{data.data.url}</a></p>
                <ImagesContainer ctnId='image-container' images={data.data.images}  name="Images" isDown={imagesDown} onClick={() => {const isDown = imagesDown; setAllDown(); setImagesDown(!isDown);}}/>
                <LinksContainer ctnId='stylesheet-container' links={data.data.stylesheets} name='Stylesheets' isDown={stylesDown} onClick={() => {const isDown = stylesDown; setAllDown(); setStylesDown(!isDown);}}/>
                <LinksContainer ctnId='script-container' links={data.data.scripts} name="Scripts" isDown={scriptsDown} onClick={() => {const isDown = scriptsDown; setAllDown(); setScriptsDown(!isDown);}} />
                <LinksContainer ctnId='link-container' links={data.data.hyperlinks} name="Links" isDown={linksDown} onClick={() => {const isDown = linksDown; setAllDown(); setLinksDown(!isDown);}}/>
            </div>}
        </div>

    )

}

export default CrawlResult;