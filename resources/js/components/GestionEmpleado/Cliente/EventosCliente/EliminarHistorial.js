import Swal from "sweetalert2";
import axios from "axios";

function EliminarHistorial(event,idHistorial,setTable,valuesTable) {
    event.preventDefault();
    Swal.fire({
        title: "Estas Seguro de eliminar el historial",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((resultado) => {
        if (resultado.value) {
            axios
                .delete(`http://127.0.0.1:8000/api/historial/${idHistorial}`)
                .then((res) => {
                    const newArray = valuesTable.filter(
                        (element) => element.id !== idHistorial
                    );
                    setTable(newArray);
                });
        }
    });
}

export default EliminarHistorial
