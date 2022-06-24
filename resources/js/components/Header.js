import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    BsPersonCircle,
    BsPersonX,
    BsPersonLinesFill,
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import logoNav from "../../sass/logonuevonav.png";
import { FcButtingIn } from "react-icons/fc"


export const Header= ({children}) => {
    const areaPersonal = (event) => {
        navigate("/home");
    };

    const usuario= localStorage.getItem('auth-name');
    const navigate= useNavigate();
    const cerrarSesion = (event) =>{
    event.preventDefault();
            axios.post("https://lecarespa.herokuapp.com/api/logout",localStorage.getItem('auth-token')).then(res => {
                console.log(res.data.status)
                if(res.data.status===200){
                    localStorage.removeItem('auth-token');
                    localStorage.removeItem('auth-name');
                    localStorage.removeItem("auth-rolUsuario")
                    localStorage.removeItem("auth-user");
                    localStorage.removeItem("auth-cedula")
                    navigate('/')
                }
    });
    }
    const perfil = (event) => {
        navigate("/perfil");
    };

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="container-fluid">
                <img src={logoNav} alt="calendar" className="mr-2 w-11 h-11" />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {children}
                    <ul class="navbar-nav ms-auto ">
                <li class="nav-item dropdown ">
                    <a
                        class="nav-link dropdown-toggle "
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <FcButtingIn size={28} style={{fill:'dark',marginRight:7}} /> {usuario}
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                        aria-labelledby="navbarDropdown"
                    >
                        <li onClick={areaPersonal}>
                            <a class="dropdown-item" href="#">
                                <AiFillHome size={20} /> Area Principal
                            </a>
                        </li>

                        <li onClick={perfil}>
                            <a class="dropdown-item" href="#">
                                <BsPersonLinesFill size={20} /> Perfil
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>
                        <li onClick={cerrarSesion}>
                            <a class="dropdown-item" href="#">
                                <BsPersonX size={20}/> Cerrar sesión
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
                   </div>
            </nav>

        </div>
    )
}


export default Header;
