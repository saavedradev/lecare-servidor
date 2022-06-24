import React from 'react'
import axios from 'axios'
import swal from "sweetalert";
import swalerror from "sweetalert2";
function EditarPermiso(event,permisoValues,setPermisoValues,setTablePermiso,vaciarCampos,setErrores) {
    event.preventDefault();
    const data={
        fecha: permisoValues.fecha,
        hora_inicio: permisoValues.hora_inicio,
        hora_final: permisoValues.hora_final,
        motivo: permisoValues.motivo,
    }
    axios.put(`https://lecarespa.herokuapp.com/api/permisoEmpleado/${permisoValues.id}`,data).then((res)=>{
        if(res.data.status==200){
            const permisos= res.data.permisos;
            setTablePermiso(permisos);
            setPermisoValues({...permisoValues,...vaciarCampos});
            swal("Success", res.data.message, "success");
        }else if(res.data.status==401){
            setErrores(res.data.validation_errors)
        } else if(res.data.status==500){
            swalerror.fire({ icon: 'error',
            title: 'Oops...',
            text: res.data.message});
        }else if(res.data.status==305){
            swalerror.fire({ icon: 'error',
            title: 'Oops...',
            text: res.data.message});
        }else{
            console.log(res.data.excepcion)
        }

        })
}

export default EditarPermiso
