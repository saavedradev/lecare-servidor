import { values } from 'lodash';
import React from 'react'
import Swalerror from "sweetalert2";
import swal from "sweetalert";
import axios from "axios";

function CrearPermiso(event,setPermisoValues,permisoValues,vaciarCampos,setTablePermiso,setErrores) {
    event.preventDefault();
    const data={
        cedula_empleado:permisoValues.cedula_empleado,
        fecha: permisoValues.fecha,
        hora_inicio: permisoValues.hora_inicio,
        hora_final: permisoValues.hora_final,
        motivo: permisoValues.motivo,
    }
    axios.post("http://127.0.0.1:8000/api/permisoEmpleado",data).then((res)=>{
        if(res.data.status==200){
            const permisos= res.data.permisos;
            setTablePermiso(permisos);
            setPermisoValues({...permisoValues,...vaciarCampos});
            swal("Success", res.data.message, "success");
        }else if(res.data.status==401){
            setErrores(res.data.validation_errors)
        } else if(res.data.status==306){
            Swalerror.fire({ icon: 'error',
            title: 'Oops...',
            text: res.data.message});
        }else if(res.data.status==500){
            Swalerror.fire({ icon: 'error',
            title: 'Oops...',
            text: res.data.message});
        }else{
            console.log(res.data.excepcion)
        }

        })
}

export default CrearPermiso
