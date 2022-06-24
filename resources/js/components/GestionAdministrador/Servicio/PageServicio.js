import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import Header from "../../Header";
import HeaderAdministrador from "../HeaderAdministrador";
import CrearServicio from "./EventosServicio/CrearServicio"
import { FaFilePdf } from "react-icons/fa";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import EditarServicio from "./EventosServicio/EditarServicio";
import VerServicio from "./EventosServicio/VerServicio";
import EliminarServicio from "./EventosServicio/EliminarServicio";
import ModalServicio from "./ModalServicio";
import fondo from "../../../../sass/CrudsServicios.jpg";
import "../../../../css/app.css";


const PageServicio = () => {
    const [idServicio,setIdServicio]= useState(0);
    const [vaciarCampos, setVaciarCampos] = useState({
        id: "",
        nombre: "",
        tipo: "",
        duracion: ""
    });

    const [registerInput, setRegister] = useState({
      id: "",
      nombre: "",
      tipo: "",
      duracion: ""
    });
    const [error_list, setErrores] = useState(vaciarCampos);
    const handleInput = (event) => {
        event.persist();
        event.preventDefault();
        setRegister({
            ...registerInput,
            [event.target.name]: event.target.value,
        });
        setErrores({ ...error_list, [event.target.name]: "" });
    };
    const interfaceAdministrador = [
        <Fragment>
            <Header>{<HeaderAdministrador />}</Header>
        </Fragment>,
    ];

    const [servicios, setDataServices] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredServicios, setFilteredServicios] = useState([]);
    const url = "http://127.0.0.1:8000/api/servicios";
    const showData = async () => {
        const response = await fetch(url);
        const dataServicios = await response.json();
        console.log(dataServicios);
        setDataServices(dataServicios);
        setFilteredServicios(dataServicios);
    };
    useEffect(() => {
        showData();
    }, []);

    useEffect(() => {
        const result = servicios.filter((servicio) => {
            return servicio.nombre
                .toLowerCase()
                .includes(search.toLowerCase());
        }
        );
        setFilteredServicios(result);
    }, [search]);


    const columns = [
        {
            name: "Codigo",
            selector: (row) => row.id,
            width: "140px",
        },
        {
            name: "Nombre Servicio",
            selector: (row) => row.nombre
        },
        {
            name: "Tipo Servicio",
            selector: (row) => row.tipo,
        },
        {
            name: "Duración",
            selector: (row) => row.duracion,
            width: "140px",
        },
        {
            name: "Acciones",
            cell: (row) => (
                <div
                    class="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic example"
                >
                    <button
                        type="button"
                        class="btn btn-primary"
                        key={"1"}
                        id="button-ver"
                        data-bs-toggle="modal"
                        data-bs-target="#verModal"
                         onClick={(e) =>
                            VerServicio(e, row.id,setIdServicio, setRegister,registerInput)
                        }
                    >
                        Ver
                    </button>
                    <button
                    key={"2"}
                        type="button"
                        class="btn btn-info"
                        id="button-editar"
                        data-bs-toggle="modal"
                        data-bs-target="#editarModal"
                        onClick={(e) =>
                            VerServicio(e, row.id,setIdServicio, setRegister,registerInput)
                        }

                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        id="button-eliminar"
                         onClick={(e) =>
                             EliminarServicio(e,row.id,filteredServicios,setFilteredServicios)
                        }
                    >
                      Eliminar
                    </button>
                </div>
            ),
        },
    ];

    const downloadPdf = () => {
        const doc = new jsPDF();
        console.log(filteredServicios);
        doc.text("Listado de Sevicios Lecare Spa", 20, 10);
        doc.autoTable({
            theme: "grid",
           // columns:['Codigo','nombre','tipo','duracion'],
          //  columns:columns.selector,
            body: filteredServicios,
        });
        doc.save("Servicios.pdf");
    };

    return (
        <div
        className="container-fondoServicios"
        id="fondoCrudsServi"
        style={{ backgroundImage: `url(${fondo})` }}
    >
        <div>
            {interfaceAdministrador}
            <div className="container">
                <div class="row justify-content-center ">
                    <div className="d-grid gap-2">
                        <nav class="navbar navbar bg justify-content-between">
                            <button
                                className="btn btn-success mt-2 mb-2 text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#registrarModal"
                            >
                                Crear
                            </button>
                            {/* <button
                                className="btn btn-danger mt-2 mb-2 text-white"
                                onClick={downloadPdf}
                           >
                            <FaFilePdf />
                             </button> */}
                            <form class="form-inline">
                                <input
                                    class="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>
                        </nav>
                        <DataTable
                            columns={columns}
                            data={filteredServicios}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="400px"
                        />
                        <ModalServicio
                            idModal={"registrarModal"}
                            tituloModal={"Registrar Servicio"}
                            colorModal={"#198754"}
                            valueServicio={registerInput}
                            handleInputs={handleInput}
                            error_list={error_list}
                        >
                            <button
                                type="button"
                                class="btn btn-success"
                                onClick={(e) => (CrearServicio(e, registerInput,setFilteredServicios,setErrores) ?  setRegister(vaciarCampos) : "")}
                            >
                                Registrar
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                   setRegister(vaciarCampos);
                                }}
                            >
                                Cerrar
                            </button>
                        </ModalServicio>
                        <ModalServicio
                            idModal={"verModal"}
                            tituloModal={"Visualizar Servicio"}
                            colorModal={"rgb(14, 41, 131)"}
                            valueServicio={registerInput}
                            handleInputs={handleInput}
                            error_list={error_list}
                        >
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setRegister(vaciarCampos);
                                 }}
                            >
                                Cerrar
                            </button>
                        </ModalServicio>

                        <ModalServicio
                            idModal={"editarModal"}
                            tituloModal={"Editar "}
                            colorModal={"#0dcaf0"}
                            valueServicio={registerInput}
                            handleInputs={handleInput}
                            error_list={error_list}

                        >
                            <button type="button" class="btn btn-primary" onClick={(e)=>EditarServicio(e,registerInput,idServicio,setFilteredServicios,setErrores)}>
                                Guardar
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setRegister(vaciarCampos);
                                 }}
                            >
                                Cancelar
                            </button>
                        </ModalServicio>


                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PageServicio;


