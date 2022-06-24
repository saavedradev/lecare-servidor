import React from "react";
import swal from "sweetalert";
import swalerror from "sweetalert2";

function CrearEmpleado(
    event,
    campos,
    setCamposCitas,
    vaciarCampos,
    serviciosSolicitadosCliente,
    setServiciosSolicitadosCliente,
    setTableCitas,
    setErrores
) {
    event.preventDefault();
    let idServicios = [];
    serviciosSolicitadosCliente.map((element) => {
        idServicios.push(element.id);
    });
    console.log(idServicios);
    const data = {
        cedula_cliente: campos.cedula_cliente,
        fecha: campos.fecha,
        horario: campos.horario,
        servicios: idServicios
    };
    console.log(campos.cedula_cliente)
    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post("http://127.0.0.1:8000/api/citaCliente", data).then((res) => {
            if (res.data.status === 200) {
                swal("Registrado Exitosamente", res.data.message, "success");
                setTableCitas(res.data.citas);
                setCamposCitas({...campos,...vaciarCampos});
                setServiciosSolicitadosCliente([]);
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

export default CrearEmpleado;
