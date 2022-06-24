import axios from "axios";
import React from "react";

function VerEmpleado(
    event,
    mostrarpagina,
    idCita,
    setNombreCliente,
    setServiciosSolicitados,
    setEmpleadosCitas,
    setCita,
    cita,
    setKey
) {
    event.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/cita/${idCita}`).then((res) => {
        const citaBuscada = res.data.cita;
        setCita({
            ...cita,
            ...citaBuscada,
            cedula_cliente: res.data.clienteCedula,
        });
        setServiciosSolicitados(res.data.servicios);
        setEmpleadosCitas(res.data.empleados);
        setNombreCliente(res.data.cliente);
        setKey(mostrarpagina);
        console.log(cita);
    });
}
export default VerEmpleado;
