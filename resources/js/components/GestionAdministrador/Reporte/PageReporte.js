import React, { Fragment } from "react";
import Header from "../../Header";
import HeaderAdministrador from "../HeaderAdministrador";
import fondo from "../../../../sass/NuevoR.jpeg";
import "../../../../css/app.css";
import { FaFilePdf } from "react-icons/fa";

const PageReporte = () => {
    const interfaceAdministrador = [
        <Fragment>
            <Header>{<HeaderAdministrador />}</Header>
        </Fragment>,
    ];
    return (
        <div>
            {interfaceAdministrador}
            <div
                className="container-fondoReportes"
                id="fondoCrudsServi"
                style={{ backgroundImage: `url(${fondo})` }}
            >
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Reporte de Clientes</h5>
                                <p class="card-text">
                                    A continuación encontraras los datos de los
                                    clientes.
                                </p>
                                <button className="btn btn-danger mt-1 mb-1 text-white">
                                    <FaFilePdf />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Reporte de Empleados</h5>
                                <p class="card-text">
                                    A continuación encontraras los datos de los
                                    empleados.
                                </p>
                                <button className="btn btn-danger mt-1 mb-1 text-white">
                                    <FaFilePdf />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 mt-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Reporte de Servicios</h5>
                                <p class="card-text">
                                    A continuación encontraras los datos de los
                                    servicios del Spa.
                                </p>
                                <button className="btn btn-danger mt-1 mb-1 text-white">
                                    <FaFilePdf />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 mt-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Reporte de Citas</h5>
                                <p class="card-text">
                                    A continuación encontraras los datos de los
                                    servicios del Spa.
                                </p>
                                <button className="btn btn-danger mt-1 mb-1 text-white">
                                    <FaFilePdf />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageReporte;
