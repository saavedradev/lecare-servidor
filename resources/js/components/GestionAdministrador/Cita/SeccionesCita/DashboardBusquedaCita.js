import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "styled-components";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "fecha";
import VerCita from "../EventosCita/VerCita"
import EliminarCita from "../EventosCita/EliminarCita";

const DashboardBusquedaCita = ({
    citas,
    setCitas,
    search,
    onChangeBusqueda,
    setText,
    setServicioscitas,
    setEmpleadosCita,
    setAgregarValuesCampos,
    valuesCampos,
    setkeyPage
}) => {
    const columns = [
        {
            name: "Hora",
            selector: (row) => row.horario,
            width: "140px",
        },
        {
            name: "Fecha",
            selector: (row) => row.fecha,
            width: "140px",
        },
        {
            name: "Cliente",
            selector: (row) => row.cliente.primer_nombre+" "+row.cliente.segundo_nombre+" "+row.cliente.primer_apellido,
        },
        {
            name: "Estado de cita",
            selector: (row) => row.estado_cita,
        },
        {
            name: "Estado de pago",
            selector: (row) => row.estado_pago,
            width: "140px",
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
                        onClick={(e) =>
                            VerCita(
                                e,
                                "Ver",
                                row.id,
                                setText,
                                setServicioscitas,
                                setEmpleadosCita,
                                setAgregarValuesCampos,
                                valuesCampos,
                                setkeyPage
                            )
                        }
                    >
                        Ver
                    </button>
                    <button
                        type="button"
                        class="btn btn-info"
                        id="button-editar"
                        onClick={(e) =>
                            VerCita(
                                e,
                                "Editar",
                                row.id,
                                setText,
                                setServicioscitas,
                                setEmpleadosCita,
                                setAgregarValuesCampos,
                                valuesCampos,
                                setkeyPage
                            )
                        }
                          >
                        Editar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        id="button-eliminar"
                        onClick={(e) => EliminarCita(e,row.id,setCitas,citas)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="container">
                <div class="row justify-content-center mt-3 ">
                    <div className="d-grid gap-2 ">
                        <nav class="navbar navbar-light bg-light justify-content-between">
                            <form class="form-inline me-5">
                                <input
                                    class="form-control "
                                    type="search"
                                    placeholder="Buscar Cita"
                                    aria-label="Search"
                                    value={search}
                                    onChange={onChangeBusqueda}
                                />
                            </form>
                        </nav>
                        <DataTable
                            columns={columns}
                            data={citas}
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

export default DashboardBusquedaCita;
