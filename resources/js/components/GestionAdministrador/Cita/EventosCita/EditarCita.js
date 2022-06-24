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
    empleadosCita,
    setEmpleadosCita,
    setCampocampoCedulaCliente,
    setTableCitas,
    setErrores
) {
    event.preventDefault();
    let idServicios = [];
    serviciosCliente.map((element) => {
        idServicios.push(element.id);
    });

    let idEmpleados = [];
    empleadosCita.map((element) => {
        idEmpleados.push(element.id);
    });
    console.log(idServicios)
    const data = {
        id: campos.id,
        cedula_cliente: campos.cedula_cliente,
        estado_cita: campos.estado_cita,
        estado_pago: campos.estado_pago,
        fecha: campos.fecha,
        horario: campos.horario,
        servicios: idServicios,
        empleados: idEmpleados
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.put(`http://127.0.0.1:8000/api/cita/${campos.id}`,data).then((res) => {
            if (res.data.status === 200) {
                swal("Editado Exitosamente", res.data.message, "success");
                setTableCitas(res.data.citas);
                setCamposCitas(vaciarCampos);
                setServiciosCliente([]);
                setEmpleadosCita([]);
                setCampocampoCedulaCliente("")
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
    if (localStorage.getItem("valorVerdad") == "true") {
        return true;
    }
}

export default EditarCita
