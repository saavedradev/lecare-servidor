import React, { Fragment, useState, useEffect } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import Header from "../../Header";
import HeaderAdministrador from "../HeaderAdministrador";
import DashboardEmpleado from "./SeccionesEmpleado/DashboardEmpleado";
import { VistaAccionesEmpleado } from "./SeccionesEmpleado/VistaAccionesEmpleado";

import FuncionListaDatos from "../../FuncionListaDatos";
import CrearEmpleado from "./EventosEmpleado/CrearEmpleado";
import { ButtonToggle } from "reactstrap";
import EditarEmpleado from "./EventosEmpleado/EditarEmpleado";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";
import fondo from "../../../../sass/Crud2.jpg";
import "../../../../css/app.css";
import { FcHome,FcReading,FcAddDatabase,FcServices,FcSearch} from "react-icons/fc";

const PageEmpleado = () => {
    const [vaciarCampos, setVaciar] = useState({
        id: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        direccion: "",
        email: "",
        servicios:"",
        password: "",
        password_confirmation: "",
        rol: "",
    });
    const [error_list, setErrores] = useState(vaciarCampos);
    const [registerInput, setRegister] = useState({
        id: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        direccion: "",
        email: "",
        password: "",
        password_confirmation: "",
        rol: "",
    });
    const handleInput = (event) => {
        event.preventDefault();
        setRegister({
            ...registerInput,
            [event.target.name]: event.target.value,
        });
        setErrores({ ...error_list, [event.target.name]: "" });
    };
    const handleSeleccionRol = (event) => {
        event.preventDefault();
        setRegister({
            ...registerInput,
            [event.target.name]: event.target.value,
        });
    };
    const [empleados, setData] = useState([]);
    const [filteredEmpleados, setFilteredEmpleados] = useState([]);
    const [filteredServicios, setFilteredServicios] = useState([]);
    const [filteredServiciosEmpleado, setFilteredServiciosEmpleado] = useState(
        []
    );
    const onClickRegistrar = (event) => {
        event.persist();
        event.preventDefault();
        setKey("Crear");
    };
    const urlEmpleados = "https://lecarespa.herokuapp.com/api/empleados";
    const urlServicios = "https://lecarespa.herokuapp.com/api/servicios";
    FuncionListaDatos(urlEmpleados, setData, setFilteredEmpleados);
    FuncionListaDatos(urlServicios, null, setFilteredServicios);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const result = empleados.filter((empleado) => {
            return empleado.primer_nombre
                .toLowerCase()
                .includes(search.toLowerCase());
        });
        setFilteredEmpleados(result);
    }, [search]);
    const onChangeBusquedaEmpleado = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };
    console.log(filteredEmpleados);
    const [key, setKey] = useState("Home");
    const interfaceAdministrador = [
        <Fragment>
            <Header>{<HeaderAdministrador />}</Header>
        </Fragment>,
    ];
    return (
        <div
        className="container-fondoEmpleados"
        id="fondoCrudsServi"
        style={{ backgroundImage: `url(${fondo})` }}
    >
        <Fragment>
            {interfaceAdministrador}

            <Tab.Container
                id="left-tabs-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Row className="me-1">
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">

                            <Nav.Item>
                                <Nav.Link eventKey="Home">
                                <FcHome
                                            size={24}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                        />
                                    Inicio</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="Crear">
                                <FcAddDatabase
                                            size={24}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                        />
                                    Crear Empleado</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Ver">
                                <FcReading
                                            size={25}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                        />
                                    Ver Empleado</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Editar">
                                <FcServices
                                            size={25}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                        />
                                        Editar Empleado
                                    </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Tab.Content className="mt-3 mb-2">
                            <Tab.Pane eventKey="Home" >
                                <DashboardEmpleado

                                    onclickRegistrarEvent={onClickRegistrar}
                                    empleados={filteredEmpleados}
                                    search={search}
                                    onChangeBusqueda={onChangeBusquedaEmpleado}
                                    setAgregarValuesCampos={setRegister}
                                    valuesCampos={registerInput}
                                    setServiciosEmpleados={
                                        setFilteredServiciosEmpleado
                                    }
                                    setkeyPage={setKey}
                                    setEmpleados={setFilteredEmpleados}

                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Crear">
                                <VistaAccionesEmpleado
                                    servicios={filteredServicios}
                                    serviciosEmpleado={
                                        filteredServiciosEmpleado
                                    }
                                    setServiciosEmpleado={
                                        setFilteredServiciosEmpleado
                                    }
                                    handleInputs={handleInput}
                                    valueEmpleado={registerInput}
                                    handleSeleccionRol={handleSeleccionRol}
                                    page={key}
                                    error_list={error_list}
                                >
                                    <button
                                        type="button"
                                        class="btn btn-success"
                                        onClick={(e) =>
                                            CrearEmpleado(
                                                e,
                                                registerInput,
                                                setRegister,
                                                vaciarCampos,
                                                setFilteredEmpleados,
                                                filteredServiciosEmpleado,
                                                setFilteredServiciosEmpleado,
                                                setErrores
                                            )
                                        }
                                    >
                                        Registrar
                                    </button>
                                </VistaAccionesEmpleado>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Ver">
                                <VistaAccionesEmpleado
                                    servicios={filteredServicios}
                                    serviciosEmpleado={
                                        filteredServiciosEmpleado
                                    }
                                    setServiciosEmpleado={
                                        setFilteredServiciosEmpleado
                                    }
                                    handleInputs={handleInput}
                                    valueEmpleado={registerInput}
                                    handleSeleccionRol={handleSeleccionRol}
                                    page={key}
                                    error_list={error_list}
                                ></VistaAccionesEmpleado>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Editar">
                                <VistaAccionesEmpleado
                                    servicios={filteredServicios}
                                    serviciosEmpleado={
                                        filteredServiciosEmpleado
                                    }
                                    setServiciosEmpleado={
                                        setFilteredServiciosEmpleado
                                    }
                                    handleInputs={handleInput}
                                    valueEmpleado={registerInput}
                                    handleSeleccionRol={handleSeleccionRol}
                                    page={key}
                                    error_list={error_list}
                                >
                                    <button
                                        className="btn btn-success"
                                        onClick={(e) =>
                                            EditarEmpleado(
                                                e,
                                                registerInput,
                                                setFilteredEmpleados,
                                                setRegister,
                                                filteredServiciosEmpleado,
                                                vaciarCampos,
                                                setFilteredServiciosEmpleado,
                                                setErrores
                                            )
                                        }
                                    >
                                        Guardar
                                    </button>
                                </VistaAccionesEmpleado>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Fragment>
        </div>
    );
};

export default PageEmpleado;
