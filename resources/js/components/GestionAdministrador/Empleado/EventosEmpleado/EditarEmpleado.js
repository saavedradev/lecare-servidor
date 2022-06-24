import axios from 'axios';
import react from 'react';
import swal from 'sweetalert';

function EditarEmpleado(event,campos, setEmpleados,setRegister,servicioSeleccionado,vaciarCampos,setServiciosEmpleado,setErrores){
    console.log(campos);
    let idServicios=[]
    servicioSeleccionado.map(element=>{
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
    event.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/empleado/${campos.id}`,data).then((res)=>{
        if(res.data.status==200){
            setEmpleados(res.data.empleados);
            setRegister(vaciarCampos)
            setServiciosEmpleado([])
            swal("Editado Exitosamente", res.data.message, "success")
        }else if(res.data.status==401){
            setErrores(res.data.validation_errors)
        }else{
            console.log(res.data.excepcion)
        }
    })



};

export default EditarEmpleado;
