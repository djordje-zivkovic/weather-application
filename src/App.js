import InputField from './components/InputField/InputField';
import WeatherDisplayAverage from './components/WeatherDisplayAverage/WeatherDisplayAverage';
import WeatherDisplayDaily from './components/WeatherDisplayDaily/WeatherDisplayDaily';
import Api from './API/Api';
import './App.scss'
import { useState } from 'react';


const App = () => {

  return (
      <>
        <Api />
      </>
  )
}

export default App;
