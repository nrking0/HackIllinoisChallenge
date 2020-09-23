import React from 'react';
import './DayView.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginBottom: 10,
      backgroundColor: 'royalBlue'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const DayView = (props) => {

    const classes = useStyles();

    var dayArray = props.day;
    console.log(dayArray);


    return (
        <>
            {dayArray.map((event, index) => (
                <div key={index} className="dayList">
                    {/* <h3>{event.Subject}</h3>
                    <h3>{event.Description}</h3> */}


                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {event.Subject}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Time
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {event.Location}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {event.Description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </>
    )
};

export default DayView;