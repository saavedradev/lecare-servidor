import React from "react";
import swal from "sweetalert";

function CrearCliente (event, campos, setvariableTable,setErrores){
    event.preventDefault();
    const data = {
        id: campos.id,
        primer_nombre: campos.primer_nombre,
        segundo_nombre: campos.segundo_nombre,
        primer_apellido: campos.primer_apellido,
        segundo_apellido: campos.segundo_apellido,
        telefono: campos.telefono,
        email: campos.email,
        password: campos.password,
        password_confirmation: campos.password_confirmation,
        realizadorRegistro: "administrador"
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post("https://lecarespa.herokuapp.com/api/register", data).then((res) => {
            if (res.data.status === 200) {
                setvariableTable(res.data.clientes);
                swal("Registrado Exitosamente", res.data.message, "success")
                localStorage.setItem('valorVerdad',"true");

            } else if (res.data.status === 201) {
                swal("warning", res.data.message, "warning");
            } else {
                setErrores(res.data.validation_errors);
            }
        });
    });
    if(localStorage.getItem('valorVerdad')=="true"){
        return true;
    }

};

export default CrearCliente;
