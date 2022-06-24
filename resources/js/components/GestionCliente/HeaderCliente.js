import React from "react";
import {
    BsFillCalendarCheckFill,
} from "react-icons/bs";
import { FcCalendar} from "react-icons/fc";
import { MdRecordVoiceOver } from "react-icons/md";
import { Link } from "react-router-dom";

export const HeaderCliente = () => {
    const modulosClient = [
        { id: 1, modulo: "Citas", url: "/cliente/citas"},
    ];
    const getIcon=()=>{
        console.log('prueba');
    }
    return (
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
                {modulosClient.map((item, key) => (
                    <li class="nav-item" key={key}>
                        <Link className="nav-link" to={item.url}>

                            {item.modulo ==="Citas"?
                             <FcCalendar size={25} style={{fill:'white',marginRight:7}} />  : ""
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
export default HeaderCliente;
