import React, { useEffect } from 'react';
import { ScheduleComponent, Day, Week, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import '../../App.css'

const Calendar = (props) => {

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
            var json = jsonData.events;
            for(var j = 0; j < json.length; j++) {
                var newJson = {
                    "Id": json[j].id,
                    "Subject": json[j].name,
                    "Description": json[j].description,
                    "StartTime": json[j].startTime,
                    "EndTime": json[j].endTime
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
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <ScheduleComponent height='550px' selectedDate={new Date(2020, 7, 8)} readonly={{ read }} eventSettings={{ dataSource: newWholeJson }}>
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