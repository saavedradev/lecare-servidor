import React from "react";
import { FcCalendar,FcPortraitMode ,FcCollaboration ,FcStatistics,FcVoicePresentation,FcAssistant} from "react-icons/fc"
import { MdRecordVoiceOver } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";



export const HeaderEmpleado = () => {
    const modulosAdmin = [
        { id: 1, modulo: "Citas", url: "/jornada" },
        { id: 2, modulo: "Clientes", url: "/historial" },
        { id: 3, modulo: "Permisos", url: "/solicitudes" },
    ];

    return (
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
                {modulosAdmin.map((item, key) => (
                    <li class="nav-item active" key={key} >
                        <Link className="nav-link" to={item.url}>

                        {item.modulo ==="Citas"?
                            <FcCalendar size={25} style={{fill:'white',marginRight:7}} /> :

                            item.modulo === "Clientes" ?
                            <FcPortraitMode size={25} style={{fill:'white',marginRight:7}} />:

                            item.modulo === "Permisos" ?
                            <FcVoicePresentation size={27} style={{fill:'white',marginRight:7}} />:
                            ""
                            }

                             {item.modulo}
                            <span className="sr-only"></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    );
};
export default HeaderEmpleado;
