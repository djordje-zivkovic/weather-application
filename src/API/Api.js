import React, { useState } from 'react';

const api = { // prebaciti key u neki konfiguracioni .txt fajl
    key: "f6a2fb3e9764cc4cc8fa3044874aa2c4",
    base: "https://api.openweathermap.org/data/2.5/"
}

// Kupi za 5 dana, i daje vrijeme svaki 3 sata.

// kupim podatke za svaki dan u 12:00 casova, jer nemam mogucnost drugaciju vrijednost da uzmem

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// example for Belgrade https://api.openweathermap.org/data/2.5/forecast?q=Belgrade&units=metric&APPID=f6a2fb3e9764cc4cc8fa3044874aa2c4

// result.list.

const Api = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const getData = (event) => {
        if (event.key === "Enter") { 
          fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
              setWeather({...result}); 
              setQuery('');

              // CHANGE
              console.log(result);
              console.log(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`);
              console.log(result.city.country);
              console.log(weather.list[0].main.temp);
            });
        }
      } 

    // average temperature
    // trebam da uzmem vrijednost iz weather.list[0].main.temp i stavim ih u niz


    // ovdje je uradjena funkcija koja prikazuje prosjecnu temperaturu svih temperatura u zadnjih 5 dana svakih 3 sata, sto nije dobro. treba naci nacin da se uzme prosjecna u jednom satu, svaki dan.

    const tempAverageData = () => {
      let tempObj = {};
      let tempArray = [];
       tempObj = weather.list.forEach(element => {
        tempArray.push(element.main.temp);
       }); 
      //  niz=niz.slice(0,7); // niz sadrzi sve temperature u 7 dana
       const result = tempArray.reduce((a,b) => a+b, 0) / tempArray.length;
       return result.toFixed(2);
      // console.log(weather.list[0].main.temp)
     }
    

    return (
        <div>

            <input
                type="text"
                placeholder="Search..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={getData}
            />

            {(typeof weather.list != "undefined") ? (

            <div className="container" style={{display: 'flex', gap: '1em'}}>
            
            <div>{weather.list[0].main.temp}</div>
            <div>{weather.list[7].main.temp}</div>
            <div>{weather.list[15].main.temp}</div>
            <div>{weather.list[23].main.temp}</div>
            <div>{weather.list[31].main.temp}</div>
            <div>Average temp : {tempAverageData()}</div>
  
            </div>

            ) : ('')}

        </div>
    )
}

export default Api;
