import React from "react";
import "./WeatherDisplayAverage.scss";

const WeatherDisplayAverage = (props) => {
  return (
    <div>
      {props.totalAverageTemperature}
    </div>
  );
};

export default WeatherDisplayAverage;
