import React, { Fragment } from "react";
import "styled-components";
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import { format } from "fecha";
import VerHistorial from "../EventosCliente/VerHistorial";
import EliminarHistorial from "../EventosCliente/EliminarHistorial";

const DashboardBusquedaHistorial = ({
    historiales,
    setValuesCampos,
    valuesCampos,
    setTable,
     setkeyPage
}) => {
    const columns = [
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
                        onClick={e=>VerHistorial(e,row.id,setValuesCampos,valuesCampos,setkeyPage,"Ver")}
                    >
                        Ver
                    </button>
                    <button
                        type="button"
                        class="btn btn-info"
                        id="button-ver"
                        onClick={e=>VerHistorial(e,row.id,setValuesCampos,valuesCampos,setkeyPage,"Editar")}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        id="button-eliminar"
                        onClick={e=>EliminarHistorial(e,row.id,setTable,historiales)}
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

                        <DataTable
                            columns={columns}
                            data={historiales}
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

export default DashboardBusquedaHistorial;
