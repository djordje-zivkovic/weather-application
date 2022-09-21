// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// example for Belgrade https://api.openweathermap.org/data/2.5/forecast?q=Belgrade&units=metric&APPID=f6a2fb3e9764cc4cc8fa3044874aa2c4

// NAPOMENA!!!
// Api daje samo podatke za vrijeme svakih 3 sata u narednih 5 dana
// Za nas zadatak mi nemamo tacno dobijene podatke koje nam trebaju, nemamo dovoljno dana
// ni glavnu temperaturu za svaki dan..

// Iz api-ja dobijamo niz od 40 elemenata, uzeo sam da je prvih 8 elemenata za prvi dan, drugih osam elemenata za drugi dan i tako dalje.

// Zatim smo kao glavnu prosjecnu temperaturu uzeli samo prosjek iz svih 40 elemenata
// A prosjek za svaki dan uzeli kao prosjek od 8 elemenata

const api = {
  key: "f6a2fb3e9764cc4cc8fa3044874aa2c4",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const getData = (query) => {
  return fetch(
    `${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`
  ).then((res) => res.json());
};
