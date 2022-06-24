import React from 'react'
import axios from 'axios'

function VerPermiso(event,idPermiso,setPermiso,permiso) {
    event.preventDefault();
    axios.get(`https://lecarespa.herokuapp.com/api/permiso/${idPermiso}`).then((res)=>{
        const permisoBuscado= res.data.permiso;
        console.log(permisoBuscado);
        setPermiso({...permiso,...permisoBuscado,nombre:res.data.empleado});
        })
}

export default VerPermiso
