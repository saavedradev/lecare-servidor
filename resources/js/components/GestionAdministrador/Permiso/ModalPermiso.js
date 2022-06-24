import React, { Fragment, useState } from "react";
import Modal from "../../Modal";

export const ModalPermiso = ({
    valuePermiso,
    onChangeValues
}) => {
    return (
        <Modal titulo={"Permiso"} id={"verModal"} color={"rgb(14, 41, 131)"}>
            <div class="modal-body">
                <form class="form-Modal">
                    <div class="form-group">
                        <label for="exampleFormControlInput1"> Nombre empleado: </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="nombre"
                                    value={valuePermiso.nombre}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <label for="exampleFormControlInput1">
                            {" "}
                            Fecha del permiso:{" "}
                        </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="fecha"
                                    value={valuePermiso.fecha}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <label for="exampleFormControlInput1"> Hora inicio: </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="hora_inicio"
                                    value={valuePermiso.hora_inicio}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <label for="exampleFormControlInput1"> Hora final: </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="hora_final"
                                    value={valuePermiso.hora_final}
                                    disabled={true}
                                />
                            </div>
                        </div><label for="exampleFormControlInput1">Estado</label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="estado"
                                    value={valuePermiso.estado}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <label for="exampleFormControlInput1"> Motivo: </label>
                        <div class="row">
                            <div class="col">
                                <textarea
                                    type="text"
                                    class="form-control"
                                    name="motivo"
                                    value={valuePermiso.motivo}
                                    disabled={true}
                                    style={{ resize:"none" }}
                                >

                                </textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer row justify-content-center">
            <button className="btn btn-danger" data-bs-dismiss="modal" onClick={onChangeValues}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default ModalPermiso;
