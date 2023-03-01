import React, { useEffect, useState } from 'react'
import './DependencyInfo.css';
import axios from 'axios';

const DependencyInfo = ({dependency, version}) => {

    const [dependencyList, setDependencyList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/dependency?d=${dependency}&v=${version}`);
            const data = await res.data;
            return data;
        }
        fetchData().then(data => setDependencyList(data.dependencies))
    }, [dependency, version])

    const reconstructList = (list) => {
        const newList = [...list];
        const a = newList.length % 4;
        if( a !== 0 ){
            for(let i = 0; i < 4-a; i++) {
                newList.push('')
            }
        }

        const returnList = [];
        for(let i = 0; i < newList.length; i+=4){
            returnList.push([
                newList[i], newList[i+1], newList[i+2], newList[i+3]
            ])
        }
        return returnList;
    }

    return (
        <div className="container">
            <div className="description">
                <p className="description-item"><strong>Package: </strong><span>{dependency}</span></p>
                <p className="description-item"><strong>Version: </strong><span>{version}</span></p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>dependency</th>
                        <th>dependency</th>
                        <th>dependency</th>
                        <th>dependency</th>
                    </tr>
                </thead>
                <tbody>
                    {dependencyList.length === 0 ? [[1,2,3,4],[5,6,7,8]].map((ele,index) => {
                        return (<tr key={index}>{ele.map(num => {
                            return (<td key={num}></td>)
                        })}</tr>)
                    }) : reconstructList(dependencyList).map((miniList,index) => {
                        return (<tr key={index}>{miniList.map(dependency => {
                            return (<td key={dependency}>{dependency}</td>)
                        })}</tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DependencyInfo