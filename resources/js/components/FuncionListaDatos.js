import React, { useEffect } from 'react'

function FuncionListaDatos(url,setData,setFiltered ) {
    const showData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        if(setData!=null){
            setData(data);
        }
        setFiltered(data);
    };
    useEffect(() => {
        showData();
    }, []);
}

export default FuncionListaDatos


