import React, { useState, useEffect, Fragment } from "react";
import { IoIosAddCircle } from "react-icons/io";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../../../../../css/app.css";
import AgregarElementos from "../../../AgregarElementos";
import OnChangeHandler from "../EventosCita/OnChangeHandler";
import OnSuggestHandler from "../EventosCita/OnSuggestHandler";
import EliminarFilasTable from "../../../EliminarFilasTable";

const PaginaCitaReusable = ({
    children,
    servicios,
    empleados,
    setServiciosCliente,
    serviciosCliente,
    setEmpleadosCita,
    empleadosCita,
    setValueCitaCliente,
    valueCita,
    handleEscritura,
    campoCedulaCliente,
    setCampocampoCedulaCliente,
    page,
    error_list
}) => {

    function camposEnable(key,name){
        if(key=="Ver" || (key=="Editar" && name=="nombreCliente")){
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
    const estadosPago=[{id:1,estado:"Pagado" },{id:2,estado:"Pendiente"}]
    const estadosCita=[{id:1,estado:"Confirmada" },{id:2,estado:"Falta confirmar"}]
    const [clientes, setClientes] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const urlClientes = "http://127.0.0.1:8000/api/clientes";
    useEffect(() => {
        const loadClientes = async () => {
            const response = await axios.get(urlClientes);
            setClientes(response.data);
        };
        loadClientes();
    }, []);
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
                        disabled={camposEnable(page,'borrarServicio')}
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
    const columnsDatableEmpleados = [
        {
            name: "Nombres",
            selector: (row) => row.primer_nombre + " " + row.segundo_nombre,
        },
        {
            name: "Apellidos",
            selector: (row) => row.primer_apellido + " " + row.segundo_apellido,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <div>
                    <button
                        type="button"
                        class="btn btn-danger"
                        disabled={camposEnable(page,'borrarEmpleado')}
                        style={{
                            width: "90px",
                            height: "30px",
                            lineHeight: "10px",
                        }}
                        onClick={e=>EliminarFilasTable(e,row.id,empleadosCita,setEmpleadosCita)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
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
                                disabled={camposEnable(page,"nombreCliente")}
                                onChange={(e) =>
                                    OnChangeHandler(
                                        e.target.value,
                                        clientes,
                                        setSuggestions,
                                        setCampocampoCedulaCliente,
                                        campoCedulaCliente
                                    )
                                }
                                value={campoCedulaCliente}
                            />
                            {suggestions &&
                                suggestions.map((suggestion, i) => (
                                    <div
                                        key={i}
                                        className="suggestion col-md-12 justify-content-md-center text-left"
                                        onClick={() =>
                                            OnSuggestHandler(
                                                suggestion,
                                                setCampocampoCedulaCliente,
                                                setValueCitaCliente,
                                                valueCita,
                                                setSuggestions
                                            )
                                        }
                                    >
                                        {suggestion.primer_nombre +
                                            " " +
                                            suggestion.segundo_nombre +
                                            " " +
                                            suggestion.primer_apellido +
                                            " " +
                                            suggestion.segundo_apellido}
                                    </div>
                                ))}
                          <span class="text-danger">
                                        {error_list.cedula_cliente}
                        </span>
                        </div>
                        {page!="Crear"?"": buttonRegistrarCliente}

                        <div class="col-md-3 ms-5">
                            <label class="form-label">Estado de la cita</label>
                            <select
                                class="form-select"
                                value={valueCita.estado_cita}
                                onChange={handleEscritura}
                                name={"estado_cita"}
                                disabled={camposEnable(page,'estadoCita')}

                            >
                                <option selected disabled value={""} name={"cita"}>
                                    Elige una opción
                                </option>
                                {estadosCita.map(element=>(
                                     <option key={element.id}value={element.estado}> {element.estado}</option>
                                ))}

                            </select>
                            <span class="text-danger">
                                        {error_list.estado_cita}
                                    </span>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Estado de pago</label>
                            <select
                                class="form-select"
                                value={ valueCita.estado_pago}
                                onChange={handleEscritura}
                                name={"estado_pago"}
                                disabled={camposEnable(page,'estadoPago')}
                            >
                                <option selected disabled value={""} name={"pago"}>
                                    Elige una opción
                                </option>
                                {estadosPago.map(element=>(
                                  <option key={element.id} value={element.estado}> {element.estado}</option>
                                ))}

                            </select>
                            <span class="text-danger">
                                        {error_list.estado_pago}
                            </span>
                        </div>

                        <div class="col-md-5 me-5 ">
                            <label class="form-label"> Fecha</label>
                            <input
                                type="date"
                                class="form-control"
                                name="fecha"
                                value={valueCita.fecha}
                                onChange={handleEscritura}
                                disabled={camposEnable(page,'fecha')}
                            />
                        <span class="text-danger">
                         {error_list.fecha}
                        </span>
                        </div>
                        <div class="col-md-5 ms-5">
                            <label class="form-label">Horario</label>
                            <input
                                type="time"
                                class="form-control"
                                name="horario"
                                value={valueCita.horario}
                                onChange={handleEscritura}
                                disabled={camposEnable(page,'horario')}
                            />
                        <span class="text-danger">
                         {error_list.horario}
                        </span>
                        </div>

                        <div class="col-md-5">
                            <label class="form-label">Servicio</label>
                            <select
                                class="form-select"
                                onChange={handleEscritura}
                                value={valueCita.servicioSeleccionado}
                                name="servicioSeleccionado"
                                disabled={camposEnable(page,'seleccionServicios')}
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
                        <span class="text-danger">
                         {error_list.servicios}
                        </span>
                        </div>
                        <div class="col-md-1 me-4">
                            <br />
                            <button
                                className="btn btn-success mt-1"
                                style={{ height: "40px", width: "50px" }}
                                disabled={camposEnable(page,'botonAgregarServicio')}
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
                        <div class="col-md-4 ms-3">
                            <label class="form-label">Empleados</label>
                            <select
                                class="form-select"
                                onChange={handleEscritura}
                                value={valueCita.empleadoSeleccionado}
                                name="empleadoSeleccionado"
                                disabled={camposEnable(page,'seleccionEmpleados')}
                            >
                                <option selected disabled value={""}>
                                    Elige una opción
                                </option>
                                {empleados.map((element) => (
                                    <option key={element.id} value={element.id}>
                                        {element.primer_nombre +
                                            " " +
                                            element.segundo_nombre +
                                            " " +
                                            element.primer_apellido}
                                    </option>
                                ))}
                            </select>
                            <span class="text-danger">
                         {error_list.empleados}
                        </span>
                        </div>
                        <div class="col-md-1 me-5">
                            <br />
                            <button
                                className="btn btn-primary mt-1"
                                style={{ height: "40px", width: "50px" }}
                                disabled={camposEnable(page,'botonAgregarEmpleado')}
                                onClick={(e) =>
                                    AgregarElementos(
                                        e,
                                        setEmpleadosCita,
                                        empleadosCita,
                                        empleados,
                                        valueCita.empleadoSeleccionado,
                                        "empleado"
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
                        <div class="col-md-5">
                            <DataTable
                                columns={columnsDatableEmpleados}
                                data={empleadosCita}
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
    );
};

export default PaginaCitaReusable;
