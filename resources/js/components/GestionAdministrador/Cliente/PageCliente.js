import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import Header from "../../Header";
import HeaderAdministrador from "../HeaderAdministrador";
import ModalCliente from "./ModalCliente";
import CrearCliente from "./EventosCliente/CrearCliente";
import VerCliente from "./EventosCliente/VerCliente";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import EliminarCliente from "./EventosCliente/EliminarCliente";
import EditarCliente from "./EventosCliente/EditarCliente";
import fondoCruds from "../../../../sass/fondoCruds.jpg";
import "../../../../css/app.css";


const PageCliente = () => {
    const [idCliente,setIdCliente]= useState(0);
    const [vaciarCampos, setVaciarCampos] = useState({
        id: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [error_list, setErrores] = useState(vaciarCampos);
    const [registerInput, setRegister] = useState({
        id: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
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

    const [clientes, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredClientes, setFilteredClientes] = useState([]);
    const url = "http://127.0.0.1:8000/api/clientes";
    const showData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setData(data);
        setFilteredClientes(data);
    };
    useEffect(() => {
        showData();
    }, []);

    useEffect(() => {
        const result = clientes.filter((cliente) => {
            return cliente.primer_nombre
                .toLowerCase()
                .includes(search.toLowerCase());
        }
        );
        setFilteredClientes(result);
    }, [search]);

    const columns = [
        {
            name: "Identificacion",
            selector: (row) => row.id,
            width: "140px",
        },
        {
            name: "Nombres",
            selector: (row) => row.primer_nombre + " " + row.segundo_nombre,
        },
        {
            name: "Apellidos",
            selector: (row) => row.primer_apellido + " " + row.segundo_apellido,
        },
        {
            name: "Telefono",
            selector: (row) => row.telefono,
            width: "140px",
        },
        {
            name: "Correo",
            selector: (row) => row.email,
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
                            VerCliente(e, row.id,setIdCliente, setRegister,registerInput)
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
                            VerCliente(e, row.id,setIdCliente, setRegister,registerInput)
                        }

                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        id="button-eliminar"
                        onClick={(e) =>
                            EliminarCliente(e,row.id,filteredClientes,setFilteredClientes)
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
        console.log(filteredClientes);
        doc.text("Listado de Clientes Lecare Spa", 20, 10);
        doc.autoTable({
            theme: "grid",
            //columns:['identificacion','nombres','apellidos','Celular','Correo'],
            //columns:columns.selector,

            body: filteredClientes,
        });
        doc.save("Clientes.pdf");
    };

    return (
        <div
        className="container-fondoCruds"
        id="fondoCruds"
        style={{ backgroundImage: `url(${fondoCruds})` }}
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
                                    placeholder="Buscar Cliente"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>
                        </nav>
                        <DataTable
                            columns={columns}
                            data={filteredClientes}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="400px"
                        />
                        <ModalCliente
                            idModal={"registrarModal"}
                            tituloModal={"Registrar Cliente"}
                            colorModal={"#198754"}
                            valueCliente={registerInput}
                            handleInputs={handleInput}
                            error_list={error_list}
                        >
                            <button
                                type="button"
                                class="btn btn-success"
                                onClick={(e) => (CrearCliente(e, registerInput,setFilteredClientes,setErrores) ?  setRegister(vaciarCampos) : "")}
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
                        </ModalCliente>
                        <ModalCliente
                            idModal={"verModal"}
                            tituloModal={"Visualizar Cliente"}
                            colorModal={"rgb(14, 41, 131)"}
                            valueCliente={registerInput}
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
                        </ModalCliente>

                        <ModalCliente
                            idModal={"editarModal"}
                            tituloModal={"Editar Cliente"}
                            colorModal={"#0dcaf0"}
                            valueCliente={registerInput}
                            handleInputs={handleInput}
                            error_list={error_list}

                        >
                            <button type="button" class="btn btn-primary" onClick={(e)=>EditarCliente(e,registerInput,idCliente,setFilteredClientes,setErrores)}>
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
                        </ModalCliente>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PageCliente;
