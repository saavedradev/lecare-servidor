import React, { Fragment, useState } from "react";
import Modal from "../../Modal";

export const ModalCliente = ({
    children,
    tituloModal,
    idModal,
    colorModal,
    handleInputs,
    valueCliente,
    error_list,
}) => {
    const camposPassword = [
        <Fragment>
            <div className="col-12">
            <label for="exampleFormControlInput1"> Contraseña: </label>
            <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Contraseña"
                onChange={handleInputs}
                value={valueCliente.password}
            />
            <span class="text-danger">{error_list.password}</span>
            </div>
            <div className="col-12">
            <label for="exampleFormControlInput1">
                {" "}
                Confirmar contraseña:{" "}
            </label>
            <input
                type="password"
                class="form-control"
                name="password_confirmation"
                placeholder="Confirmar contraseña"
                onChange={handleInputs}
                value={valueCliente.password_confirmation}
            />
            <span class="text-danger">{error_list.password_confirmation}</span>
            </div>

        </Fragment>,
    ];
    return (
        <Modal titulo={tituloModal} id={idModal} color={colorModal}>
            <div class="modal-body">
                <form class="form-Modal">
                    <div class="form-group">
                        <div className="col-12">
                        <label for="exampleFormControlInput1">
                            {" "}
                            Identificación:{" "}
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            name="id"
                            placeholder="Identificacion"
                            onChange={handleInputs}
                            value={valueCliente.id}
                            disabled={
                                idModal == "eliminarModal" ||
                                idModal == "verModal"
                                    ? true
                                    : false
                            }
                        />
                        <span class="text-danger">{error_list.id} </span>
                        </div>
                        <label for="exampleFormControlInput1"> Nombres: </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Primer nombre"
                                    onChange={handleInputs}
                                    name="primer_nombre"
                                    value={valueCliente.primer_nombre}
                                    disabled={
                                        idModal == "eliminarModal" ||
                                        idModal == "verModal"
                                            ? true
                                            : false
                                    }
                                />
                                <span class="text-danger">
                                    {error_list.primer_nombre}
                                </span>
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Segundo nombre"
                                    name="segundo_nombre"
                                    onChange={handleInputs}
                                    value={valueCliente.segundo_nombre}
                                    disabled={
                                        idModal == "eliminarModal" ||
                                        idModal == "verModal"
                                            ? true
                                            : false
                                    }
                                />
                                <span class="text-danger">
                                    {error_list.segundo_nombre}
                                </span>
                            </div>
                        </div>

                        <label for="exampleFormControlInput1">
                            {" "}
                            Apellidos:{" "}
                        </label>
                        <div class="row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Primer apellido"
                                    name="primer_apellido"
                                    onChange={handleInputs}
                                    value={valueCliente.primer_apellido}
                                    disabled={
                                        idModal == "eliminarModal" ||
                                        idModal == "verModal"
                                            ? true
                                            : false
                                    }
                                />
                                <span class="text-danger">
                                    {error_list.primer_apellido}
                                </span>
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Segundo apellido"
                                    name="segundo_apellido"
                                    onChange={handleInputs}
                                    value={valueCliente.segundo_apellido}
                                    disabled={
                                        idModal == "eliminarModal" ||
                                        idModal == "verModal"
                                            ? true
                                            : false
                                    }
                                />
                                <span class="text-danger">
                                    {error_list.segundo_apellido}
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                        <label for="exampleFormControlInput1"> Celular: </label>
                        <input
                            type="text"
                            class="form-control"
                            name="telefono"
                            placeholder="Celular"
                            onChange={handleInputs}
                            value={valueCliente.telefono}
                            disabled={
                                idModal == "eliminarModal" ||
                                idModal == "verModal"
                                    ? true
                                    : false
                            }
                        />
                        <span class="text-danger">
                                    {error_list.telefono}
                        </span>
                        </div>

                        <label for="exampleFormControlInput1"> Correo: </label>
                        <input
                            type="text"
                            class="form-control"
                            name="email"
                            placeholder="Correo"
                            value={valueCliente.email}
                            onChange={handleInputs}
                            disabled={
                                idModal == "eliminarModal" ||
                                idModal == "verModal"
                                    ? true
                                    : false
                            }
                        />
                        <span class="text-danger">
                                    {error_list.email}
                        </span>
                        {idModal == "editarModal" || idModal == "registrarModal"
                            ? [camposPassword]
                            : ""}
                    </div>
                </form>
            </div>
            <div class="modal-footer row justify-content-center">
                {children}
            </div>
        </Modal>
    );
};

export default ModalCliente;
