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
  // country code from API
  const [countryTwoCharacter, setCountryTwoCharacter] = useState("");
  // country code from flag select
  const [countryTyped, setCountryTyped] = useState("");
  // icon
  const [icon, setIcon] = useState("");
  // get AverageTemp for gradient
  const [AverageTemp, setAverageTemp] = useState();

  const submit = () => {
    {
      if (query) {
        getData(query).then((result) => {
          initAllTemperatures(result.list);
          setQuery("");
          setCountryTwoCharacter(result.city.country);
          setIcon(result.list[0].weather[0].icon);
        });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const initAllTemperatures = (temperatureList) => {
    console.log(temperatureList);
    const temperatures = temperatureList?.map((periodTemperature) => {
      return periodTemperature.main.temp;
    });
    setAllTemperatures(temperatures);
  };

  return (
    <div
      style={{
        background: `linear-gradient(100deg, #123787 0%, #0ECED2 ${
          AverageTemp ? 50 - AverageTemp : 50
        }%, #FA9454 100%`,
      }}
    >
      <InputField
        setQuery={setQuery}
        submit={submit}
        handleKeyPress={handleKeyPress}
        query={query}
        setCountryTyped={setCountryTyped}
        countryTwoCharacter={countryTwoCharacter}
        icon={icon}
      />
      {countryTyped == countryTwoCharacter ? (
        <div>
          <WeatherDisplayAverage
            allTemperatures={allTemperatures}
            setAverageTemp={setAverageTemp}
          />
          <WeatherDisplayDaily allTemperatures={allTemperatures} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
