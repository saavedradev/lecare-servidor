import axios from 'axios';
import react from 'react';

function VerCliente(event,idCliente,setIdCliente, setcliente,cliente){
    event.preventDefault();
    axios.get(`https://lecarespa.herokuapp.com/api/cliente/${idCliente}`).then((res)=>{
    const clienteBuscado= res.data.cliente;
    setcliente({...cliente,...clienteBuscado});
    setIdCliente(idCliente);
    })



};

export default VerCliente;
