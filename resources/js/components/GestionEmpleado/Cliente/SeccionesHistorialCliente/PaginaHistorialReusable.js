import React from "react";
import DataTable from "react-data-table-component";
import "../../../../../css/app.css";
const PaginaHistorialReusable = ({
    handleInput,
    valueHistorial,
    page,
    children,
    error_list
}) => {
    function CamposEnable(page) {
        if (page == "Ver") {
            return true;
        } else {
            return false;
        }
    }
    return (
        <div className="container">
            <br />
            <div class="row justify-content-center mt-2  ">
                <div className="d-grid gap-2 ">
                    <div class="card mb-2">
                        <div class="card-body">
                            <h4 className="mb-3">Cliente</h4>
                            <form class="row g-3">
                                <div class="col-md-2 ">
                                    <label class="form-label"> Cedula </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="nombre_cliente"
                                        disabled={true}
                                        defaultValue={valueHistorial.cedula}
                                    />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label"> Nombre </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="nombre_cliente"
                                        disabled={true}
                                        defaultValue={valueHistorial.nombre}
                                    />
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label"> Telefono </label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        name="nombre_cliente"
                                        disabled={true}
                                        defaultValue={valueHistorial.telefono}
                                    />
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label"> Fecha</label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        name="fecha"
                                        value={valueHistorial.fecha}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                     <span class="text-danger">
                                        {error_list.fecha}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-2">
                        <div className="card-body">
                            <h4 className="mb-3">Motivo de Consulta</h4>
                            <form className="row g-3">
                                <div class="col-md-6">
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="motivo"
                                        value={valueHistorial.motivo}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.motivo}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-2">
                        <div className="card-body">
                            <h4 className="mb-3">Antecedentes Personales</h4>
                            <form className="row g-3">
                                <div class="col-md-4">
                                    <label class="form-label">
                                        Patológicos
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="patologicos"
                                        value={valueHistorial.patologicos}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                     <span class="text-danger">
                                        {error_list.patologicos}
                                    </span>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">
                                        Quirúrgicos
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="quirurgicos"
                                        value={valueHistorial.quirurgicos}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.quirurgicos}
                                    </span>
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">
                                        Traumáticos
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="traumaticos"
                                        value={valueHistorial.traumaticos}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.traumaticos}
                                    </span>
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Tóxicos</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="toxicos"
                                        value={valueHistorial.toxicos}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.toxicos}
                                    </span>
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">
                                        Farmacológicos
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="farmacologicos"
                                        value={valueHistorial.farmacologicos}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.farmacologicos}
                                    </span>
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Fur</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="fur"
                                        value={valueHistorial.fur}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                     <span class="text-danger">
                                        {error_list.fur}
                                    </span>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">
                                        Alimentación
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="alimentacion"
                                        value={valueHistorial.alimentacion}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.alimentacion}
                                    </span>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Familiares</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="familiares"
                                        value={valueHistorial.familiares}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.familiares}
                                    </span>
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Alérgicos</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="alergicos"
                                        value={valueHistorial.alergicos}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{ resize: "none" }}
                                    />
                                    <span class="text-danger">
                                        {error_list.alergicos}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-2">
                        <div className="card-body">
                            <h4 className="mb-3">Signos Vitales</h4>
                            <form className="row g-3">
                                <div class="col-md-2 ">
                                    <label class="form-label"> T/A </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="presion_arterial"
                                        value={valueHistorial.presion_arterial}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                     <span class="text-danger">
                                        {error_list.presion_arterial}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label"> MMHG </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="presión_arterial_sistolica"
                                        value={
                                            valueHistorial.presión_arterial_sistolica
                                        }
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                     <span class="text-danger">
                                        {error_list.presión_arterial_sistolica}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label"> PULSO </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="pulso"
                                        value={valueHistorial.pulso}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                    <span class="text-danger">
                                        {error_list.pulso}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label"> FR </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="frecuencia_respiratoria"
                                        value={
                                            valueHistorial.frecuencia_respiratoria
                                        }
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                     <span class="text-danger">
                                        {error_list.frecuencia_respiratoria}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-2">
                        <div className="card-body">
                            <h4 className="mb-3">Examen Físico</h4>
                            <form className="row g-3">
                                <div class="col-md-2 ">
                                    <label class="form-label"> PESO </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="peso"
                                        value={valueHistorial.peso}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                    <span class="text-danger">
                                        {error_list.peso}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label"> TALLA </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="talla"
                                        value={valueHistorial.talla}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                    <span class="text-danger">
                                        {error_list.talla}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label"> ORL </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="orl"
                                        value={valueHistorial.orl}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                    <span class="text-danger">
                                        {error_list.orl}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label"> CUELLO </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="cuello"
                                        value={valueHistorial.cuello}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                     <span class="text-danger">
                                        {error_list.cuello}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label">
                                        {" "}
                                        CARDIO/PULMONAR{" "}
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="cardio"
                                        value={valueHistorial.cardio}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                     <span class="text-danger">
                                        {error_list.cardio}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label"> ABDOMEN </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="abdomen"
                                        value={valueHistorial.abdomen}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                     <span class="text-danger">
                                        {error_list.abdomen}
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <label class="form-label">
                                        {" "}
                                        EXTREMIDADES{" "}
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="extremidades"
                                        value={valueHistorial.extremidades}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                    />
                                    <span class="text-danger">
                                        {error_list.extremidades}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-2">
                        <div className="card-body">
                            <h4 className="mb-3">Diagnostico</h4>
                            <form className="row g-3">
                                <div class="col-md-6">
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        name="diagnostico"
                                        value={valueHistorial.diagnostico}
                                        onChange={handleInput}
                                        disabled={CamposEnable(page)}
                                        style={{
                                            resize: "none",
                                        }}
                                    />
                                    <span class="text-danger">
                                        {error_list.diagnostico}
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PaginaHistorialReusable;
