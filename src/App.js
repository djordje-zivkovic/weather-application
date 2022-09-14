import InputField from './components/InputField/InputField';
import WeatherDisplayAverage from './components/WeatherDisplayAverage/WeatherDisplayAverage';
import WeatherDisplayDaily from './components/WeatherDisplayDaily/WeatherDisplayDaily';
import Api from './API/Api';

function App() {
  return (
    <>
        <InputField />
        <WeatherDisplayAverage />
        <WeatherDisplayDaily />
        <Api />
    </>
  );
}

export default App;
