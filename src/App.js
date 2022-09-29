import { useEffect, useState } from "react";
import { getData } from "./API/Api";
import InputField from "./components/InputField/InputField";
import WeatherDisplayAverage from "./components/WeatherDisplayAverage/WeatherDisplayAverage";
import WeatherDisplayDaily from "./components/WeatherDisplayDaily/WeatherDisplayDaily";
import "./App.scss";

const App = () => {
  // words in input
  const [query, setQuery] = useState("");
  // list of temperatures for 5 days - 40 temperatures
  const [allTemperatures, setAllTemperatures] = useState();
  // country code from api
  const [countryTwoCharacter, setCountryTwoCharacter] = useState("");
  // country code from flag select
  const [countryTyped, setCountryTyped] = useState("");
  // icon
  const [icon, setIcon] = useState("");
  // get AverageTemp for gradient
  const [AverageTemp, setAverageTemp] = useState();
  // get date from API{{
  const [endDate, setEndDate] = useState("");
  const [firstDate, setFirstDate] = useState("");
  // from moment API starts to fetch to getting all data needed
  const [loading, setLoading] = useState(false);
  // failed api catch
  const [error, setError] = useState(false);

  const submit = () => {
    if (query) {
      setLoading(true);
      getData(query)
        .then((result) => {
          initAllTemperatures(result.list);
          setQuery("");
          setCountryTwoCharacter(result.city.country);
          setIcon(result.list[0].weather[0].icon);
          setFirstDate(result.list[0].dt_txt);
          setEndDate(result.list[39].dt_txt);
        })
        .catch(function () {
          setError(true);
        })
        .finally(function () {
          setLoading(false);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const initAllTemperatures = (temperatureList) => {
    const temperatures = temperatureList?.map((periodTemperature) => {
      return periodTemperature.main.temp;
    });
    setAllTemperatures(temperatures);
  };

  return (
    <div
      style={{
        background: `linear-gradient(100deg, #0f4897 , #159ae5 ${
          AverageTemp ? 50 - AverageTemp : 50
        }%, #fe9859`,
      }}
      className="App"
    >
      <InputField
        setQuery={setQuery}
        submit={submit}
        handleKeyPress={handleKeyPress}
        query={query}
        setCountryTyped={setCountryTyped}
        countryTwoCharacter={countryTwoCharacter}
        icon={icon}
        loading={loading}
      />
      {countryTyped === countryTwoCharacter && allTemperatures ? (
        <div>
          <WeatherDisplayAverage
            allTemperatures={allTemperatures}
            setAverageTemp={setAverageTemp}
            firstDate={firstDate}
            endDate={endDate}
          />
          <WeatherDisplayDaily allTemperatures={allTemperatures} />
        </div>
      ) : (countryTyped !== countryTwoCharacter &&
          loading === false &&
          countryTwoCharacter) ||
        error ? (
        <div className="error">Error: City not found</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
