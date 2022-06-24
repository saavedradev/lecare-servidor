import React from "react";
import axios from "axios";

function BuscarUser(valuesUser, setValuesUser) {
   
    const data = {
        userRol: valuesUser.userRol,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.get(`http://127.0.0.1:8000/api/buscarUser/${valuesUser.id}`, data).then((res) => {
            if (res.data.status === 200) {
                setValuesUser({...valuesUser,...res.data.user})
            }else{
                alert(res.data.excepcion)
            }
        });
    });
}

export default BuscarUser;
