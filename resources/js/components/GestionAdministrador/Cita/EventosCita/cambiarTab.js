import React from 'react'
import axios from 'axios';

export default function cambiarTab(setkey,info,setTable) {

    axios.get(`http://127.0.0.1:8000/api/citas/${info}`).then((res) => {
        setTable(res.data.citas);
        if(!(res.data.citas.length===0)){
            setkey('horario');
        }else{

        }

    });

}

