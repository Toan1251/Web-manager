import React from 'react';
import './DependencyTable.css'
import { Link } from 'react-router-dom';

const DependencyTable = ({path, dependenciesList}) => {

    const getVer = (ver) => {
        let version = `${ver.major}.${ver.minor}.${ver.patch}`
        if(ver.pre_release != null){
            version += `-${ver.pre_release}`
        }
        return version;
    }

    return (
        <div className="container">
            <p><strong>Path to Project: </strong><span className="path">{path}</span></p>
            <table>
                <thead>
                    <tr>
                        <th className="dependency">dependency</th>
                        <th className="version">version</th>                
                    </tr>
                </thead>
                <tbody>
                    {dependenciesList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="dependency"><Link to={`/import/dependency?name=${item.name}&v=${getVer(item.ver)}`}>{item.name}</Link></td>
                                <td className="version">{getVer(item.ver)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DependencyTable;