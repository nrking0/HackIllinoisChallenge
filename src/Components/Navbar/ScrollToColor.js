import React from "react";
import { useScrollTrigger } from "@material-ui/core";

const ScrollHandler = props => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 15,
    target: props.window ? window() : undefined
  });

  return React.cloneElement(props.children, {
    
    style: {
      height: '15%',
      backgroundColor: trigger ? "orange" : "transparent",
      color: trigger ? "white" : "black",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: "none",
      padding: "10px 0px",

    },
          navItem: {
            color: trigger ? "white" : "black",
          }

  });
};

const ScrollToColor = props => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;