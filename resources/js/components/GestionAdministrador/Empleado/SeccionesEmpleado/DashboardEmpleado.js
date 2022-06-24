import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import VerEmpleado from "../EventosEmpleado/VerEmpleado";
import EliminarEmpleado from "../EventosEmpleado/EliminarEmpleado";

const DashboardEmpleado = ({
    onclickRegistrarEvent,
    empleados,
    search,
    onChangeBusqueda,
    setkeyPage,
    setAgregarValuesCampos,
    setServiciosEmpleados,
    setEmpleados,
    valuesCampos
}) => {
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
                    class="btn-group btn-group-sm  "
                    role="group"
                    aria-label="Basic example"
                >
                    <button
                        type="button"
                        class="btn btn-primary"
                        id="button-ver"
                        onClick={e=>VerEmpleado(e,"Ver",row.id,setServiciosEmpleados,setAgregarValuesCampos,valuesCampos,setkeyPage)}
                    >
                        Ver
                    </button>
                    <button
                        key={"2"}
                        type="button"
                        class="btn btn-info"
                        id="button-editar"
                        onClick={e=>VerEmpleado(e,"Editar",row.id,setServiciosEmpleados,setAgregarValuesCampos,valuesCampos,setkeyPage)}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        id="button-eliminar"
                        onClick={(e) => EliminarEmpleado(e,row.id,empleados,setEmpleados)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="container ">
                <div class="row justify-content-center  ">
                    <div className="d-grid gap-2 ">
                        <nav class="navbar navbar-light bg-light justify-content-between ">
                            <button
                                className="btn btn-success mt-2 mb-2 ms-4 text-white"
                                onClick={onclickRegistrarEvent}
                            >
                                Crear
                            </button>
                            <form class="form-inline me-5">
                                <input
                                    class="form-control "
                                    type="search"
                                    placeholder="Buscar Empleado"
                                    aria-label="Search"
                                    value={search}
                                    onChange={onChangeBusqueda}
                                />
                            </form>
                        </nav>
                        <DataTable
                            columns={columns}
                            data={empleados}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="420px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardEmpleado;
