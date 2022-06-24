import React from 'react'
import swal from "sweetalert";
import swalerror from "sweetalert2";
import axios from 'axios'

function EditarCita(
    event,
    campos,
    setCamposCitas,
    vaciarCampos,
    serviciosCliente,
    setServiciosCliente,
    setTableCitas,
    setErrores
) {
    event.preventDefault();
    let idServicios = [];
    serviciosCliente.map((element) => {
        idServicios.push(element.id);
    });

    const data = {
        fecha: campos.fecha,
        horario: campos.horario,
        servicios: idServicios
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.put(`http://127.0.0.1:8000/api/citaCliente/${campos.id}`,data).then((res) => {
            if (res.data.status === 200) {
                swal("Editado Exitosamente", res.data.message, "success");
                setTableCitas(res.data.citas);
                setCamposCitas({...campos,...vaciarCampos});
                setServiciosCliente([]);
            } else if (res.data.status === 401) {
                setErrores(res.data.validation_errors);
            } else if(res.data.status==500){
                swalerror.fire({ icon: 'error',
                title: 'Oops...',
                text: res.data.message});
            }else if(res.data.status==305){
                swalerror.fire({ icon: 'error',
                title: 'Oops...',
                text: res.data.message});
            }
            else{
                console.log(res.data.excepcion);
            }
        });
    });
}

export default EditarCita
