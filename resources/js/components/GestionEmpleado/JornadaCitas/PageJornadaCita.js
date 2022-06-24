import React, { Fragment, useState, useEffect } from "react";
import Header from "../../Header";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { Calendario } from "./SeccionesCita/Calendario";
import Tabs from "react-bootstrap/Tabs";
import "../../../../css/app.css";
import PaginaCitaReusable from "./SeccionesCita/PaginaCitaReusable";
import FuncionListaDatos from "../../FuncionListaDatos";
import DashboardBusquedaCita from "./SeccionesCita/DashboardBusquedaCita";
import { FcHome,FcReading,FcAddDatabase,FcServices,FcSearch,FcOvertime} from "react-icons/fc";
import fondo from "../../../../sass/crudCitas.jpg";
import HeaderEmpleado from '../HeaderEmpleado';

 const PageJornadaCita = () => {
    const [vaciarCampos, setVaciarCampos] = useState({
        id:"",
        nombre_cliente: "",
        fecha: "",
        horario: ""
    });
    const [cita, setCita] = useState({
        id:"",
        cedula_empleado:localStorage.getItem('auth-cedula'),
        nombre_cliente: "",
        fecha: "",
        horario: ""
    });
    const [listadoServiciosSolicitados, setListadoServiciosSolicitados] =
        useState([]);
    const [key, setKey] = useState("Jornada");
    const [keyTab, setKeyTab] = useState("cita");
    const [filteredCitas, setFilteredCitas] = useState([]);
    const [filteredCitasDay, setFilteredCitasDay] = useState([]);
    const urlCitas = `https://lecarespa.herokuapp.com/api/jornadaCitas/${cita.cedula_empleado}`;
    FuncionListaDatos(urlCitas, null, setFilteredCitas);
    const onChangeBusquedaCitaDay = (event) => {
        event.preventDefault();
        setSearchDay(event.target.value);
    };
    const [searchDay, setSearchDay] = useState("");
    const headerEmpleado = [
        <Fragment>
            <Header>{<HeaderEmpleado />}</Header>
        </Fragment>,
    ];
    return (
        <div
        className="container-fondoCitas"
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
                                            valueEmpleado={cita}
                                        />
                                    </Tab>
                                    <Tab
                                        className="tab"
                                        eventKey="horario"
                                        title="Horario"
                                        disabled={true}
                                    >
                                         <DashboardBusquedaCita
                                    citas={filteredCitasDay}
                                    setAgregarValuesCampos={setCita}
                                    setServicioscitas={
                                        setListadoServiciosSolicitados
                                    }
                                    setkeyPage={setKey}
                                    valuesCampos={cita}
                                    setCitas={setFilteredCitasDay}
                                />
                                    </Tab>
                                </Tabs>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Ver">
                                <PaginaCitaReusable valueCita={cita} serviciosCliente={listadoServiciosSolicitados}/>
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Fragment>
        </div>
    );
};

export default PageJornadaCita;
