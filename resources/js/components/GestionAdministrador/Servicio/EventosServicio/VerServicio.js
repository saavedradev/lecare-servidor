import axios from 'axios';
import React from 'react'


function VerServicio(event, idServicio,setIdServicio, setServicio,servicio) {
  event.preventDefault();
  axios.get(`https://lecarespa.herokuapp.com/api/servicio/${idServicio}`).then((res)=>{
      const servicioBuscado= res.data.servicio;
      setServicio({...servicio,...servicioBuscado});
      setIdServicio(idServicio);
      })
}
export default VerServicio;
