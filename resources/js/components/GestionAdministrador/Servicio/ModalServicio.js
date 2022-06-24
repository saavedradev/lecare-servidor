import React, { Fragment, useState } from "react";
import Modal from "../../Modal";

export const ModalServicio = ({
    children,
    tituloModal,
    idModal,
    colorModal,
    handleInputs,
    valueServicio,
    error_list
}) => {

    const codigoCampo=[
        <Fragment>
            <label for="exampleFormControlInput1">
                            {" "}
                            Codigo:{" "}
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            name="id"
                            placeholder="Codigo"
                            onChange={handleInputs}
                            value={valueServicio.id}
                            disabled={
                                idModal == "eliminarModal" ||
                                idModal == "verModal"
                                    ? true
                                    : false
                            }
                        />
        </Fragment>
    ]
    return (
        <Modal titulo={tituloModal} id={idModal} color={colorModal}>
            <div class="modal-body">
                <form class="form-Modal">
                    <div class="form-group">
                        {idModal=="verModal"?[codigoCampo]:""}
                        <label for="exampleFormControlInput1"> Nombre Servicio: </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Nombre Servicio"
                                    onChange={handleInputs}
                                    name="nombre"
                                    value={valueServicio.nombre}
                                    disabled={
                                        idModal == "eliminarModal" ||
                                        idModal == "verModal"
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <span class="text-danger">{error_list.nombre}</span>
                        </div>
                        <label for="exampleFormControlInput1">
                            {" "}
                            Tipo servicio:{" "}
                        </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Tipo Servicio"
                                    name="tipo"
                                    onChange={handleInputs}
                                    value={valueServicio
                                .tipo}
                                    disabled={
                                        idModal == "eliminarModal" ||
                                        idModal == "verModal"
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <span class="text-danger">{error_list.tipo}</span>
                        </div>
                        <label for="exampleFormControlInput1"> Duracion: </label>
                        <input
                            type="text"
                            class="form-control"
                            name="duracion"
                            placeholder="Duración"
                            onChange={handleInputs}
                            value={valueServicio
                        .duracion}
                            disabled={
                                idModal == "eliminarModal" ||
                                idModal == "verModal"
                                    ? true
                                    : false
                            }
                        />
                        <span class="text-danger">{error_list.duracion}</span>
                    </div>
                </form>
            </div>
            <div class="modal-footer row justify-content-center">
                {children}
            </div>
        </Modal>
    );
};

export default ModalServicio;
