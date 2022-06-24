import React from "react";
import swal from "sweetalert";
import swalerror from "sweetalert2";

function CrearEmpleado(
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
    console.log(idEmpleados);
    const data = {
        cedula_cliente: campos.cedula_cliente,
        estado_cita: campos.estado_cita,
        estado_pago: campos.estado_pago,
        fecha: campos.fecha,
        horario: campos.horario,
        servicios: idServicios,
        empleados: idEmpleados
    };
    console.log(campos.cedula_cliente)
    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post("http://127.0.0.1:8000/api/cita", data).then((res) => {
            if (res.data.status === 200) {
                swal("Registrado Exitosamente", res.data.message, "success");
                setTableCitas(res.data.citas);
                setCamposCitas({...campos,...vaciarCampos});
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

export default CrearEmpleado;
