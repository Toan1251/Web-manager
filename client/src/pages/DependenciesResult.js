import React, { useEffect } from "react";
import DependencyTable from "../components/DependencyTable/DependencyTable";
import { useParams } from "react-router-dom";
import { FiLoader } from 'react-icons/fi'
import '../components/Popup/Popup.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectDependenciesList, selectDependenciesStatus, selectPath, loadDependencies } from "../store/DependencySlice";

const DependenciesResult = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const dependenciesList = useSelector(selectDependenciesList);
    const status = useSelector(selectDependenciesStatus);
    const path = useSelector(selectPath);

    useEffect(() => {
        dispatch(loadDependencies(id));
    }, [dispatch, id])

    return (
        <div>
            {status === 'loading' ? <FiLoader className="loading-animation" /> : <DependencyTable path={path} dependenciesList={dependenciesList} />}
        </div>
    )
}

export default DependenciesResult;