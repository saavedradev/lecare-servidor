import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./layout/Home";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PaginaPrincipal from "./PaginaPrincipal";
import NotFoundPage from "./NotFoundPage";
import PageCita from './GestionAdministrador/Cita/PageCita';
import PageCliente from "./GestionAdministrador/Cliente/PageCliente";
import PageEmpleado from "./GestionAdministrador/Empleado/PageEmpleado";
import PagePermiso from "./GestionAdministrador/Permiso/PagePermiso";
import PageServicio from "./GestionAdministrador/Servicio/PageServicio";
import PageReporte from "./GestionAdministrador/Reporte/PageReporte";
import PageCitaCliente from "./GestionCliente/PageCita";
import PagePerfil from "./PagePerfil";
import PagePermisoEmpleado from "./GestionEmpleado/Permiso/PagePermiso";
import  PageJornadaCita  from "./GestionEmpleado/JornadaCitas/PageJornadaCita";
import PageHistorialCliente from "./GestionEmpleado/Cliente/PageHistorialCliente";


axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth-token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});
function Index() {
    return (

            <Routes>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/" element={<PaginaPrincipal/>}  />
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/Register"} element={<Register/>} />
                <Route path="/citas" element={<PageCita/>} />
                <Route path="/cliente/citas" element={<PageCitaCliente/>} />
                <Route path="/jornada" element={<PageJornadaCita/>} />
                <Route path="/historial" element={<PageHistorialCliente/>} />
                <Route path="/solicitudes" element={<PagePermisoEmpleado/>}/>
                <Route  path="/clientes" element={<PageCliente/>} />
                <Route  path="/empleados" element={<PageEmpleado/>} />
                <Route  path="/servicios" element={<PageServicio/>} />
                <Route  path="/permisos" element={<PagePermiso/>} />
                <Route  path="/reportes" element={<PageReporte/>} />
                <Route  path="/perfil" element={<PagePerfil/>} />

                {/* <Route path="/login">
                    {localStorage.getItem("auth-token") ? (
                        <Redirect to="/Home" />
                    ) : (
                        <Login Rol={localStorage.getItem("auth-rol")} />
                    )}
                </Route>
                <Route path="/Register">
                    {localStorage.getItem("auth-token") ? (
                        <Redirect to="/Home" />
                    ) : (
                        <Register />
                    )}
                </Route> */}
                <Route> path="*" element={NotFoundPage}</Route>
            </Routes>
    );
}

export default Index;
