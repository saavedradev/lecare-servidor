import React from "react";
import swal from "sweetalert";

function CrearServicio (event, campos, setvariableTable,setErrores){
    event.preventDefault();
    const data = {
        nombre: campos.nombre,
        tipo: campos.tipo,
        duracion: campos.duracion,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post("http://127.0.0.1:8000/api/servicio", data).then((res) => {
            if (res.data.status === 200) {
                setvariableTable(res.data.servicios);
                swal("Registrado Exitosamente", res.data.message, "success")
                console.log(res.data.id);

            } else if (res.data.status === 401) {
                setErrores(res.data.validation_errors)
            } else {
                console.log(res.data.excepcion)
            }
        });
    });
    if(localStorage.getItem('valorVerdad')=="true"){
        return true;
    }

};

export default CrearServicio;
