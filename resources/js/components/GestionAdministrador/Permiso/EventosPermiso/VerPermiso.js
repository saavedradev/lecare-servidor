import React from 'react'
import axios from 'axios'

function VerPermiso(event,idPermiso,setPermiso,permiso) {
    event.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/permiso/${idPermiso}`).then((res)=>{
        const permisoBuscado= res.data.permiso;
        console.log(permisoBuscado);
        setPermiso({...permiso,...permisoBuscado,nombre:res.data.empleado});
        })
}

export default VerPermiso
