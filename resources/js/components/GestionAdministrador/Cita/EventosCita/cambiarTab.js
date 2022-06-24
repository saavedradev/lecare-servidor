import React from 'react'
import axios from 'axios';

export default function cambiarTab(setkey,info,setTable) {

    axios.get(`https://lecarespa.herokuapp.com/api/citas/${info}`).then((res) => {
        setTable(res.data.citas);
        if(!(res.data.citas.length===0)){
            setkey('horario');
        }else{

        }

    });

}

