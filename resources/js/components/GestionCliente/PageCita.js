import React, { Fragment,useState } from "react";
import Header from "../Header";
import HeaderCliente from "./HeaderCliente";
import PaginaCitaReusable from "./SeccionesCita/PaginaCitaReusable";
import CrearCita from "./EventosCita/CrearCita"
import DashboardBusquedaCita from "./SeccionesCita/DashboardBusquedaCita";
import BusquedaCita from "./EventosCita/BusquedaCita";
import EditarCita from "./EventosCita/EditarCita";
import FuncionListaDatos from "../FuncionListaDatos"
import { FcHome,FcReading,FcAddDatabase,FcServices,FcSearch,FcOvertime} from "react-icons/fc";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";

const PageCita = () => {
const interfaceCliente =
[ <Fragment>
  <Header>{< HeaderCliente/>}</Header>
</Fragment>,];
const [vaciarCampos, setVaciarCampos] = useState({
    id:"",
    fecha: "",
    horario: "",
    servicios:"",
    servicioSeleccionado: "",
});
const [error_list, setErrores] = useState(vaciarCampos);
const [citaValues, setCitaValues] = useState({
    id:"",
    cedula_cliente: localStorage.getItem('auth-cedula'),
    fecha: "",
    horario: "",
    servicioSeleccionado: "",
});
const handleInput = (event) => {
    event.preventDefault();
    setCitaValues({
        ...citaValues,
        [event.target.name]: event.target.value,
    });
    setErrores({ ...error_list, [event.target.name]: "" });
    console.log(citaValues)
};
const [listadoServicios, setlistadoServicios] = useState([]);
const [listadoServiciosSolicitados, setListadoServiciosSolicitados] =
    useState([]);
const urlServicios = "https://lecarespa.herokuapp.com/api/servicios";
FuncionListaDatos(urlServicios, null, setlistadoServicios);
const [key, setKey] = useState("Crear");
const [listadoCitas, setListadoCitas] = useState([]);
const [filteredCitas, setFilteredCitas] = useState([]);
const urlCitas = `https://lecarespa.herokuapp.com/api/citasCliente/${citaValues.cedula_cliente}`;
FuncionListaDatos(urlCitas, setListadoCitas, setFilteredCitas);
const [search, setSearch] = useState("");
BusquedaCita(listadoCitas,setFilteredCitas,search)
const onChangeBusquedaCita = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
};

  return (
    <div>
    <Fragment>
      {interfaceCliente}
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
                            <Tab.Pane eventKey="Crear">
                                <PaginaCitaReusable
                                    servicios={listadoServicios}
                                    serviciosCliente={
                                        listadoServiciosSolicitados
                                    }
                                    setServiciosCliente={
                                        setListadoServiciosSolicitados
                                    }
                                    valueCita={citaValues}
                                    handleEscritura={handleInput}
                                    page={key}
                                    error_list={error_list}
                                >
                                    <div className="col-md-6">
                                        <button
                                            className="btn btn-success"
                                            onClick={(e) =>
                                                CrearCita(
                                                    e,
                                                    citaValues,
                                                    setCitaValues,
                                                    vaciarCampos,
                                                    listadoServiciosSolicitados,
                                                    setListadoServiciosSolicitados,
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
                                    setAgregarValuesCampos={setCitaValues}
                                    setServicioscitas={
                                        setListadoServiciosSolicitados
                                    }
                                    setkeyPage={setKey}
                                    valuesCampos={citaValues}
                                    setCitas={setFilteredCitas}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Ver">
                                <PaginaCitaReusable
                                    servicios={listadoServicios}
                                    serviciosCliente={
                                        listadoServiciosSolicitados
                                    }
                                    setServiciosCliente={
                                        setListadoServiciosSolicitados
                                    }
                                    setValueCitaCliente={setCitaValues}
                                    valueCita={citaValues}
                                    handleEscritura={handleInput}
                                    page={key}
                                    error_list={error_list}
                                ></PaginaCitaReusable>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Editar">
                                <PaginaCitaReusable
                                    servicios={listadoServicios}
                                    serviciosCliente={
                                        listadoServiciosSolicitados
                                    }
                                    setServiciosCliente={
                                        setListadoServiciosSolicitados
                                    }
                                    setValueCitaCliente={setCitaValues}
                                    valueCita={citaValues}
                                    handleEscritura={handleInput}
                                    page={key}
                                    error_list={error_list}
                                >
                                    <button
                                        className="btn btn-success"
                                        onClick={(e) =>
                                            EditarCita(
                                                e,
                                                citaValues,
                                                setCitaValues,
                                                vaciarCampos,
                                                listadoServiciosSolicitados,
                                                setListadoServiciosSolicitados,
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
  )
}

export default PageCita;
