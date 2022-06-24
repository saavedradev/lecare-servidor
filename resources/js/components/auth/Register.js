import React, { useState, Fragment } from "react";
import "../../../css/app.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import fondo from "../../../sass/Fondo.jpeg";

export const Register = () => {
    const navigate = useNavigate();
    const [error_list, setErrores] = useState({});
    const [vaciarCampos, setVaciarCampos] = useState({
        id: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [registerInput, setRegister] = useState({
        id: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInput = (event) => {
        event.persist();
        setRegister({
            ...registerInput,
            [event.target.name]: event.target.value,
        });
        setErrores({ ...error_list, [event.target.name]: "" });
    };

    const registerSubmit = (event) => {
        event.preventDefault();
        const data = {
            id: registerInput.id,
            primer_nombre: registerInput.primer_nombre,
            segundo_nombre: registerInput.segundo_nombre,
            primer_apellido: registerInput.primer_apellido,
            segundo_apellido: registerInput.segundo_apellido,
            telefono: registerInput.telefono,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        };
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("https://lecarespa.herokuapp.com/api/register", data)
                .then((res) => {
                    if (res.data.status === 200) {
                        localStorage.setItem("auth-token", res.data.token);
                        localStorage.setItem("auth-name", res.data.userName);
                        localStorage.setItem("auth-rolUsuario","Cliente")
                        localStorage.setItem("auth-cedula",res.data.user)
                        swal("Success", res.data.message, "success");
                        navigate("/Home");
                    } else if (res.data.status === 201) {
                        swal("warning", res.data.message, "warning");
                        setRegister(vaciarCampos);
                        console.log(registerInput);
                    } else {
                        setErrores(res.data.validation_errors);
                    }
                });
        });
    };

    return (
        <div
            className="container-fondo"
            id="fondo"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <div className="container-fondo">
                <div className="row justify-content-center mt-4 mb-4 ">
                    <div className="col-md-5  formulario">
                        <h1 class="card-title mb-3 text-center" id="titulo">
                            Registrarse
                        </h1>

                        <form
                            class="row g-3"
                            onSubmit={registerSubmit}
                            noValidate
                        >
                            <div class="col-12">
                                <label for="cedulaId" class="form-label mb-0">
                                    Cedula
                                </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    name="id"
                                    onChange={handleInput}
                                    value={registerInput.id}
                                />
                                <span class="text-danger">
                                    {error_list.id}
                                </span>
                            </div>

                            <div class="col-md-6 mt-3">
                                <label
                                    for="inputPassword4"
                                    class="form-label mb-0"
                                >
                                    Primer nombre
                                </label>
                                <input
                                    type=""
                                    class="form-control"
                                    name="primer_nombre"
                                    onChange={handleInput}
                                    value={registerInput.primer_nombre}
                                />
                                <span class="text-danger">
                                    {error_list.primer_nombre}
                                </span>
                            </div>
                            <div class="col-md-6 mt-3">
                                <label
                                    for="inputEmail4"
                                    class="form-label mb-0"
                                >
                                    Segundo nombre
                                </label>
                                <input
                                    type=""
                                    class="form-control"
                                    name="segundo_nombre"
                                    onChange={handleInput}
                                    value={registerInput.segundo_nombre}
                                />
                                <span class="text-danger">
                                    {error_list.segundo_nombre}
                                </span>
                            </div>
                            <div class="col-md-6 mt-3">
                                <label
                                    for="inputPassword4"
                                    class="form-label mb-0"
                                >
                                    Primer apellido
                                </label>
                                <input
                                    type=""
                                    class="form-control"
                                    name="primer_apellido"
                                    onChange={handleInput}
                                    value={registerInput.primer_apellido}
                                />
                                <span class="text-danger">
                                    {error_list.primer_apellido}
                                </span>
                            </div>
                            <div class="col-md-6 mt-3">
                                <label
                                    for="inputEmail4"
                                    class="form-label mb-0"
                                >
                                    Segundo apellido
                                </label>
                                <input
                                    type=""
                                    class="form-control"
                                    name="segundo_apellido"
                                    onChange={handleInput}
                                    value={registerInput.segundo_apellido}
                                />
                                <span class="text-danger">
                                    {error_list.segundo_apellido}
                                </span>
                            </div>
                            <div class="col-12 mt-3">
                                <label
                                    for="inputPassword4"
                                    class="form-label mb-0"
                                >
                                    Telefono
                                </label>
                                <input
                                    type=""
                                    class="form-control"
                                    name="telefono"
                                    onChange={handleInput}
                                    value={registerInput.telefono}
                                />
                                <span class="text-danger">
                                    {error_list.telefono}
                                </span>
                            </div>
                            <div class="col-12 mt-3">
                                <label
                                    for="inputEmail4"
                                    class="form-label mb-0"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    class="form-control"
                                    name="email"
                                    onChange={handleInput}
                                    value={registerInput.email}
                                />
                                <span class="text-danger">
                                    {error_list.email}
                                </span>
                            </div>
                            <div class="col-md-6 mt-3">
                                <label
                                    for="inputPassword4"
                                    class="form-label mb-0"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="password"
                                    onChange={handleInput}
                                    value={registerInput.password}
                                />
                                <span class="text-danger">
                                    {error_list.password}
                                </span>
                            </div>
                            <div class="col-md-6 mt-3">
                                <label
                                    for="inputPassword4"
                                    class="form-label mb-0"
                                >
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="password_confirmation"
                                    onChange={handleInput}
                                    value={registerInput.password_confirmation}
                                />
                                <span class="text-danger">
                                    {error_list.password_confirmation}
                                </span>
                            </div>
                            <div class="text-center mt-3 ">
                                <button
                                    type="submit"
                                    class="btn btn-success me-2"
                                >
                                    Registrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
