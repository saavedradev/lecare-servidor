import axios from 'axios';
import React from 'react'


function VerEmpleado(event,mostrarpagina, idEmpleado,setServiciosEmpleado, setEmpleado,empleado,setKey) {
  event.preventDefault();
  axios.get(`http://127.0.0.1:8000/api/empleado/${idEmpleado}`).then((res)=>{
      const empleadoBuscado= res.data.empleado;
      empleadoBuscado.rol = res.data.rol
      setEmpleado({...empleado,...empleadoBuscado});
      setServiciosEmpleado(res.data.servicios)
      setKey(mostrarpagina)
      console.log(empleadoBuscado)
      })
}
export default VerEmpleado;
