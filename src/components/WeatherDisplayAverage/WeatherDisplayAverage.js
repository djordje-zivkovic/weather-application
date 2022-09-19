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
  //potrebno je fino sortirati datume kao sto zadatak nalaze
  const [firstDateState, setFirstDateState] = useState();
  const [endDateState, setEndDateState] = useState();
  const [endMonth, setEndMonth] = useState();
  const [firstMonth, setFirstMonth] = useState();

  const options = { month: "short" };

  useEffect(() => {
    setFirstDateState(new Date(firstDate));
    setEndDateState(new Date(endDate));
    setFirstMonth(
      new Intl.DateTimeFormat("en-US", options).format(firstDateState)
    );
    setEndMonth(
      new Intl.DateTimeFormat("en-US", options).format(firstDateState)
    );
  }, [firstDate, endDate]);

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

  return (
    <div className="display-average-wrapper">
      {totalAverageTemperature && firstDateState && endDateState ? (
        <div>
          <div className="date">
            {firstMonth != endMonth &&
            firstDateState.getFullYear() != endDateState.getFullYear() ? (
              <div>
                {firstDateState.getDate()} {firstMonth}{" "}
                {firstDateState.getFullYear()} - {endDateState.getDate()}{" "}
                {endMonth} {endDateState.getFullYear()}
              </div>
            ) : firstMonth == endMonth &&
              firstDateState.getFullYear() == endDateState.getFullYear() ? (
              <div>
                {firstMonth} {firstDateState.getDate()} -{" "}
                {endDateState.getDate()} {firstDateState.getFullYear()}
              </div>
            ) : firstMonth != endMonth &&
              firstDateState.getFullYear() == endDateState.getFullYear() ? (
              <div>
                {firstDateState.getDate()} {firstMonth} -{" "}
                {endDateState.getDate()} {endMonth} {endDateState.getFullYear()}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="display-average">
            <div className="display-average-temp">
              {totalAverageTemperature}
            </div>
            <div className="celsius-sign">°C</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WeatherDisplayAverage;
