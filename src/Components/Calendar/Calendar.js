import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import './Calendar.css';

const Calendar = (props) => {

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });

        useEffect(() => {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        return windowSize;
    }




    const [data, setData] = useState([]);

    const size = useWindowSize();

    var read = true;

    // var rando = [
    //     {
    //         "Id": "1",
    //         "StartTime": "2020-08-08T12:00:00",
    //         "EndTime": "2020-08-08T15:00:00",
    //         "Subject": "Why?",
    //         "Name": "NOOOOO"
    //     }

    // ];

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
                    "EndTime": json[j].endTime,
                    "Location": "Online"
                }
                newWholeJson.push(newJson);
                data.push(newJson);
            }
            console.log(newWholeJson);
            setData(data);
            console.log(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {(size.width > 800) ? (
                <div className="calendar">
                    <h1>HackThis Schedule</h1>
                    <ScheduleComponent height="550px" currentView="Week" selectedDate={new Date(2020, 7, 8)} readonly={{ read }} eventSettings={{ dataSource: data }}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                        <ViewsDirective>
                            <ViewDirective option='Day' />
                            <ViewDirective option='Week' />
                        </ViewsDirective>
                    </ScheduleComponent>
                </div>
            ) :
                (
                    <div className="calendar">
                        <h1 className="mobile">HackThis Schedule</h1>
                        <ScheduleComponent height="550px" currentView="Day" selectedDate={new Date(2020, 7, 8)} readonly={{ read }} eventSettings={{ dataSource: data }}>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='Week' />
                            </ViewsDirective>
                        </ScheduleComponent>
                    </div>
                )}
        </>

    )
};

export default Calendar;