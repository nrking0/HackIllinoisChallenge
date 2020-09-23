import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import './Calendar.css';
import { Button } from '@material-ui/core'
import DayView from '../DayView/DayView.js';

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

    function getSelectedDay(int) {
        var b = parseInt(int);
        var tempPush = [];
        for (var iterator = 0; iterator < data.length; iterator++) {
            var time = data[iterator].StartTime;
            var j = Date.parse(time);
            var a = new Date(j);
            var date = a.getDate();
            if (date === b) {
                tempPush.push(data[iterator]);
            }
        }
        console.log(tempPush);
        setSelectedDate(tempPush);
    }

    const [selectedDay, setSelectedDate] = useState();

    const [data, setData] = useState();

    const size = useWindowSize();

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
                time -= 18000;
                var tStart = new Date(time * 1000);
                var tStartFormatted = tStart.toISOString();
                tStartFormatted = tStartFormatted.substring(0, 19);
                jsonData.events[i].startTime = tStartFormatted;
                var timeEnd = jsonData.events[i].endTime;
                timeEnd -= 18000;
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
            }
            console.log(newWholeJson);
            setData(newWholeJson);
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
                <div>
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
                    <div className="below2">
                        <Button onClick={() => getSelectedDay(7)} className="days" size="large">Friday - August 7th</Button>
                        <Button onClick={() => getSelectedDay(8)} className="days" size="large">Saturday - August 8th</Button>
                        <Button onClick={() => getSelectedDay(9)} className="days" size="large">Sunday - August 9th</Button>
                        <Button onClick={() => getSelectedDay(10)} className="days" size="large">Monday - August 10th</Button>
                        <Button onClick={() => getSelectedDay(11)} className="days" size="large">Tuesday - August 11th</Button>
                        <Button onClick={() => getSelectedDay(12)} className="days" size="large">Wednesday - August 12th</Button>
                        <Button onClick={() => getSelectedDay(13)} className="days" size="large">Thursday - August 13th</Button>
                        <Button onClick={() => getSelectedDay(14)} className="days" size="large">Friday - August 14th</Button>
                        <Button onClick={() => getSelectedDay(15)} className="days" size="large">Saturday - August 15th</Button>
                    </div>
                    <div className="below3">
                        <DayView day={selectedDay} />
                    </div>
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