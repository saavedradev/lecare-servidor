import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import AgregarElementos from "../../../AgregarElementos";
import { MdLibraryAdd } from "react-icons/md";
import EliminarServicioEmpleado from "../../../EliminarFilasTable";
export const VistaAccionesEmpleado = ({
    servicios,
    setServiciosEmpleado,
    serviciosEmpleado,
    handleInputs,
    valueEmpleado,
    handleSeleccionRol,
    page,
    error_list,
    children,
}) => {
    function camposEnable(key, name) {
        if (key == "Ver" || (key == "Editar" && name == "id")) {
            return true;
        } else {
            return false;
        }
    }
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const handleSeleccionServicio = (event) => {
        event.preventDefault();
        setServicioSeleccionado(event.target.value);
        console.log(event.target.value);
    };

    const camposPassword = [
        <Fragment>
            <div class="col-md-5">
                <label class="form-label">Contraseña</label>
                <div class="input-group ">
                    <input
                        type="password"
                        class="form-control"
                        name="password"
                        value={valueEmpleado.password}
                        onChange={handleInputs}
                    />
                </div>
                <span class="text-danger">{error_list.password}</span>
            </div>
            <div class="col-md-5">
                <label class="form-label">Confirmar Contraseña</label>
                <div class="input-group ">
                    <input
                        type="password"
                        class="form-control"
                        name="password_confirmation"
                        value={valueEmpleado.password_confirmation}
                        onChange={handleInputs}
                    />
                </div>
                <span class="text-danger">
                        {error_list.password_confirmation}
                </span>
            </div>
        </Fragment>,
    ];

    const rolesEmpleado = [
        { id: 2, nombre: "Empleado Medico" },
        { id: 3, nombre: "Trabajador General" },
    ];

    const columns = [
        {
            name: "Nombre Servicio",
            selector: (row) => row.nombre,
        },
        {
            name: "Tipo Servicio",
            selector: (row) => row.tipo,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <div>
                    <button
                        type="button"
                        class="btn btn-danger"
                        style={{
                            width: "90px",
                            height: "30px",
                            lineHeight: "10px",
                        }}
                        onClick={(event) =>
                            EliminarServicioEmpleado(
                                event,
                                row.id,
                                serviciosEmpleado,
                                setServiciosEmpleado
                            )
                        }
                        disabled={camposEnable(page, "eliminar")}
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
                <div class="row justify-content-center mt-4 mx-3 ">
                    <div className="d-grid gap-2 ">
                        <form class="row g-3">
                            <div class="col-md-4">
                                <label class="form-label">Cedula</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    name="id"
                                    value={valueEmpleado.id}
                                    onChange={handleInputs}
                                    disabled={camposEnable(page, "id")}
                                />
                                <span class="text-danger">{error_list.id}</span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Primer nombre</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="primer_nombre"
                                    value={valueEmpleado.primer_nombre}
                                    onChange={handleInputs}
                                    disabled={camposEnable(
                                        page,
                                        "primer_nombre"
                                    )}
                                />
                                <span class="text-danger">
                                    {error_list.primer_nombre}
                                </span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Segundo Nombre</label>
                                <div class="input-group ">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="segundo_nombre"
                                        value={valueEmpleado.segundo_nombre}
                                        onChange={handleInputs}
                                        disabled={camposEnable(
                                            page,
                                            "segundo_nombre"
                                        )}
                                    />
                                </div>
                                <span class="text-danger">
                                        {error_list.segundo_nombre}
                                 </span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">
                                    Primer Apellido
                                </label>
                                <div class="input-group ">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="primer_apellido"
                                        value={valueEmpleado.primer_apellido}
                                        onChange={handleInputs}
                                        disabled={camposEnable(
                                            page,
                                            "primer_apellido"
                                        )}
                                    />
                                </div>
                                <span class="text-danger">
                                        {error_list.primer_apellido}
                                </span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">
                                    Segundo Apellido
                                </label>
                                <div class="input-group ">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="segundo_apellido"
                                        value={valueEmpleado.segundo_apellido}
                                        onChange={handleInputs}
                                        disabled={camposEnable(
                                            page,
                                            "segundo_apellido"
                                        )}
                                    />
                                </div>
                                <span class="text-danger">
                                        {error_list.segundo_apellido}
                                 </span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Direccion</label>
                                <div class="input-group ">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="direccion"
                                        value={valueEmpleado.direccion}
                                        onChange={handleInputs}
                                        disabled={camposEnable(
                                            page,
                                            "direccion"
                                        )}
                                    />
                                </div>
                                <span class="text-danger">
                                        {error_list.direccion}
                                    </span>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Telefono</label>
                                <div class="input-group ">
                                    <input
                                        type="number"
                                        class="form-control"
                                        name="telefono"
                                        value={valueEmpleado.telefono}
                                        onChange={handleInputs}
                                        disabled={camposEnable(
                                            page,
                                            "telefono"
                                        )}
                                    />
                                </div>
                                <span class="text-danger">
                                        {error_list.telefono}
                                    </span>
                            </div>
                            <div class="col-md-5">
                                <label class="form-label">Correo</label>
                                <div class="input-group ">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="email"
                                        value={valueEmpleado.email}
                                        onChange={handleInputs}
                                        disabled={camposEnable(page, "email")}
                                    />
                                </div>
                                <span class="text-danger">
                                        {error_list.email}
                                </span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Rol</label>
                                <select
                                    class="form-select"
                                    onChange={handleSeleccionRol}
                                    name={"rol"}
                                    value={valueEmpleado.rol}
                                    disabled={camposEnable(page, "rol")}
                                >
                                    <option
                                        selected
                                        disabled
                                        value={""}
                                        name={"rol"}
                                    >
                                        Elige una opción
                                    </option>
                                    {rolesEmpleado.map((element) => (
                                        <option
                                            key={element.id}
                                            value={element.id}
                                        >
                                            {element.nombre}
                                        </option>
                                    ))}
                                </select>
                                <span class="text-danger">
                                        {error_list.rol}
                                    </span>
                            </div>
                            {page != "Ver" ? camposPassword : ""}
                            <div class="col-md-4">
                                <label class="form-label">Servicio</label>
                                <select
                                    class="form-select"
                                    onChange={handleSeleccionServicio}
                                    disabled={camposEnable(page, "select")}
                                >
                                    <option selected disabled value={""}>
                                        Elige una opción
                                    </option>
                                    {servicios.map((element) => (
                                        <option
                                            key={element.id}
                                            value={element.id}
                                        >
                                            {element.nombre}
                                        </option>
                                    ))}
                                </select>
                                <span class="text-danger">
                                        {error_list.servicios}
                                    </span>
                            </div>
                            <div class="col-md-2">
                                <br />
                                <button
                                    className="btn btn-primary mt-2 mx-2"
                                    style={{ width: "50px" }}
                                    onClick={(e) =>
                                        AgregarElementos(
                                            e,
                                            setServiciosEmpleado,
                                            serviciosEmpleado,
                                            servicios,
                                            servicioSeleccionado,
                                            "servicio"
                                        )
                                    }
                                    disabled={camposEnable(page, "agregar")}
                                >
                                    <MdLibraryAdd size={20} />
                                </button>
                            </div>
                            <div class="col-md-6 ">
                                <br />
                                <DataTable
                                    columns={columns}
                                    data={serviciosEmpleado}
                                    pagination
                                    fixedHeader
                                    fixedHeaderScrollHeight="150px"
                                    paginationRowsPerPageOptions={[4, 8, 12]}
                                />
                            </div>
                        </form>
                        <div className="text-center mt-4 mb-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
