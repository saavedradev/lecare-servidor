import React, { Fragment } from "react";
import HeaderAdministrador from "../GestionAdministrador/HeaderAdministrador";
import Header from "../Header";
import { Outlet} from 'react-router-dom';
import HeaderCliente from "../GestionCliente/HeaderCliente";
import HeaderEmpleado from "../GestionEmpleado/HeaderEmpleado";
import fondoHome from "../../../sass/fondoHome.png";
import "../../../css/app.css";


const Home = () => {
    const interfaceAdministrador = [
        <Fragment>
            <Header>{<HeaderAdministrador />}</Header>
        </Fragment>
    ];
    const interfaceCliente = [ <Fragment>
        <Header>{< HeaderCliente/>}</Header>
    </Fragment>];
    const interfaceEmpleado = [
    <Fragment>
        <Header>{<HeaderEmpleado/>}</Header>
    </Fragment>
    ];
    return (
        <div
        className="container-fondoHome"
        id="fondoHome"
        style={{ backgroundImage: `url(${fondoHome})` }}
    >
        <div>
            {localStorage.getItem("auth-rolUsuario") == "Administrador"
                ? interfaceAdministrador
                : ""}
            {localStorage.getItem("auth-rolUsuario") == "Cliente"
                ? interfaceCliente
                : ""}
            {localStorage.getItem("auth-rolUsuario") == "Empleado" || localStorage.getItem("auth-rolUsuario") == "Empleado_Medico"
                ? interfaceEmpleado
                : ""}


        </div>
        </div>
    );
};

export default Home;
