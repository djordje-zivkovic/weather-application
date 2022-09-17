import React from "react";
import "./WeatherDisplayDaily.scss";

const WeatherDisplayDaily = ({ dailyAverageTemperatures }) => {
  return (
    <div className="weatherDisplayDailyContainer">
      {dailyAverageTemperatures.map((temp, index) => {
        return (
          <div className="daily-weather" key={index}>
            {temp}
          </div>
        );
      })}
    </div>
  );
};

export default WeatherDisplayDaily;
