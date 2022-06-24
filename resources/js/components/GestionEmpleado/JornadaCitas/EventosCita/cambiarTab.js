import React from 'react'
import axios from 'axios';

export default function cambiarTab(setkey,info,setTable,valueEmpleado) {
    const data={
        cedula:valueEmpleado.cedula_empleado,
        fecha: info
    }
    axios.post("https://lecarespa.herokuapp.com/api/jornadaCitasDia",data).then((res) => {
         setTable(res.data.citas);
         console.log(res.data.id)
        if(!(res.data.citas.length===0)){
            setkey('horario');
        }else{

        }

    });

}

