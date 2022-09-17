const api = {
  // prebaciti key u neki konfiguracioni .txt fajl
  key: "f6a2fb3e9764cc4cc8fa3044874aa2c4",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const getData = (query) => {
  return fetch(
    `${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`
  ).then((res) => res.json());
};

// Kupi za 5 dana, i daje vrijeme svaki 3 sata.

// kupim podatke za svaki dan u 12:00 casova, jer nemam mogucnost drugaciju vrijednost da uzmem

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// example for Belgrade https://api.openweathermap.org/data/2.5/forecast?q=Belgrade&units=metric&APPID=f6a2fb3e9764cc4cc8fa3044874aa2c4

// result.list.
