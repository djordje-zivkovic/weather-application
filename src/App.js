import InputField from "./components/InputField/InputField";
import WeatherDisplayAverage from "./components/WeatherDisplayAverage/WeatherDisplayAverage";
import WeatherDisplayDaily from "./components/WeatherDisplayDaily/WeatherDisplayDaily";
import { getData } from "./API/Api";
import "./App.scss";
import { useEffect, useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");

  // list of temperatures for 5 days - 40 temperatures
  const [allTemperatures, setAllTemperatures] = useState([]);
  // average temperature for one day
  const [dailyAverageTemperatures, setDailyAverageTemperatures] = useState();
  // average temperature for 5 days
  const [totalAverageTemperature, setTotalAverageTemperature] = useState();

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      if (query) {
        getData(query).then((result) => {
          initAllTemperatures(result.list);
          setQuery("");
        });
      }
    }
  };

  // prouciti dalje
  useEffect(() => {
    initTotalAverageTemperatures(allTemperatures);
    initDailyAverageTemperature(allTemperatures);
  }, [allTemperatures]);

  const initAllTemperatures = (temperatureList) => {
    console.log(temperatureList);
    const temperatures = temperatureList?.map((periodTemperature) => {
      return periodTemperature.main.temp;
    });
    setAllTemperatures(temperatures);
  };

  const initTotalAverageTemperatures = (allTemperatures) => {
    if (allTemperatures.length) {
      const _totalAverageTemperature =
        allTemperatures.reduce((a, b) => a + b, 0) / allTemperatures.length;

      setTotalAverageTemperature(_totalAverageTemperature.toFixed(2));
    }
  };

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

  return (
    <div>
      <InputField
        setQuery={setQuery}
        keyPressHandler={keyPressHandler}
        query={query}
      />

      {totalAverageTemperature && (
        <WeatherDisplayAverage
          totalAverageTemperature={totalAverageTemperature}
        />
      )}
      {dailyAverageTemperatures && (
        <div className="container" style={{ display: "flex", gap: "1em" }}>
          <WeatherDisplayDaily
            dailyAverageTemperatures={dailyAverageTemperatures}
          />
        </div>
      )}
    </div>
  );
};

export default App;
