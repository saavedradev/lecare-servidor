import React, { useState, Component, Fragment } from "react";
import image from "../../../sass/LogoLecare.png";
import fondo from "../../../sass/Fondo.jpeg";
import "../../../css/app.css";
import { IoHomeOutline, IoPersonSharp, IoLockClosed } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
export const Login = () => {
    console.log(localStorage.getItem('auth-rol'))
    const navigate = useNavigate();
    const [error_list, setErrores] = useState({});
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const ingresarCliente = [
            <Fragment>
                <p>
                    {" "}
                    Crear una cuenta{" "}
                    <Link class="link-primary" to={"/Register"}>
                        Ingresar aqui
                    </Link>
                </p>
            </Fragment>
    ]
    const handleInputChange = (event) => {
        event.persist();
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const sesionSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: user.email,
            password: user.password,
            rol: localStorage.getItem('auth-rol'),
        };
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("http://127.0.0.1:8000/api/login", data).then((res) => {
                if (res.data.status == 200) {
                    localStorage.setItem("auth-token", res.data.token);
                    localStorage.setItem("auth-name", res.data.userName);
                    localStorage.setItem("auth-rolUsuario",res.data.rolUsuario)
                    localStorage.setItem("auth-cedula",res.data.user)
                    swal("Success", res.data.message, "success");
                    navigate("/Home");
                    console.log(res.data.token);
                } else if (res.data.status == 401) {
                    swal("warning", res.data.message, "warning");
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
            <div className="row justify-content-center pt-5 mt-4 mr-1 ">
                <div className="col-md-4 formulario">
                    <div class="text-center">
                        <img
                            src={image}
                            style={{ width: "70%", height: "45%" }}
                        />
                    </div>
                    <form onSubmit={sesionSubmit}>
                        <div class="input-group flex-nowrap mb-0">
                            <span class="input-group-text" id="addon-wrapping">
                                {" "}
                                <IoPersonSharp id="icon" />{" "}
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                onChange={handleInputChange}
                                name="email"
                                value={user.email}
                                placeholder="Ingrese su usuario"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                            />
                        </div>
                        <span class="text-danger">{error_list.email}</span>
                        <div class="input-group flex-nowrap mb-0 mt-4">
                            <span class="input-group-text" id="addon-wrapping">
                                <IoLockClosed id="icon" />
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                onChange={handleInputChange}
                                name="password"
                                value={user.password}
                                placeholder="Contraseña"
                            />
                        </div>
                        <span class="text-danger">{error_list.password}</span>
                        <div class="d-grid gap-2 col-4 mx-auto mb-3 mt-4">
                            <button class="btn" type="submit" id="button">
                                <IoHomeOutline id="btnicon" /> Ingresar
                            </button>
                        </div>
                        <div
                            className="text-end fw-bold"
                            style={{ color: "rgba(15, 92, 92, 0.904);" }}
                        >
                         {(localStorage.getItem('auth-rol')=="cliente")?[ingresarCliente]:""}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Login;
