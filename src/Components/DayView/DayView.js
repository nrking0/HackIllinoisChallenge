import React from 'react';
import './DayView.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginBottom: 10,
      backgroundColor: 'royalBlue'
    },
    title: {
      fontSize: 14,
      color: 'white'
    },
    pos: {
      marginBottom: 12,
      color: 'white'
    },
  });

const DayView = (props) => {

    const classes = useStyles();

    var dayArray = props.day;
    console.log(dayArray);

    function convert(a) {
        var conversion = parseInt(a.substring(0,2));
        console.log(conversion);
        if(conversion === 12) {
            return "" + conversion + a.substring(2,5) + " PM";
        }
        if(conversion > 12) {
            conversion -= 12;
            return "" + conversion + a.substring(2,5) + " PM";
        } else {
            return a + " AM";
        }
    }

    return (
        <>
            {dayArray.map((event, index) => (
                <div key={index} className="dayList">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {event.Subject}
                            </Typography>
                            <Typography className={classes.pos} color="inherit">
                                {convert(event.StartTime.substring(11,16))} - {convert(event.EndTime.substring(11,16))}
                            </Typography>
                            <Typography className={classes.pos} color="inherit">
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