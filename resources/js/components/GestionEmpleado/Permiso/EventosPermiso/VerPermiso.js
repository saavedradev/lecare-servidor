import React from 'react'
import axios from 'axios'

function VerPermiso(event,idPermiso,setPermiso,permiso) {
    event.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/permisoEmpleado/${idPermiso}`).then((res)=>{
        const permisoBuscado= res.data.permiso;
        setPermiso({...permiso,...permisoBuscado});
        });
}

export default VerPermiso
