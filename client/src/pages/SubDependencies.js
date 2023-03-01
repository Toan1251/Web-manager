import React, {useMemo} from "react";
import DependencyInfo from "../components/DependencyInfo/DependencyInfo";
import { useLocation } from "react-router-dom";

const SubDependencies = () => {

    const { search } = useLocation();
    const queryParams = useMemo(() => { 
        return new URLSearchParams(search);
    }, [search]);

    const version = queryParams.get('v');
    const name = queryParams.get('name');

    return (
        <DependencyInfo dependency={name} version={version} />
    )
}

export default SubDependencies;