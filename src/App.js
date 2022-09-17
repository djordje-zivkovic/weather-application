import InputField from "./components/InputField/InputField";
import WeatherDisplayAverage from "./components/WeatherDisplayAverage/WeatherDisplayAverage";
import WeatherDisplayDaily from "./components/WeatherDisplayDaily/WeatherDisplayDaily";
import { getData } from "./API/Api";
import "./App.scss";
import { useEffect, useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");

  // full API
  const [weather, setWeather] = useState({});
  // list of temperatures for 5 days - 40 temperatures
  const [allTemperatures, setAllTemperatures] = useState([]);
  // average temperature for one day
  const [dailyAverageTemperatures, setDailyAverageTemperatures] = useState();
  // country code from API
  const [countryTwoCharacter, setCountryTwoCharacter] = useState("");
  // country code from flag select
  const [countryTyped, setCountryTyped] = useState("");
  // icon
  const [icon, setIcon] = useState("");

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      if (query) {
        getData(query).then((result) => {
          initAllTemperatures(result.list);
          setWeather(result);
          setQuery("");
          setCountryTwoCharacter(result.city.country);
          setIcon(result.list[0].weather[0].icon);
        });
      }
    }
  };

  // const init = () => {
  //   initTotalAverageTemperatures(allTemperatures);
  //   initDailyAverageTemperature(allTemperatures);
  // };
  // prouciti dalje

  useEffect(() => {
    initDailyAverageTemperature(allTemperatures);
  }, [allTemperatures]);

  // if (weather.list) {
  //   initTotalAverageTemperatures(allTemperatures);
  //   initDailyAverageTemperature(allTemperatures);
  // } else {
  //   return;
  // }

  const initAllTemperatures = (temperatureList) => {
    console.log(temperatureList);
    const temperatures = temperatureList?.map((periodTemperature) => {
      return periodTemperature.main.temp;
    });
    setAllTemperatures(temperatures);
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
    <div
    // style={{
    //   background: `linear-gradient(100deg, #123787 0%, #0ECED2 ${
    //     totalAverageTemperature ? 50 - totalAverageTemperature : 50
    //   }%, #FA9454 100%`,
    // }}
    >
      <InputField
        setQuery={setQuery}
        keyPressHandler={keyPressHandler}
        query={query}
        setCountryTyped={setCountryTyped}
        icon={icon}
      />
      {countryTyped == countryTwoCharacter && dailyAverageTemperatures ? (
        <div>
          <WeatherDisplayAverage allTemperatures={allTemperatures} />
          <WeatherDisplayDaily
            dailyAverageTemperatures={dailyAverageTemperatures}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
