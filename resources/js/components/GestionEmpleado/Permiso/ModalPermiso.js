import React, { Fragment, useState } from "react";
import Modal from "../../Modal";

export const ModalPermiso = ({
    valuePermiso,
    onChangeValues,
    children,
    idModal,
    tituloModal,
    colorModal,
    error_list
}) => {
    const campoEstadoPermiso=[
        <Fragment>
        <label for="exampleFormControlInput1">Estado</label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="estado"
                                    value={valuePermiso.estado}
                                    onChange={onChangeValues}
                                    disabled={true}
                                />
                            </div>
                </div>
    </Fragment>
    ]
    return (
        <Modal titulo={tituloModal} id={idModal} color={colorModal}>
            <div class="modal-body">
                <form class="form-Modal">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">
                            {" "}
                            Fecha del permiso:{" "}
                        </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="date"
                                    class="form-control"
                                    name="fecha"
                                    onChange={onChangeValues}
                                    value={valuePermiso.fecha}
                                    disabled={idModal=="verModal"?true:false}
                                />
                            </div>
                            <span class="text-danger">
                                        {error_list.fecha}
                            </span>
                        </div>
                        <label for="exampleFormControlInput1"> Hora inicio: </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="time"
                                    class="form-control"
                                    name="hora_inicio"
                                    onChange={onChangeValues}
                                    value={valuePermiso.hora_inicio}
                                    disabled={idModal=="verModal"?true:false}
                                />
                            </div>
                            <span class="text-danger">
                                        {error_list.hora_inicio}
                            </span>
                        </div>
                        <label for="exampleFormControlInput1"> Hora final: </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="time"
                                    class="form-control"
                                    name="hora_final"
                                    onChange={onChangeValues}
                                    value={valuePermiso.hora_final}
                                    disabled={idModal=="verModal"?true:false}
                                />
                            </div>
                            <span class="text-danger">
                                        {error_list.hora_final}
                            </span>
                        </div>
                        {idModal=="verModal"?campoEstadoPermiso:""}
                        <label for="exampleFormControlInput1"> Motivo: </label>
                        <div class="row">
                            <div class="col">
                                <textarea
                                    type="text"
                                    class="form-control"
                                    name="motivo"
                                    value={valuePermiso.motivo}
                                    onChange={onChangeValues}
                                    disabled={idModal=="verModal"?true:false}
                                    style={{ resize:"none" }}
                                >

                                </textarea>
                            </div>
                            <span class="text-danger">
                                        {error_list.motivo}
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer row justify-content-center">
            {children}
            </div>
        </Modal>
    );
};

export default ModalPermiso;
