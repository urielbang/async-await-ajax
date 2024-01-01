'use strict';
const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.capital}</p>
      <p class="country__row"><span>💰</span>${data.cca3}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = '1';
};
/*
const countriesContainer = document.querySelector('.countries');
const getCountryData = function (country) {
  

  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  console.log(request);
  request.send();
};

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = '1';
//   });
// };
// getCountryData('israel');
// getCountryData('portugal');
// getCountryData('germany');

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.capital}</p>
    <p class="country__row"><span>💰</span>${data.cca3}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // render country
    renderCountry(data);

    // get neighbour country
    const neighbour = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha?codes=${neighbour}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2[1], 'neighbour');
    });
  });
};
getCountryAndNeighbour('israel');
getCountryAndNeighbour('usa');
*/

//! fetch api
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       console.log(res);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJason = (url, errorMsg = 'something wrong') => {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} ${res.status}`);
    return res.json();
  });
};

const getCountryData = function (country) {
  //country 1
  getJason(
    `https://restcountries.com/v3.1/name/${country}`,
    'country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error(`no neighbour foundS`);
      // country 2

      return getJason(
        `https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
        'country not found'
      );
    })

    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err =>
      renderError(`something went wrong ${err.message}. try again `)
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountryData('australia');
});
