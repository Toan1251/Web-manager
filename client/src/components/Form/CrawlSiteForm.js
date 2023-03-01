import React, { useState, useEffect } from "react";
import './Form.css';
import Popup from '../Popup/Popup';
// import store from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { crawlDataFromUrl, selectUrlStatus, changeStatus , selectUrlData} from "../../store/UrlSlice";
import { Redirect } from 'react-router-dom';

const CrawlSiteForm = () => {
    const dispatch = useDispatch();

    const status = useSelector(selectUrlStatus);
    const data = useSelector(selectUrlData);

    const [site, setSite] = useState('');

    const [isError, setIsError] = useState(false);
    const [isCrawling, setIsCrawling] = useState(false);
    const [message, setMessage] = useState('');

    const removeError = () => {
        setIsError(false);
    }

    useEffect(() => {
        dispatch(changeStatus('idle'));
        const ele = document.querySelector('form');
        if(ele != null) {
            ele.addEventListener('click', removeError);
            return () => {
                ele.removeEventListener('click', removeError);
            }
        }
    })
    
    const validateSite = () => {
        if(site === ''){
            setMessage('Missing site address')
            return false;
        }
        if(!site.match(/https{0,1}:\/\//)){
            setMessage('Invalid site address')
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateSite()){
            setIsError(true)
            return;
        }
        setIsCrawling(true);
        dispatch(crawlDataFromUrl(site));
    }

    return (
        <div>
            {isError && <Popup type="error" message={message} setIsError={setIsError}/>}
            {isCrawling ? <Popup type="loading" message='crawling data...' /> : 
                <form onSubmit={handleSubmit}>
                    <div className="form-element">
                        <label htmlFor="site">Site</label><br />
                        <div className="form-flex">
                            <input className='site' name="site" type="text" value={site} onChange={(e) => {setSite(e.currentTarget.value)}}/>
                            <button className="submit" type="submit">Crawl</button>
                        </div>
                    </div>
                </form>
            }
            {status === 'fulfilled' && <Redirect to={`/crawl/result/${data.data._id}`} />}
        </div>
    )
}

export default CrawlSiteForm;