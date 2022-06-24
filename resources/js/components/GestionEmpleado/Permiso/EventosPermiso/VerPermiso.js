import React from 'react'
import axios from 'axios'

function VerPermiso(event,idPermiso,setPermiso,permiso) {
    event.preventDefault();
    axios.get(`https://lecarespa.herokuapp.com/api/permisoEmpleado/${idPermiso}`).then((res)=>{
        const permisoBuscado= res.data.permiso;
        setPermiso({...permiso,...permisoBuscado});
        });
}

export default VerPermiso
