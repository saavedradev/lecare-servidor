import React,{useEffect} from 'react'

function BusquedaCita(listadoCitas,setFiltered,search) {
    useEffect(() => {
        const result = listadoCitas.filter((value) => {
            return value.clientes[0].primer_nombre.toLowerCase().includes(search.toLowerCase());
        });
        setFiltered(result);
    }, [search]);
}

export default BusquedaCita
