import axios from 'axios';
import react from 'react';
import swal from 'sweetalert';

function EditarCliente(event,campos, idCliente, setClientes,setErrores){
    console.log(campos);
    const EditCliente = {
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
    event.preventDefault();
    axios.put(`https://lecarespa.herokuapp.com/${idCliente}`,EditCliente).then((res)=>{
        if(res.data.status==200){
            setClientes(res.data.clientes);
            swal("Editado Exitosamente", res.data.message, "success")
        }else{
            setErrores(res.data.validation_errors)
        }
    })



};

export default EditarCliente;
