import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
function EstadoPermiso(e,idPermiso,setTable) {
    function editar(data){
        axios.put(`https://lecarespa.herokuapp.com/api/permiso/${idPermiso}`,data).then((res)=>{
        if(res.data.status==200){
            swal("Success", res.data.message, "success")
            setTable(res.data.permisos)
        }
    })
    }
    e.preventDefault();
    Swal.fire({
        title: '<strong>Solicitud de permiso</strong>',
        icon: 'info',
        text:
          'A continuación, dar respuesta al permiso',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Aprobar!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> Desaprobar!',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result)=>{
        if(result.value){
            const data={
                id:idPermiso,
                realizado: "administrador",
                respuesta: "aprobado"
            }
           editar(data);
        }else{
            const data={
                id:idPermiso,
                realizado: "administrador",
                respuesta: "desaprobado"
            }
            editar(data);
        }
      })

}

export default EstadoPermiso
