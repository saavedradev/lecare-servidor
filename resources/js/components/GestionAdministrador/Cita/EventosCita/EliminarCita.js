import React from 'react'
import axios from "axios";
import Swal from "sweetalert2";

function EliminarCita(event,idCita,setCitas,citas) {
    event.preventDefault();
    Swal.fire({
        title: "Estas Seguro de cancelar la cita",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Cancelar",
        cancelButtonText: "Abortar",
    }).then((resultado) => {
        if (resultado.value) {
            axios
                .delete(`https://lecarespa.herokuapp.com/api/cita/${idCita}`)
                .then((res) => {
                    const newArray = citas.filter(
                        (element) => element.id !== idCita
                    );
                    setCitas(newArray);
                });
        }
    });
}

export default EliminarCita


