import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Header from "../../Header";
import HeaderEmpleado from "../HeaderEmpleado";
import fondo from "../../../../sass/Crud4.jpg";
import "../../../../css/app.css";
import ModalPermiso from "./ModalPermiso";
import VerPermiso from "./EventosPermiso/VerPermiso";
import FuncionListaDatos from "../../FuncionListaDatos";
import EliminarPermiso from "./EventosPermiso/EliminarPermiso";
import CrearPermiso from "./EventosPermiso/CrearPermiso";
import EditarPermiso from "./EventosPermiso/EditarPermiso";
const PagePermiso = () => {
    const [vaciarCampos, setVaciarCampos] = useState({
        id: "",
        fecha: "",
        hora_inicio: "",
        hora_final: "",
        motivo: "",
        estado: "",
    });
    const [error_list, setErrores] = useState(vaciarCampos);
    const vaciarCamposValues = (e) => {
        e.preventDefault();
        setRegister(vaciarCampos);
    };
    const [registerInput, setRegister] = useState({
        cedula_empleado: localStorage.getItem("auth-cedula"),
        id: "",
        fecha: "",
        hora_inicio: "",
        hora_final: "",
        motivo: "",
        estado: "",
    });
    const headerEmpleado = [
        <Fragment>
            <Header>{<HeaderEmpleado />}</Header>
        </Fragment>,
    ];
    const handleInput = (event) => {
        event.persist();
        event.preventDefault();
        setRegister({
            ...registerInput,
            [event.target.name]: event.target.value,
        });
        setErrores({ ...error_list, [event.target.name]: "" });
    };
    const [permisos, setDataPermisos] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPermisos, setFilteredPermisos] = useState([]);
    const url = `https://lecarespa.herokuapp.com/api/permisosEmpleado/${registerInput.cedula_empleado}`;
    FuncionListaDatos(url, setDataPermisos, setFilteredPermisos);
    useEffect(() => {
        const result = permisos.filter((element) => {
            return element.motivo.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredPermisos(result);
    }, [search]);
    console.log(filteredPermisos);
    const columns = [
        {
            name: "Fecha",
            selector: (row) => row.fecha,
        },
        {
            name: "Estado",
            selector: (row) => row.estado,
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
                            VerPermiso(e, row.id, setRegister, registerInput)
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
                            VerPermiso(e, row.id, setRegister, registerInput)
                        }
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        id="button-eliminar"
                        onClick={(e) =>
                            EliminarPermiso(
                                e,
                                row.id,
                                filteredPermisos,
                                setFilteredPermisos
                            )
                        }
                    >
                        Eliminar
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div
            className="container-fondoServicios"
            id="fondoCrudsServi"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <div>
                {headerEmpleado}
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
                                <form class="form-inline">
                                    <input
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Buscar Permiso"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </form>
                            </nav>
                            <DataTable
                                columns={columns}
                                data={filteredPermisos}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight="400px"
                            />
                            <ModalPermiso
                                idModal={"registrarModal"}
                                onChangeValues={handleInput}
                                valuePermiso={registerInput}
                                colorModal={"#198754"}
                                tituloModal={"Registrar permiso"}
                                error_list={error_list}
                            >
                                <button
                                    className="btn btn-success"
                                    onClick={(e) => CrearPermiso(e,setRegister,registerInput,vaciarCampos,setFilteredPermisos,setErrores)}
                                >
                                    Registrar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => vaciarCamposValues(e)}
                                >
                                    Cerrar
                                </button>
                            </ModalPermiso>
                            <ModalPermiso
                                idModal={"verModal"}
                                onChangeValues={handleInput}
                                valuePermiso={registerInput}
                                colorModal={"rgb(14, 41, 131)"}
                                tituloModal={"ver permiso"}
                                error_list={error_list}
                            >
                                <button
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => vaciarCamposValues(e)}
                                >
                                    Cerrar
                                </button>
                            </ModalPermiso>
                            <ModalPermiso
                                idModal={"editarModal"}
                                onChangeValues={handleInput}
                                valuePermiso={registerInput}
                                colorModal={"#0dcaf0"}
                                tituloModal={"Editar permiso"}
                                error_list={error_list}
                            >
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => EditarPermiso(e,registerInput,setRegister,setFilteredPermisos,vaciarCampos,setErrores)}
                                >
                                    Guardar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => vaciarCamposValues(e)}
                                >
                                    Cerrar
                                </button>


                            </ModalPermiso>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagePermiso;
