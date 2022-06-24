import React from 'react'
import Swalerror from "sweetalert2";
import swal from "sweetalert";
import axios from "axios";
function EditarHistorial(event,valueCamposHistorial,setValueCamposHistorial,vaciarCampos,setTable,setKey,setError) {
    event.preventDefault();
    const data={
        cedula: valueCamposHistorial.cedula,
        fecha:valueCamposHistorial.fecha,
        motivo:valueCamposHistorial.motivo,
        patologicos: valueCamposHistorial.patologicos,
        quirurgicos: valueCamposHistorial.quirurgicos,
        traumaticos: valueCamposHistorial.traumaticos,
        toxicos: valueCamposHistorial.toxicos,
        farmacologicos: valueCamposHistorial.farmacologicos,
        familiares: valueCamposHistorial.familiares,
        alergicos: valueCamposHistorial.alergicos,
        fur: valueCamposHistorial.fur,
        alimentacion: valueCamposHistorial.alimentacion,
        presion_arterial: valueCamposHistorial.presion_arterial,
        presión_arterial_sistolica: valueCamposHistorial.presión_arterial_sistolica,
        pulso: valueCamposHistorial.pulso,
        frecuencia_respiratoria: valueCamposHistorial.frecuencia_respiratoria,
        peso: valueCamposHistorial.peso,
        talla: valueCamposHistorial.talla,
        orl: valueCamposHistorial.orl,
        cuello: valueCamposHistorial.cuello,
        cardio: valueCamposHistorial.cardio,
        abdomen: valueCamposHistorial.abdomen,
        extremidades: valueCamposHistorial.extremidades,
        diagnostico:valueCamposHistorial.diagnostico
    }
    axios.put(`http://127.0.0.1:8000/api/historial/${valueCamposHistorial.idHistorial}`,data).then((res)=>{
        if(res.data.status==200){

            setTable(res.data.historialMedicos);
            setValueCamposHistorial({...valueCamposHistorial,...vaciarCampos});
            setKey("Buscar");
            swal("Success", res.data.message, "success");
        }else if(res.data.status==401){
            setError(res.data.validation_errors)
        } else if(res.data.status==306){
            Swalerror.fire({ icon: 'error',
            title: 'Oops...',
            text: res.data.message});
        }else{
            console.log(res.data.excepcion)
        }

        })
}

export default EditarHistorial
