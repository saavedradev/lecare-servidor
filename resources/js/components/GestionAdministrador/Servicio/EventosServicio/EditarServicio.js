import axios from 'axios';
import react from 'react';
import swal from 'sweetalert';

function EditarServicio(event,campos, idServicio, setservicios){
    const data = {
        codigo:campos.id,
        nombre: campos.nombre,
        tipo: campos.tipo,
        duracion: campos.duracion,
    };
    event.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/servicio/${idServicio}`,data).then((res)=>{
        if(res.data.status==200){
            setservicios(res.data.servicios);
            swal("Success", res.data.message, "success")
        }else if(res.data.status==401){
            setErrores(res.data.validation_errors)
        }else{
            console.log(res.data.excepcion)
        }
    })



};

export default EditarServicio;
