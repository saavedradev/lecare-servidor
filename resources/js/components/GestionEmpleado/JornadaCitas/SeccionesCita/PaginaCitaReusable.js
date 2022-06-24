import React from "react";
import DataTable from "react-data-table-component";
import "../../../../../css/app.css";
const PaginaCitaReusable = ({
    serviciosCliente,
    valueCita,
}) => {
    
    const columnsDatableServicios = [
        {
            name: "Nombre Servicio",
            selector: (row) => row.nombre,
        },
        {
            name: "Tipo Servicio",
            selector: (row) => row.tipo,
        },
        {
            name: "Duracion",
            selector: (row) => row.duracion,
        },
    ];

    return (
        <div className="container">
            <br />
            <div class="row justify-content-center mt-2  ">
                <div className="d-grid gap-2 ">
                    <form class="row g-3">
                        <div class="col-md-3">
                            <label class="form-label"> Nombre cliente</label>
                            <input
                                type="text"
                                class="form-control"
                                name="nombre_cliente"
                                disabled={true}
                                defaultValue={valueCita.nombre_cliente}
                            />
                        </div>

                        <div class="col-md-5 me-5 ">
                            <label class="form-label"> Fecha</label>
                            <input
                                type="date"
                                class="form-control"
                                name="fecha"
                                defaultValue={valueCita.fecha}
                                disabled={true}
                            />
                        </div>
                        <div class="col-md-5 ms-5">
                            <label class="form-label">Horario</label>
                            <input
                                type="time"
                                class="form-control"
                                name="horario"
                                defaultValue={valueCita.horario}
                                disabled={true}
                            />
                        </div>
                        <div class="col-md-6 me-5">
                            <DataTable
                                data={serviciosCliente}
                                columns={columnsDatableServicios}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight="150px"
                                paginationRowsPerPageOptions={[4, 8, 12]}
                                disabled={true}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaginaCitaReusable;
