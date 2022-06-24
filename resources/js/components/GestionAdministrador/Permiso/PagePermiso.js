import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Header from "../../Header";
import HeaderAdministrador from "../HeaderAdministrador";
import fondo from "../../../../sass/Crud4.jpg";
import "../../../../css/app.css";
import FuncionListaDatos from "../../FuncionListaDatos";
import ModalPermiso from "./ModalPermiso";
import VerPermiso from "./EventosPermiso/VerPermiso";
import EstadoPermiso from "./EventosPermiso/EstadoPermiso";
const PagePermiso = () => {

    const buttonEstado=[

    ]
    const [vaciarCampos, setVaciarCampos] = useState({
        id: "",
        nombre: "",
        fecha: "",
        hora_inicio: "",
        hora_final: "",
        motivo: "",
        estado: ""
    });

    const vaciarCamposValues = (e) => {
        e.preventDefault();
        setRegister(vaciarCampos);
    };
    const [registerInput, setRegister] = useState({
        id: "",
        nombre: "",
        fecha: "",
        hora_inicio: "",
        hora_final: "",
        motivo: "",
        estado: ""
    });
    const interfaceAdministrador = [
        <Fragment>
            <Header>{<HeaderAdministrador />}</Header>
        </Fragment>,
    ];

    const [permisos, setDataPermisos] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPermisos, setFilteredPermisos] = useState([]);
    const url = "https://lecarespa.herokuapp.com/api/permisos";
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
            name: "Codigo",
            selector: (row) => row.id,
            width: "140px",
        },
        {
            name: "Nombre Fecha",
            selector: (row) => row.fecha,
        },
        {
            name: "Empleado",
            selector: (row) => row.empleado.primer_nombre,
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
                        onClick={e=>VerPermiso(e,row.id,setRegister,registerInput)}
                    >
                        Ver
                    </button>
                    { row.estado=="pendiente"? <button
                        key={"2"}
                        type="button"
                        class="btn btn-info"
                        id="button-eatdo"
                        onClick={e=>EstadoPermiso(e,row.id,setFilteredPermisos)}
                    >
                        Estado
                    </button>:""}
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
                {interfaceAdministrador}
                <div className="container">
                    <div class="row justify-content-center ">
                        <div className="d-grid gap-2">
                            <nav class="navbar navbar bg justify-content-between">
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
                            <ModalPermiso valuePermiso={registerInput} onChangeValues={vaciarCamposValues}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagePermiso;
