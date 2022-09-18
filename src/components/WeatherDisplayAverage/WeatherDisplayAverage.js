import React, { useState, useEffect } from "react";
import "./WeatherDisplayAverage.scss";

const WeatherDisplayAverage = ({
  allTemperatures,
  setAverageTemp,
  endDate,
  firstDate,
}) => {
  // average temperature for 5 days
  const [totalAverageTemperature, setTotalAverageTemperature] = useState();

  const initTotalAverageTemperatures = (allTemperatures) => {
    if (allTemperatures.length) {
      const _totalAverageTemperature =
        allTemperatures.reduce((a, b) => a + b, 0) / allTemperatures.length;
      setTotalAverageTemperature(_totalAverageTemperature.toFixed(0));
      setAverageTemp(_totalAverageTemperature.toFixed(0));
    }
  };

  useEffect(() => {
    initTotalAverageTemperatures(allTemperatures);
  }, [allTemperatures]);

  const firstDateFormated = new Date(firstDate);
  console.log(firstDateFormated);
  const endDateFormated = new Date(endDate);
  console.log(endDateFormated);

  return (
    <div className="display-average-wrapper">
      {totalAverageTemperature ? (
        <div>
          <div>
            {firstDate.split(" ")[0]} - {endDate.split(" ")[0]}
          </div>
          <div className="display-average">{totalAverageTemperature}°C</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WeatherDisplayAverage;
