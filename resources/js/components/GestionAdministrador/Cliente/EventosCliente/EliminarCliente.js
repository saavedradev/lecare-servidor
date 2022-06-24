import axios from "axios";
import react from "react";
import Swal from "sweetalert2";

function EliminarCliente(event, idCliente, clientes, setClientes) {
    event.preventDefault();
    Swal.fire({
        title: "Estas Seguro de eliminar el cliente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((resultado) => {
        if (resultado.value) {
            axios
                .delete(`http://127.0.0.1:8000/api/cliente/${idCliente}`)
                .then((res) => {
                    const newArray = clientes.filter(
                        (element) => element.id !== idCliente
                    );
                    setClientes(newArray);
                });
        }
    });
}

export default EliminarCliente;
