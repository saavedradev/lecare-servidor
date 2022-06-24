import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import HeaderAdministrador from "./GestionAdministrador/HeaderAdministrador";
import $ from "jquery";
import "../../css/app.css";
import { positions } from "@mui/system";
import BuscarUser from "./layout/BuscarUser";
import fondo from "../../sass/crudPerfil2.jpg"

export const PagePerfil = () => {
    const [valuesUser, setValuesUser] = useState({
        userRol: localStorage.getItem("auth-rolUsuario"),
        id: localStorage.getItem("auth-cedula"),
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
        email: "",
        direccion: "",
    });

    console.log(valuesUser);
    const showData = async () => {
        console.log(valuesUser.userRol);
        if (valuesUser.userRol == "Cliente") {
            const response = await fetch(
                `https://lecarespa.herokuapp.com/api/buscarCliente/${valuesUser.id}`
            );
            const valor = await response.json();
            setValuesUser({ ...valuesUser, ...valor });
        } else {
            const response = await fetch(
                `https://lecarespa.herokuapp.com/api/buscarUser/${valuesUser.id}`
            );
            const valor = await response.json();
            setValuesUser({ ...valuesUser, ...valor });

        }
    };

    useEffect(() => {
        showData();
    }, []);
    console.log(valuesUser);

    const campoDireccion = [
        <Fragment>
            <label for="disabledTextInput" class="form-label">
            <p class="text-white ">   Direccion</p>
            </label>
            <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                defaultValue={valuesUser.direccion}
            />
            <br />
        </Fragment>,
    ];

    const interfaceAdministrador = [
        <Fragment>
            <Header></Header>
        </Fragment>,
    ];
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <div
        className="container-fondoPerfil"
        id="fondoCrudsServi"
        style={{ backgroundImage: `url(${fondo})` }}
    >
        <div className="justify-content-center">
            <Fragment>
                {interfaceAdministrador}

                {selectedImage && (
                    <div>
                        <img
                            alt="not fount"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>
                            Eliminar
                        </button>
                    </div>
                )}
                <br />

               
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
            </Fragment>
            <br />
            <br />
            <form>
                <fieldset disabled>
                    <div class="cont-Column">
                        <div id="izquierda" class="col-4 col-m-1 col-lg-2 ">
                            <label for="disabledTextInput" class="form-label" >
                                <p class="text-white ">Cedula</p>
                            </label>
                            
                            <input 
                                type="text"
                                id="disabledTextInput"
                                class="form-control"
                                defaultValue={valuesUser.id}  
                            />
                            <br />
                            <label for="disabledTextInput" class="form-label">
                            <p class="text-white "> Primer Nombre</p>
                            </label>
                            <input
                                type="text"
                                id="disabledTextInput"
                                class="form-control"
                                defaultValue={valuesUser.primer_nombre}
                            />
                            <br />
                            <label for="disabledTextInput" class="form-label">
                            <p class="text-white "> Segundo Nombre</p>
                            </label>
                            <input
                                type="text"
                                id="disabledTextInput"
                                class="form-control"
                                defaultValue={valuesUser.segundo_nombre}
                            />
                            <br />
                            <label for="disabledTextInput" class="form-label">
                            <p class="text-white ">Primer Apellido{" "}</p>
                            </label>
                            <input
                                type="text"
                                id="disabledTextInput"
                                class="form-control"
                                defaultValue={valuesUser.primer_apellido}
                            />
                        </div>
                        <br/>
                        <div id="Derecha" class="col-4 col-m-1 col-lg-2 ">
                            <label for="disabledTextInput" class="form-label">
                            <p class="text-white ">  Segundo Apellido{" "}</p>
                            </label>
                            <input
                                type="text"
                                id="disabledTextInput"
                                class="form-control"
                                defaultValue={valuesUser.segundo_apellido}
                            />
                            <br />

                            <label for="disabledTextInput" class="form-label">
                            <p class="text-white ">   Celular</p>
                            </label>
                            <input
                                type="text"
                                id="disabledTextInput"
                                class="form-control"
                                defaultValue={valuesUser.telefono}
                            />
                            <br />

                            {valuesUser.userRol != "Cliente"
                                ? campoDireccion
                                : ""}

                            <label for="disabledTextInput" class="form-label">
                            <p class="text-white ">  Correo</p>
                            </label>
                            <input
                                type="text"
                                id="disabledTextInput"
                                class="form-control"
                                defaultValue={valuesUser.email}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        </div>
                );
};

export default PagePerfil;