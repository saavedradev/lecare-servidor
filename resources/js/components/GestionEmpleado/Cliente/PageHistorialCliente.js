import React, { Fragment, useState, useEffect } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import Header from "../../Header";
import fondo from "../../../../sass/Crud2.jpg";
import "../../../../css/app.css";
import {
    FcHome,
    FcReading,
    FcAddDatabase,
    FcServices,
    FcSearch,
} from "react-icons/fc";
import PaginaHistorialReusable from "./SeccionesHistorialCliente/PaginaHistorialReusable";
import HeaderEmpleado from "../HeaderEmpleado";
import FuncionListaDatos from "../../FuncionListaDatos";
import DashboardBusquedaHistorial from "./SeccionesHistorialCliente/DashboardBusquedaHistorial";
import CrearHistorial from "./EventosCliente/CrearHistorial";
import EditarHistorial from "./EventosCliente/EditarHistorial";
const PageHistorialCliente = () => {
    const [vaciarCampos, setVaciarCampos] = useState({
        idHistorial:"",
        fecha: "",
        motivo: "",
        patologicos: "",
        quirurgicos: "",
        traumaticos: "",
        toxicos: "",
        farmacologicos: "",
        familiares: "",
        alergicos: "",
        fur: "",
        alimentacion: "",
        presion_arterial: "",
        presión_arterial_sistolica: "",
        pulso: "",
        frecuencia_respiratoria: "",
        peso: "",
        talla: "",
        orl: "",
        cuello: "",
        cardio: "",
        abdomen: "",
        extremidades: "",
        diagnostico: "",
    });
    const [error_list, setErrores] = useState(vaciarCampos);
    const [valuesHistorialCliente, setValuesHistorialCliente] = useState({
        idHistorial:"",
        cedula: localStorage.getItem("auth-cedulaPaciente"),
        nombre: "",
        telefono: "",
        fecha: "",
        consulta: "",
        patologicos: "",
        quirurgicos: "",
        traumaticos: "",
        toxicos: "",
        farmacologicos: "",
        familiares: "",
        alergicos: "",
        fur: "",
        alimentacion: "",
        presion_arterial: "",
        presión_arterial_sistolica: "",
        pulso: "",
        frecuencia_respiratoria: "",
        peso: "",
        talla: "",
        orl: "",
        cuello: "",
        cardio: "",
        abdomen: "",
        extremidades: "",
        diagnostico: "",
    });
    const handleInput = (event) => {
        event.persist();
        event.preventDefault();
        setValuesHistorialCliente({
            ...valuesHistorialCliente,
            [event.target.name]: event.target.value,
        });
        setErrores({ ...error_list, [event.target.name]: "" });
    };
    const urlCliente = `https://lecarespa.herokuapp.com/api/historialCliente/${valuesHistorialCliente.cedula}`;
    useEffect(() => {
        const loadPaciente = async () => {
            const response = await axios.get(urlCliente);
            setValuesHistorialCliente({
                ...valuesHistorialCliente,
                nombre: response.data.nombre,
                telefono: response.data.telefono,
            });
        };
        loadPaciente();
    }, []);
    const [filteredHistorialCliente, setfilteredHistorialCliente] = useState(
        []
    );
     const urlHistorialCliente = `https://lecarespa.herokuapp.com/api/historiales/${valuesHistorialCliente.cedula}`;
     FuncionListaDatos(urlHistorialCliente, null, setfilteredHistorialCliente);
    const [key, setKey] = useState("Crear");
    const headerEmpleado = [
        <Fragment>
            <Header>{<HeaderEmpleado />}</Header>
        </Fragment>,
    ];
    return (
        <div
            className="container-fondoEmpleados-1"
            id="fondoCrudsServi"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <Fragment>
                {headerEmpleado}

                <Tab.Container
                    id="left-tabs-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Row className="me-1">
                        <Col sm={2} id="empleb">
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="Crear">
                                        <FcAddDatabase
                                            size={24}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                        />
                                        Registrar historial
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Buscar">
                                        <FcAddDatabase
                                            size={24}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                        />
                                        Buscar historial
                                    </Nav.Link>
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
                                        Ver historial
                                    </Nav.Link>
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
                                        Editar historial
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col>
                            <Tab.Content className="mt-3 mb-2">
                                <Tab.Pane eventKey="Crear">
                                    <PaginaHistorialReusable
                                        valueHistorial={valuesHistorialCliente}
                                        handleInput={handleInput}
                                        page={key}
                                        error_list={error_list}
                                    >
                                        <button
                                            className="btn btn-success"
                                            onClick={(e) =>
                                                CrearHistorial(
                                                    e,
                                                    valuesHistorialCliente,
                                                    setValuesHistorialCliente,
                                                    vaciarCampos,
                                                    setfilteredHistorialCliente,
                                                    setKey,
                                                    setErrores
                                                )
                                            }
                                        >
                                            Registrar
                                        </button>
                                    </PaginaHistorialReusable>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Buscar">
                                    <DashboardBusquedaHistorial
                                        historiales={filteredHistorialCliente}
                                        setTable={setfilteredHistorialCliente}
                                        setValuesCampos={setValuesHistorialCliente}
                                        valuesCampos={valuesHistorialCliente}
                                        setkeyPage={setKey}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="Ver">
                                <PaginaHistorialReusable
                                        valueHistorial={valuesHistorialCliente}
                                        handleInput={handleInput}
                                        page={key}
                                        error_list={error_list}
                                    >
                                    </PaginaHistorialReusable>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Editar">
                                <PaginaHistorialReusable
                                        valueHistorial={valuesHistorialCliente}
                                        handleInput={handleInput}
                                        page={key}
                                        error_list={error_list}
                                    >
                                         <button
                                            className="btn btn-success"
                                            onClick={(e) =>
                                                EditarHistorial(
                                                    e,
                                                    valuesHistorialCliente,
                                                    setValuesHistorialCliente,
                                                    vaciarCampos,
                                                    setfilteredHistorialCliente,
                                                    setKey,
                                                    setErrores
                                                )
                                            }
                                        >
                                            Guardar
                                        </button>
                                    </PaginaHistorialReusable>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Fragment>
        </div>
    );
};

export default PageHistorialCliente;
