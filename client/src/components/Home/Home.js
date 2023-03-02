import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiLoader } from 'react-icons/fi';

import { selectProjects, selectProjectStatus, loadProjects} from '../../store/ProjectSlice';
// import { store } from '../../store/store';
const Home = () => {
    const projects = useSelector(selectProjects);
    const projectStatus = useSelector(selectProjectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProjects());
    }, [dispatch])

    return (
        <div className='projects-container'>
            <h1>Imported Projects List</h1>
            {projectStatus === 'loading' ? <FiLoader className='loading-container'/> : projects.map(project => {
                return (
                    <Link key={project._id} to={`/import/result/${project._id}`}>
                        <div className='project-container'>
                            <p className='name'><strong>Name: </strong>{project.name}</p>
                            <p className='root_url'><strong>Url: </strong>{project.root_url}</p>
                            <div className='mini-container'>
                                <p><strong>Create At: </strong>{new Date(project.createdAt).toLocaleString('vi-VI')}</p>
                                <p><strong>Last Updated: </strong>{new Date(project.updatedAt).toLocaleString('vi-VI')}</p>
                            </div>
                            <div className='mini-container' >
                                <p><strong>Dependencies: </strong>{project.dependencies.length}</p>
                                <p><strong>Dev Dependencies: </strong>{project.devDependencies.length}</p>
                            </div>                                
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Home;