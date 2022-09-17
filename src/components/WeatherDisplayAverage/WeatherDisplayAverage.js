import React, { useState, useEffect } from "react";
import "./WeatherDisplayAverage.scss";

const WeatherDisplayAverage = ({ allTemperatures, setAverageTemp }) => {
  // average temperature for 5 days
  const [totalAverageTemperature, setTotalAverageTemperature] = useState();

  const initTotalAverageTemperatures = (allTemperatures) => {
    if (allTemperatures.length) {
      const _totalAverageTemperature =
        allTemperatures.reduce((a, b) => a + b, 0) / allTemperatures.length;
      setTotalAverageTemperature(_totalAverageTemperature.toFixed(2));
      setAverageTemp(_totalAverageTemperature.toFixed(2));
    }
  };

  useEffect(() => {
    initTotalAverageTemperatures(allTemperatures);
  }, [allTemperatures]);

  return (
    <div>
      {totalAverageTemperature ? <div>{totalAverageTemperature}</div> : ""}
    </div>
  );
};

export default WeatherDisplayAverage;
