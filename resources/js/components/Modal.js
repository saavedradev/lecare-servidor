import React from 'react'

export const Modal = ({children,id, titulo, color}) => {
    return (
            <div class="modal fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header " style={{background: color}}>
                            <h5 class="modal-title" style={{color: 'white'}}>{titulo}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
                        </div>
                            {children}
                    </div>
                </div>
            </div>
        )

}

export default Modal;
