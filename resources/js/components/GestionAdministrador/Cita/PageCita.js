import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";
import HeaderAdministrador from "../HeaderAdministrador";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { Calendario } from "./SeccionesCita/Calendario";
import Tabs from "react-bootstrap/Tabs";
import "../../../../css/app.css";
import PaginaCitaReusable from "./SeccionesCita/PaginaCitaReusable";
import FuncionListaDatos from "../../FuncionListaDatos";
import CrearCita from "./EventosCita/CrearCita";
import DashboardBusquedaCita from "./SeccionesCita/DashboardBusquedaCita";
import EditarCita from "./EventosCita/EditarCita";
import { FcHome,FcReading,FcAddDatabase,FcServices,FcSearch,FcOvertime} from "react-icons/fc";
import fondo from "../../../../sass/crudCitas.jpg";
import BusquedaCita from "./EventosCita/BusquedaCita";
const PageCita = () => {
    const [campoCedulaCliente, setCampocampoCedulaCliente] = useState("");
    const [vaciarCampos, setVaciarCampos] = useState({
        id:"",
        cedula_cliente: "",
        estado_cita: "",
        estado_pago: "",
        fecha: "",
        horario: "",
        empleadoSeleccionado: "",
        servicioSeleccionado: "",
        empleados:"",
        servicios:"",
    });
    const [error_list, setErrores] = useState(vaciarCampos);
    const [cita, setCita] = useState({
        id:"",
        cedula_cliente: "",
        estado_cita: "",
        estado_pago: "",
        fecha: "",
        horario: "",
        empleadoSeleccionado: "",
        servicioSeleccionado: "",
    });
    const handleInput = (event) => {
        event.preventDefault();
        setCita({
            ...cita,
            [event.target.name]: event.target.value,
        });
        setErrores({ ...error_list, [event.target.name]: "" });
    };
    const [listadoEmpleados, setListadoEmpleados] = useState([]);
    const [listadoServicios, setlistadoServicios] = useState([]);
    const [listadoEmpleadosRealizanCita, setListadoEmpleadosRealizanCita] =
        useState([]);
    const [listadoServiciosSolicitados, setListadoServiciosSolicitados] =
        useState([]);
    const events = [{ title: "today's event", date: new Date() }];
    const urlEmpleados = "http://127.0.0.1:8000/api/empleados";
    const urlServicios = "http://127.0.0.1:8000/api/servicios";
    FuncionListaDatos(urlEmpleados, null, setListadoEmpleados);
    FuncionListaDatos(urlServicios, null, setlistadoServicios);
    console.log(listadoEmpleados);
    console.log(listadoServicios);
    const [key, setKey] = useState("Jornada");
    const [keyTab, setKeyTab] = useState("cita");
    const [listadoCitas, setListadoCitas] = useState([]);
    const [filteredCitas, setFilteredCitas] = useState([]);
    const [filteredCitasDay, setFilteredCitasDay] = useState([]);
    const urlCitas = "http://127.0.0.1:8000/api/citas";
    FuncionListaDatos(urlCitas, setListadoCitas, setFilteredCitas);
    const [searchDay, setSearchDay] = useState("");
    const [search, setSearch] = useState("");
    BusquedaCita(listadoCitas,setFilteredCitas,search)
    const onChangeBusquedaCita = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };
    const onChangeBusquedaCitaDay = (event) => {
        event.preventDefault();
        setSearchDay(event.target.value);
    };
    console.log(filteredCitas);
    const interfaceAdministrador = [
        <Fragment>
            <Header>{<HeaderAdministrador />}</Header>
        </Fragment>,
    ];
    return (
        <div
        className="container-fondoCitas"
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
                    <Col
                        lg={1}
                    >
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="Jornada">
                                <FcOvertime
                                            size={25}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                            />
                                    Jornada

                                </Nav.Link>
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
                                    Crear Cita</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Buscar">
                                <FcSearch
                                            size={23}
                                            style={{
                                                fill: "white",
                                                marginRight: 7,
                                            }}
                                            />

                                    Buscar Cita</Nav.Link>
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
                                    Ver Cita

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
                                    Editar Cita</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Tab.Content className="mt-3 mb-2">
                            <Tab.Pane eventKey="Jornada">
                                <Tabs
                                    activeKey={keyTab}
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-2 mx-3 mt-2"
                                    onSelect={(k) => setKeyTab(k)}
                                >
                                    <Tab
                                        className="tab"
                                        eventKey="cita"
                                        title="cita"
                                    >
                                        <Calendario
                                            setKeyTab={setKeyTab}
                                            citas={filteredCitas}
                                            setTable={setFilteredCitasDay}
                                        ></Calendario>
                                    </Tab>
                                    <Tab
                                        className="tab"
                                        eventKey="horario"
                                        title="Horario"
                                        disabled={true}
                                    >
                                         <DashboardBusquedaCita
                                    citas={filteredCitasDay}
                                    search={searchDay}
                                    onChangeBusqueda={onChangeBusquedaCitaDay}
                                    setAgregarValuesCampos={setCita}
                                    setServicioscitas={
                                        setListadoServiciosSolicitados
                                    }
                                    setEmpleadosCita={
                                        setListadoEmpleadosRealizanCita
                                    }
                                    setkeyPage={setKey}
                                    setText={setCampocampoCedulaCliente}
                                    valuesCampos={cita}
                                    setCitas={setFilteredCitasDay}
                                />
                                    </Tab>
                                </Tabs>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Crear">
                                <PaginaCitaReusable
                                    servicios={listadoServicios}
                                    empleados={listadoEmpleados}
                                    serviciosCliente={
                                        listadoServiciosSolicitados
                                    }
                                    empleadosCita={listadoEmpleadosRealizanCita}
                                    setEmpleadosCita={
                                        setListadoEmpleadosRealizanCita
                                    }
                                    setServiciosCliente={
                                        setListadoServiciosSolicitados
                                    }
                                    setValueCitaCliente={setCita}
                                    valueCita={cita}
                                    handleEscritura={handleInput}
                                    campoCedulaCliente={campoCedulaCliente}
                                    setCampocampoCedulaCliente={
                                        setCampocampoCedulaCliente
                                    }
                                    page={key}
                                    error_list={error_list}
                                >
                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-success"
                                            onClick={(e) =>
                                                CrearCita(
                                                    e,
                                                    cita,
                                                    setCita,
                                                    vaciarCampos,
                                                    listadoServiciosSolicitados,
                                                    setListadoServiciosSolicitados,
                                                    listadoEmpleadosRealizanCita,
                                                    setListadoEmpleadosRealizanCita,
                                                    setCampocampoCedulaCliente,
                                                    setFilteredCitas,
                                                    setErrores
                                                )
                                            }
                                        >
                                            Crear
                                        </button>
                                    </div>
                                </PaginaCitaReusable>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Buscar">
                                <DashboardBusquedaCita
                                    citas={filteredCitas}
                                    search={search}
                                    onChangeBusqueda={onChangeBusquedaCita}
                                    setAgregarValuesCampos={setCita}
                                    setServicioscitas={
                                        setListadoServiciosSolicitados
                                    }
                                    setEmpleadosCita={
                                        setListadoEmpleadosRealizanCita
                                    }
                                    setkeyPage={setKey}
                                    setText={setCampocampoCedulaCliente}
                                    valuesCampos={cita}
                                    setCitas={setFilteredCitas}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Ver">
                                <PaginaCitaReusable
                                    servicios={listadoServicios}
                                    empleados={listadoEmpleados}
                                    serviciosCliente={
                                        listadoServiciosSolicitados
                                    }
                                    empleadosCita={listadoEmpleadosRealizanCita}
                                    setEmpleadosCita={
                                        setListadoEmpleadosRealizanCita
                                    }
                                    setServiciosCliente={
                                        setListadoServiciosSolicitados
                                    }
                                    setValueCitaCliente={setCita}
                                    valueCita={cita}
                                    handleEscritura={handleInput}
                                    campoCedulaCliente={campoCedulaCliente}
                                    setCampocampoCedulaCliente={
                                        setCampocampoCedulaCliente
                                    }
                                    page={key}
                                    error_list={error_list}
                                ></PaginaCitaReusable>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Editar">
                                <PaginaCitaReusable
                                    servicios={listadoServicios}
                                    empleados={listadoEmpleados}
                                    serviciosCliente={
                                        listadoServiciosSolicitados
                                    }
                                    empleadosCita={listadoEmpleadosRealizanCita}
                                    setEmpleadosCita={
                                        setListadoEmpleadosRealizanCita
                                    }
                                    setServiciosCliente={
                                        setListadoServiciosSolicitados
                                    }
                                    setValueCitaCliente={setCita}
                                    valueCita={cita}
                                    handleEscritura={handleInput}
                                    campoCedulaCliente={campoCedulaCliente}
                                    setCampocampoCedulaCliente={
                                        setCampocampoCedulaCliente
                                    }
                                    page={key}
                                    error_list={error_list}
                                >
                                    <button
                                        className="btn btn-success"
                                        onClick={(e) =>
                                            EditarCita(
                                                e,
                                                cita,
                                                setCita,
                                                vaciarCampos,
                                                listadoServiciosSolicitados,
                                                setListadoServiciosSolicitados,
                                                listadoEmpleadosRealizanCita,
                                                setListadoEmpleadosRealizanCita,
                                                setCampocampoCedulaCliente,
                                                setFilteredCitas,
                                                setErrores
                                            )
                                        }
                                    >
                                        Guardar
                                    </button>
                                </PaginaCitaReusable>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Fragment>
        </div>
    );
};

export default PageCita;
