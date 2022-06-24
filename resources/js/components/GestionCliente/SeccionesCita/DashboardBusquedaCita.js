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
import fondoHome from "../../../../sass/fondoHome.png";

import "../../../../css/app.css";

const DashboardBusquedaCita = ({
    citas,
    setCitas,
    search,
    onChangeBusqueda,
    setServicioscitas,
    setAgregarValuesCampos,
    valuesCampos,
    setkeyPage
}) => {

    const columns = [
        {
            name: "Hora",
            selector: (row) => row.horario,
            width: "30%",
        },
        {
            name: "Fecha",
            selector: (row) => row.fecha,
            width: "30%",
        },
        {
            name: "Acciones",
            cell: (row) => (
                <div
                    class="btn-group btn-group-sm "
                    role="group"
                    aria-label="Basic example"
                >
                    <button
                        type="button"
                        class="btn btn-primary"
                        id="button-ver"
                        style={{ width:'30%',height: '60%' }}
                        onClick={(e) =>
                            VerCita(
                                e,
                                "Ver",
                                row.id,
                                setServicioscitas,
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
                        style={{ width:'40%',height: '60%' }}
                        onClick={(e) =>
                            VerCita(
                                e,
                                "Editar",
                                row.id,
                                setServicioscitas,
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
                        style={{ width:120,height: '60%' }}
                        onClick={(e) => EliminarCita(e,row.id,setCitas,citas)}
                    >
                        Cancelar
                    </button>
                </div>
            ),
            width: "40%"
        },
    ];

    return (
        
        <div>
               <div
        className="container-fondoHome"
        id="fondoHome"
        style={{ backgroundImage: `url(${fondoHome})` }}
    >
            <div className="container.cita">
                <div class="row justify-content-center me-1 ">
                    <div className="d-grid gap-2 ">
                        <nav class="navbar navbar-light bg justify-content-between">
                            <form class="form-inline me-3">
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
                            fixedHeaderScrollHeight="400px"


                        />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DashboardBusquedaCita;
