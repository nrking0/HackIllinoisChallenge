import React, {useState, useEffect} from 'react';
import { ScheduleComponent, Day, Week, Month, Agenda, Inject, ViewsDirective, ViewDirective} from '@syncfusion/ej2-react-schedule';
import '../../App.css'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const Calendar = (props) => {
    const [events, setEvents] = useState([]);

    var read = true;


    var remoteData = new DataManager({
        url: 'https://api.hackillinois.org/event/',
        adaptor: new WebApiAdaptor(),
        crossDomain: true
    });

    const getEvents = async () => {
        try {
          const response = await fetch("https://js.syncfusion.com/demos/ejservices/api/Schedule/loadData");
          const jsonData = await response.json();
          console.log(jsonData);
          setEvents(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      }
    
      useEffect(() => {
        getEvents();
      }, []);

    return(
        <div>
            <ScheduleComponent height='550px' selectedDate={new Date(2017, 5, 5)} readonly = {{read}}
            eventSettings={{ dataSource: events,
            /*fields: {
                id: 'Id',
                subject: { name: 'Subject' },
                isAllDay: { name: 'IsAllDay' },
                startTime: { name: 'StartTime' },
                endTime: { name: 'EndTime' }
            }*/
            }}
            >
          <Inject services={[Day, Week, Month, Agenda]}/>
          <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
            </ViewsDirective>
        </ScheduleComponent>
        </div>
    )
};

export default Calendar;