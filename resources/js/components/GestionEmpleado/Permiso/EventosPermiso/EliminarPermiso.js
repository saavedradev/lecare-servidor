import React from 'react'
import Swal from "sweetalert2";
import axios from "axios";

function EliminarPermiso(event,idPermiso,tablePermisos,setTablePermisos) {
    event.preventDefault();
    Swal.fire({
        title: "Estas Seguro de eliminar el permiso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((resultado) => {
        if (resultado.value) {
            axios
                .delete(`http://127.0.0.1:8000/api/permisoEmpleado/${idPermiso}`)
                .then((res) => {
                    const newArray = tablePermisos.filter(
                        (element) => element.id !== idPermiso
                    );
                    setTablePermisos(newArray);
                });
        }
    });
}

export default EliminarPermiso
