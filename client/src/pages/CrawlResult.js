import React, { useState, useMemo } from "react";
import '../components/DataContainer/Data.css'
import ImagesContainer from "../components/DataContainer/ImagesContainer";
import LinksContainer from "../components/DataContainer/LinksContainer";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { store } from './../store/store';

import { selectUrlData } from "../store/UrlSlice";

const CrawlResult = () => {

    const { search } = useLocation();
    const queryParams = useMemo(() => { 
        return new URLSearchParams(search);
    }, [search]);

    const website = queryParams.get('site');
    const data = useSelector(selectUrlData);

    const [imagesDown, setImagesDown] = useState(false);
    const [stylesDown, setStylesDown] = useState(false);
    const [scriptsDown, setScriptsDown] = useState(false);
    const [linksDown, setLinksDown] = useState(false);

    const setAllDown = () =>{
        setImagesDown(false);
        setStylesDown(false);
        setScriptsDown(false);
        setLinksDown(false);
        console.log(store.getState());
    }

    return (
        <div className="data-container">
            <p className="website"><strong>Website: </strong><a href={`${website}`} target="_blank" rel="noreferrer">{website}</a></p>
            <ImagesContainer ctnId='image-container' images={data.data.images}  name="Images" isDown={imagesDown} onClick={() => {const isDown = imagesDown; setAllDown(); setImagesDown(!isDown);}}/>
            <LinksContainer ctnId='stylesheet-container' links={data.data.stylesheets} name='Stylesheets' isDown={stylesDown} onClick={() => {const isDown = stylesDown; setAllDown(); setStylesDown(!isDown);}}/>
            <LinksContainer ctnId='script-container' links={data.data.scripts} name="Scripts" isDown={scriptsDown} onClick={() => {const isDown = scriptsDown; setAllDown(); setScriptsDown(!isDown);}} />
            <LinksContainer ctnId='link-container' links={data.data.hyperlinks} name="Links" isDown={linksDown} onClick={() => {const isDown = linksDown; setAllDown(); setLinksDown(!isDown);}}/>
        </div>
    )

}

export default CrawlResult;