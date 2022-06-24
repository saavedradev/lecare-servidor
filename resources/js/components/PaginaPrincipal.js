import React from "react";
import { useNavigate } from "react-router-dom";
import image2 from "../../sass/logoLecare.png";

export const PaginaPrincipal = () => {
    const navigate = useNavigate();

    function isEmptyObject(obj) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    }

    const asignarRol = (event) => {
        let valorVerdad = localStorage.getItem("auth-rol");
        if (isEmptyObject(valorVerdad) === false) {
            localStorage.removeItem("auth-rol");
            if (event.target.name == "cliente") {
                console.log(valorVerdad);
                navigate("/login");
                localStorage.setItem("auth-rol", "cliente");
            } else if (event.target.name == "funcionario") {
                console.log(valorVerdad);
                navigate("/login");
                localStorage.setItem("auth-rol", "funcionario");
            }
        } else {
            if (event.target.name === "cliente") {
                navigate("/login");
                localStorage.setItem("auth-rol", "cliente");
            } else if (event.target.name == "funcionario") {
                navigate("/login");
                localStorage.setItem("auth-rol", "funcionario");
            }
        }
    };
    return (

        <div class="row">
            <div class="col-sm-6">
                <div class="card ">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                Acceso Empleados
                            </a>
                        </li>
                    </ul>
                    <div class="text-center">
                        <img
                            src={image2}
                            style={{ width: "35%", height: "45%" }}
                        />
                    </div>
                    <div class="card-body ">

                        <h5 class="card-title text-center">
                            Ingresar Sesión Empleados Lecare Spa
                        </h5>
                        <p class="card-text text-center">
                        A continuación, podrás ingresar al panel de ingresar sesión en modo Empleado.
                        </p>
                        <div className="row justify-content-center mt-5 ">
                            <div class="col-md-5 mt-4">
                                <br />
                                <input
                                    type="button"
                                    class="form-control"
                                    name="funcionario"
                                    value="Acceso Empleado/Administrador"
                                    onClick={asignarRol}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card ">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                Acceso Clientes
                            </a>
                        </li>
                    </ul>
                    <div class="text-center">
                        <img
                            src={image2}
                            style={{ width: "35%", height: "45%" }}
                        />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title-center text-center">
                            Ingresar Sesión Clientes Lecare Spa
                        </h5>
                        <p class="card-text text-center ">
                        A continuación, podrás ingresar al panel de ingresar sesión en modo Cliente.
                        </p>
                        <div className="row justify-content-center mt-5 ">
                            <div className="col-md-3 mt-5">
                                <input
                                    type="button"
                                    class="form-control"
                                    name="cliente"
                                    value= "Acceso Cliente"
                                    onClick={asignarRol}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaPrincipal;
