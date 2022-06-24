import React from "react";
import swal from "sweetalert";

function CrearEmpleado(event, campos,setRegister,vaciarCampos, setvariableTable,serviciosEmpleado,setServiciosEmpleado,setErroresList){
    event.preventDefault();
    let idServicios=[]
    serviciosEmpleado.map(element=>{
        idServicios.push(element.id);
    });
    const data = {
        id: campos.id,
        primer_nombre: campos.primer_nombre,
        segundo_nombre: campos.segundo_nombre,
        primer_apellido: campos.primer_apellido,
        segundo_apellido: campos.segundo_apellido,
        telefono: campos.telefono,
        direccion: campos.direccion,
        email: campos.email,
        password: campos.password,
        password_confirmation: campos.password_confirmation,
        rol: campos.rol,
        servicios: idServicios
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post("https://lecarespa.herokuapp.com/api/empleado", data).then((res) => {
            if (res.data.status === 200) {
                setvariableTable(res.data.empleados);
                swal("Registrado exitosamente", res.data.message, "success")
                setRegister(vaciarCampos);
                setServiciosEmpleado([]);
                console.log(res.data.servicios)
            } else if (res.data.status === 401) {
                setErroresList(res.data.validation_errors)
            } else {
                console.log(res.data.excepcion)
            }
        });
    });
    if(localStorage.getItem('valorVerdad')=="true"){
        return true;
    }

};

export default CrearEmpleado;
