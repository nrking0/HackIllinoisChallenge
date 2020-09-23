import React from 'react';
import './DayView.css';

const DayView = (props) => {

    var dayArray = props.day;
    console.log(dayArray);


    return (
        <>
        {dayArray.map((event, index) => (
            <div key={index}>
                <h3>{event.Subject}</h3>
                <h3>{event.Description}</h3>
            </div>
        ))}
        </>
    )
};

export default DayView;