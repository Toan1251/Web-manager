import React, { useState, useEffect} from "react";
import './Form.css';
import { importProject, selectOneProject, selectProjectStatus, changeStatus } from "../../store/ProjectSlice";
// import { store } from '../../store/store'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Popup/Popup'

const ImportProjectForm = () => {

    const dispatch = useDispatch();
    const project = useSelector(selectOneProject);
    const status = useSelector(selectProjectStatus);

    const [path, setPath] = useState('');
    const [domain, setDomain] = useState('');

    const [isImporting, setIsImporting] = useState(false);

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const removeError = () => {
        setIsError(false);
    }

    useEffect(() => {
        dispatch(changeStatus('idle'))
        const ele = document.querySelector('form');
        if(ele != null){
            ele.addEventListener('click', removeError);
            return () => {
                ele.removeEventListener('click', removeError);
            }
        }
    })
    
    const validateData = () => {
        if(path === ''){
            setMessage('Missing path');
            return false;
        }
        if(domain === ''){
            setMessage('Missing domain')
            return false;
        }
        if(!path.includes(domain)) {
            setMessage('Path is not includes domain')
            return false
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateData()) {
            setIsError(true);
            return
        }
        setIsImporting(true);
        const module = path.replace(`https://${domain}/`, '');
        dispatch(importProject({
            "url": path,
            "domain": domain,
            "module": module,
            "ignore": "commit,issues,search,milestone"            
        }));
    }

    return (
        <div>
            {isError && <Popup type="error" message={message} setIsError={setIsError} />}
            {isImporting ? <Popup type='loading' message="importing project ..." /> : 
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                    <label htmlFor="pathToProject">Path to Project</label><br />
                    <input name="pathToProject" type="text" value={path} onChange={(e) => {setPath(e.currentTarget.value)}}/>
                </div>
                <div className="form-element">
                    <label htmlFor="domain">Domain</label><br />
                    <div className="form-flex">
                        <input className='domain' name="domain" type="text" value={domain} onChange={(e) => {setDomain(e.currentTarget.value)}}/>
                        <button className="submit" type="submit">Import</button>
                    </div>
                </div>
            </form>}
            {status === 'fulfilled' && <Redirect to={`/import/result/${project.id}`} />}
        </div>
    )
}

export default ImportProjectForm;