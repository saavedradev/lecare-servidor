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
    axios.get(`https://lecarespa.herokuapp.com/api/cita/${idCita}`).then((res) => {
        const citaBuscada = res.data.cita;
        setCita({
            ...cita,
            ...citaBuscada
        });
        setServiciosSolicitados(res.data.servicios);
        setKey(mostrarpagina);
    });
}
export default VerEmpleado;
