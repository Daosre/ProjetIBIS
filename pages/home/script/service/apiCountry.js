//récupération du drapeau en fonction du pays
const apiCountry = async (country) => {
  return fetch(`https://restcountries.com/v3.1/demonym/${country}`).then(async (response) => {
    let data = await response.json();
    return data[0].flags.png;
  });
};
