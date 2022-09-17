import React, { useState, useEffect } from "react";
import "./WeatherDisplayDaily.scss";

const WeatherDisplayDaily = ({ allTemperatures }) => {
  // average temperature for one day
  const [dailyAverageTemperatures, setDailyAverageTemperatures] = useState();

  const initDailyAverageTemperature = (allTemperatures) => {
    if (allTemperatures.length) {
      const temperaturesCopy = [...allTemperatures];
      const dailyAverageTemperatureList = [];
      let dailyTemperaturesList = [];
      for (let i = 0; i < allTemperatures.length / 8; i++) {
        dailyTemperaturesList.push(temperaturesCopy.splice(0, 8));
      }
      dailyTemperaturesList.map((dailyTemperatures) => {
        const dailyTemperature =
          dailyTemperatures.reduce((a, b) => a + b, 0) /
          dailyTemperatures.length;
        dailyAverageTemperatureList.push(dailyTemperature.toFixed(2));
      });
      setDailyAverageTemperatures(dailyAverageTemperatureList);
    }
  };

  useEffect(() => {
    initDailyAverageTemperature(allTemperatures);
  }, [allTemperatures]);

  return (
    <div>
      {dailyAverageTemperatures ? (
        <div className="weatherDisplayDailyContainer">
          {dailyAverageTemperatures.map((temp, index) => {
            return (
              <div className="daily-weather" key={index}>
                {temp}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WeatherDisplayDaily;
