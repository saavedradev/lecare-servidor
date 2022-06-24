import axios from "axios";
import react from "react";
import Swal from "sweetalert2";

function EliminarEmpleado(event, idEmpleado, empleados, setEmpleados) {
    event.preventDefault();
    Swal.fire({
        title: "Estas Seguro de eliminar el empleado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((resultado) => {
        if (resultado.value) {
            axios
                .delete(`http://127.0.0.1:8000/api/empleado/${idEmpleado}`)
                .then((res) => {
                    const newArray = empleados.filter(
                        (element) => element.id !== idEmpleado
                    );
                    setEmpleados(newArray);
                });
        }
    });
}

export default EliminarEmpleado;

