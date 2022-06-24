import React, { Fragment } from "react";
import "styled-components";
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import { format } from "fecha";
import VerCita from "../EventosCita/VerCita"

const DashboardBusquedaCita = ({
    citas,
    setServicioscitas,
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
                                setServicioscitas,
                                setAgregarValuesCampos,
                                valuesCampos,
                                setkeyPage
                            )
                        }
                    >
                        Ver
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
