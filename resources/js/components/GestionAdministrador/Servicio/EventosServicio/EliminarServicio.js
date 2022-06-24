import axios from "axios";
import react from "react";
import Swal from "sweetalert2";

function EliminarServicio(event, idServicio, servicios, setservicios) {
    event.preventDefault();
    Swal.fire({
        title: "Estas Seguro de eliminar el servicio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((resultado) => {
        if (resultado.value) {
            axios
                .delete(`https://lecarespa.herokuapp.com/api/servicio/${idServicio}`)
                .then((res) => {
                    const newArray = servicios.filter(
                        (element) => element.id !== idServicio
                    );
                    setservicios(newArray);
                });
        }
    });
}

export default EliminarServicio;

