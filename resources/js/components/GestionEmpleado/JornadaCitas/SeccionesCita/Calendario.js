import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React from 'react'
import cambiarTab from '../EventosCita/cambiarTab';
import { IoIosContrast } from 'react-icons/io';

export const Calendario = ({setKeyTab,citas,setTable,valueEmpleado}) => {

    const citasDay =[];
    citas.map(elem =>{
        citasDay.push({title: elem.id, date:elem.fecha})
    })


  return (
    <div className="Container">
     <div className="row justify-content-center">
        <div className='col col-lg-11 '>

        <FullCalendar
    plugins={[dayGridPlugin,listPlugin,timeGridPlugin,interactionPlugin]}
    aspectRatio={'2.6'}
    headerToolbar={{ right:'dayGridMonth today,prev,next'}}
    locale={esLocale}
    events={citasDay}
    eventColor='#378006'
    dateClick={function(info){
        cambiarTab(setKeyTab,info.dateStr,setTable,valueEmpleado)
    }}
    />
        </div>

    </div>

  </div>
  )
}

