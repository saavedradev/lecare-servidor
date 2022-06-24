import axios from "axios";
import React from "react";

function VerEmpleado(
    event,
    mostrarpagina,
    idCita,
    setServiciosSolicitados,
    setCita,
    cita,
    setKey
) {
    event.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/jornadaDetalleCita/${idCita}`).then((res) => {
        const citaBuscada = res.data.cita;
        setCita({
            ...cita,
            ...citaBuscada,
            nombre_cliente: res.data.cliente,
        });
        setServiciosSolicitados(res.data.servicios);
        localStorage.setItem('auth-cedulaPaciente',res.data.clienteCedula);
        setKey(mostrarpagina);
        console.log(res.data.cliente);
    });
}
export default VerEmpleado;
