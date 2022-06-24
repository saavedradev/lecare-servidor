import React, { useState, useEffect, Fragment } from "react";
import { IoIosAddCircle } from "react-icons/io";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../../../../css/app.css";
import AgregarElementos from "../../AgregarElementos";
import EliminarFilasTable from "../../EliminarFilasTable";
import fondoHome from "../../../../sass/fondoHome.png";

import "../../../../css/app.css";


const PaginaCitaReusable = ({
    children,
    servicios,
    setServiciosCliente,
    serviciosCliente,
    valueCita,
    handleEscritura,
    error_list,
    page
}) => {

    function camposEnable(key){
        if(key=="Ver"){
            return true;
        }else{
            return false;
        }
    }
    const buttonRegistrarCliente=[
        <Fragment>
            <div class="col-md-1 me-5" >
                            <br />
                            <a className="btn btn-primary mt-2"  > Registrar</a>
             </div>
        </Fragment>
    ]


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
        {
            name: "Acciones",
            cell: (row) => (
                <div>
                    <button
                        type="button"
                        class="btn btn-danger"
                        disabled={camposEnable(page)}
                        style={{
                            width: "79px",
                            height: "30px",
                            lineHeight: "10px",
                        }}
                        onClick={e=>EliminarFilasTable(e,row.id,serviciosCliente,setServiciosCliente)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div
        className="container-fondoHome-1"
        id="fondoHome"
        style={{ backgroundImage: `url(${fondoHome})` }}
    >
        <div className="container-clientes-citas">
            <br />
            <div class="row align-items-start mt-1  ms-1">
                <div className="d-grid gap-2 ">
                    <form class="row g-2">
                        <div class="col-md-2 me-5 ms-6 ">
                            <label class="form-label"> Fecha</label>
                            <input
                                type="date"
                                class="form-control"
                                name="fecha"
                                value={valueCita.fecha}
                                onChange={handleEscritura}
                                disabled={camposEnable(page)}
                            />
                            <span class="text-danger">{error_list.fecha}</span>
                        </div>
                        <div class="col-md-5 ms-5 me-1">
                            <label class="form-label">Horario</label>
                            <input
                                type="time"
                                class="form-control"
                                name="horario"
                                value={valueCita.horario}
                                onChange={handleEscritura}
                                disabled={camposEnable(page,'horario')}
                            />
                            <span class="text-danger">{error_list.horario}</span>
                        </div>

                        <div class="col-md-5 ms-1">

                            <label class="form-label">Servicio</label>
                            <select
                                class="form-select"
                                onChange={handleEscritura}
                                value={valueCita.servicioSeleccionado}
                                name="servicioSeleccionado"
                                disabled={camposEnable(page)}
                            >
                                <option selected disabled value={""}>
                                    Elige una opción
                                </option>
                                {servicios.map((element) => (
                                    <option key={element.id} value={element.id}>
                                        {element.nombre}
                                    </option>
                                ))}
                            </select>
                            <span class="text-danger">{error_list.servicios}</span>
                        </div>
                        <div class="col-md-1 me-4">
                            <br />
                            <button
                                className="btn btn-success mt-1"
                                style={{ height: "40px", width: "50px" }}
                                disabled={camposEnable(page)}
                                onClick={(event) =>
                                    AgregarElementos(
                                        event,
                                        setServiciosCliente,
                                        serviciosCliente,
                                        servicios,
                                        valueCita.servicioSeleccionado,
                                        "servicio"
                                    )
                                }
                            >
                                <IoIosAddCircle size={"25"} />
                            </button>
                        </div>

                        <div class="col-md-6 me-5">
                            <DataTable
                                data={serviciosCliente}
                                columns={columnsDatableServicios}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight="150px"
                                paginationRowsPerPageOptions={[4, 8, 12]}
                            />
                        </div>

                    </form>
                    {children}
                </div>
            </div>
        </div>
        </div>
    );
};

export default PaginaCitaReusable;
