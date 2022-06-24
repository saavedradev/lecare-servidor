import { isEmpty } from 'lodash';
import React from 'react'
import Swal from 'sweetalert2';

function Agregarvalue(event,setValue,value,listado,valueSeleccionado,mensaje) {
    event.preventDefault();
    var seleccionado = false;
     if(valueSeleccionado==""){
        seleccionado=true;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes seleccionar un ' + mensaje + '!'
          }
          )
    }

    console.log(valueSeleccionado)
    value.map(element=>{
        if(element.id==valueSeleccionado ){
            seleccionado=true;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El ' + mensaje + ' ya ha sido agregado!'
              }
              )
        }
});
    console.log(seleccionado)
    listado.map(element=>{
            if(element.id==valueSeleccionado && seleccionado==false){
                setValue([...value,element]);

            }
        })
}

export default Agregarvalue

