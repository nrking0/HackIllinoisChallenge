import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import './Calendar.css';
import { Button, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import DayView from '../DayView/DayView.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dayss: {
        color: 'white',
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: '80%',
    },
    formControl: {
        margin: '5%',
        width: '80%',
        position: 'relative',
        top: 80,
        left: '45%',
        transform: 'translate(-50%, 0)',
       
      }
});

const Calendar = (props) => {

    const classes = useStyles();

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

        if (b === 7) {
            setDayLabel("Friday - August 7th");
        } else if (b === 8) {
            setDayLabel("Saturday - August 8th");
        } else if (b === 9) {
            setDayLabel("Sunday - August 9th");
        } else if (b === 10) {
            setDayLabel("Monday - August 10th");
        } else if (b === 11) {
            setDayLabel("Tuesday - August 11th");
        } else if (b === 12) {
            setDayLabel("Wednesday - August 12th");
        } else if (b === 13) {
            setDayLabel("Thursday - August 13th");
        } else if (b === 14) {
            setDayLabel("Friday - August 14th");
        } else if (b === 15) {
            setDayLabel("Saturday - August 15th");
        }

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

    const handleChange = (event) => {
        getSelectedDay(event.target.value);
        setDayLabel(event.target.value);
    };

    const [selectedDay, setSelectedDate] = useState([]);

    const [dayLabel, setDayLabel] = useState("Select a Day");

    const [data, setData] = useState();

    const size = useWindowSize();

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
                        <h1>HackIllinois Schedule</h1>
                        <ScheduleComponent height="550px" currentView="Week" selectedDate={new Date(2020, 7, 7)} readonly="true" eventSettings={{ dataSource: data }}>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='Week' />
                            </ViewsDirective>
                        </ScheduleComponent>
                        <ExpandMoreIcon className="arrow2" fontSize="large" color="inherit" />
                    </div>
                    <div className="below2">
                        <Button onClick={() => getSelectedDay(7)} color="inherit" className={classes.dayss} size="large">Friday - August 7th</Button>
                        <Button onClick={() => getSelectedDay(8)} color="inherit" className={classes.dayss} size="large">Saturday - August 8th</Button>
                        <Button onClick={() => getSelectedDay(9)} className={classes.dayss} size="large">Sunday - August 9th</Button>
                        <Button onClick={() => getSelectedDay(10)} className={classes.dayss} size="large">Monday - August 10th</Button>
                        <Button onClick={() => getSelectedDay(11)} className={classes.dayss} size="large">Tuesday - August 11th</Button>
                        <Button onClick={() => getSelectedDay(12)} className={classes.dayss} size="large">Wednesday - August 12th</Button>
                        <Button onClick={() => getSelectedDay(13)} className={classes.dayss} size="large">Thursday - August 13th</Button>
                        <Button onClick={() => getSelectedDay(14)} className={classes.dayss} size="large">Friday - August 14th</Button>
                        <Button onClick={() => getSelectedDay(15)} className={classes.dayss} size="large">Saturday - August 15th</Button>
                    </div>
                    <div className="below3">
                        <h2>{dayLabel}</h2>
                        <DayView day={selectedDay} />
                    </div>
                </div>
            ) :
                (
                    <div>
                        <div className="calendar">
                            <h1 className="mobile">HackIllinois Schedule</h1>
                            <ScheduleComponent height="550px" currentView="Day" selectedDate={new Date(2020, 7, 7)} readonly="true" eventSettings={{ dataSource: data }}>
                                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                                <ViewsDirective>
                                    <ViewDirective option='Day' />
                                    <ViewDirective option='Week' />
                                </ViewsDirective>
                            </ScheduleComponent>
                        </div>
                        <div className="belowMobile">
                            <FormControl className={classes.formControl} color="primary">
                                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dayLabel}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={7}>Friday - August 7th</MenuItem>
                                    <MenuItem value='8'>Saturday - August 8th</MenuItem>
                                    <MenuItem value='9'>Sunday - August 9th</MenuItem>
                                    <MenuItem value='10'>Monday - August 10th</MenuItem>
                                    <MenuItem value='11'>Tuesday - August 11th</MenuItem>
                                    <MenuItem value='12'>Wednesday - August 12th</MenuItem>
                                    <MenuItem value='13'>Thursday - August 13th</MenuItem>
                                    <MenuItem value='14'>Friday - August 14th</MenuItem>
                                    <MenuItem value='15'>Saturday - August 15th</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="belowDayView">
                            <DayView day={selectedDay} />
                        </div>
                    </div>
                )}
        </>

    )
};

export default Calendar;