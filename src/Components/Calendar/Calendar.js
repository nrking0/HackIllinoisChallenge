import React, { useEffect } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import '../../App.css'
import { setRef } from '@material-ui/core';

const Calendar = (props) => {

    const [data, setData] = React.useState([]);
    const [printData, setprintData] = React.useState({});

    var read = true;

    var rando = [
        {
            "Id" : "1",
            "StartTime" : "2020-08-08T12:00:00",
            "EndTime" : "2020-08-08T15:00:00",
            "Subject" : "Why?",
            "Name" : "NOOOOO"
        }

    ];

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
            for (var j = 0; j < json.length; j++) {
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
            console.log(data);

            // let temp = [];
            // temp.push(newWholeJson)
            // console.log(temp[0])
            // setData(temp[0]);
            // console.log(data);
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
                <ScheduleComponent height='880px' currentView="Week" selectedDate={new Date(2020, 7, 8)} readonly={{ read }} eventSettings={{ dataSource: newWholeJson }}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    <ViewsDirective>
                        <ViewDirective option='Day' />
                        <ViewDirective option='Week' />
                    </ViewsDirective>
                </ScheduleComponent>
            </div>
    )
};

export default Calendar;