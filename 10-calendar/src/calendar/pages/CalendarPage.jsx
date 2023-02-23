
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';

import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

import { CalendarEvent, CalendarModal, FabAddNew, Navbar, FabDelete } from "../";
import { localizer, getMessageES } from '../../helpers';
import { useAuthStore } from '../../hooks';

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id || user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347C7F' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
        <Navbar />

        <Calendar
            culture='es'
            localizer={localizer}
            events={ events }
            defaultView={ lastView }
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc( 100vh - 100px)'  }}
            messages={ getMessageES() }
            eventPropGetter={ eventStyleGetter }
            components={{
              event: CalendarEvent
            }}
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onSelect }
            onView={ onViewChanged }
        />
        <CalendarModal></CalendarModal>
        <FabAddNew></FabAddNew>
        <FabDelete></FabDelete>

    </>
  )
}
