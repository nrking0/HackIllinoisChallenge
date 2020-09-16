import React, { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import '../../App.css'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const Calendar = (props) => {
    const [events, setEvents] = useState([]);

    var read = true;

    var newWholeJson = [];


    const getEvents = async () => {
        try {
            const response = await fetch("https://api.hackillinois.org/event/");
            const jsonData = await response.json();
            console.log(jsonData);
            for (var i = 0; i < jsonData.events.length; i++) {
                var obj = jsonData.events[i];
                var time = obj.startTime;
                var tStart = new Date(time * 1000);
                var tStartFormatted = tStart.toISOString();
                tStartFormatted = tStartFormatted.substring(0, 19);
                jsonData.events[i].startTime = tStartFormatted;
                var timeEnd = jsonData.events[i].endTime;
                var tEnd = new Date(timeEnd * 1000);
                var tEndFormatted = tEnd.toISOString();
                tEndFormatted = tEndFormatted.substring(0, 19);
                jsonData.events[i].endTime = tEndFormatted;
            }
            // var temp = events;
            // temp.push(jsonData);
            // setEvents(temp);
            var json = jsonData.events;
            for(var i = 0; i < json.length; i ++) {
                var newJson = {
                    "Id": json[i].id,
                    "Subject": json[i].name,
                    "Description": json[i].description,
                    "StartTime": json[i].startTime,
                    "EndTime": json[i].endTime
                }
                newWholeJson.push(newJson);
            }

            console.log(newWholeJson);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div>
            <ScheduleComponent height='550px' selectedDate={new Date(2020, 7, 8)} readonly={{ read }}
                eventSettings={{
                    dataSource: newWholeJson,
                }}
            >

                <Inject services={[Day, Week, Month, Agenda]} />
                <ViewsDirective>
                    <ViewDirective option='Day' />
                    <ViewDirective option='Week' />
                </ViewsDirective>
            </ScheduleComponent>
        </div>
    )
};

export default Calendar;