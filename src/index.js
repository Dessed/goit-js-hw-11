import './css/styles.css';
import { fetchCountries } from './fetchCountries';
export {renderCountriesData};
export {showsListCountries};
var debounce = require('lodash.debounce');

const input = document.getElementById('search-box');
      list = document.querySelector('.country-list');
      infoCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const debounceSearchCountries = debounce(searchNameCountries, DEBOUNCE_DELAY);

input.addEventListener('keydown', debounceSearchCountries);

function searchNameCountries (e) {
  let name = e.target.value.trim();
  fetchCountries(name);
}

function showsListCountries (countries) {
  list.style.listStyle = 'none';
  const markup = countries.map(({name, flags}) => {
    return `<li>
      <p> <img src="${flags.svg} "width=30px"/>  <b "font-size=40px"> ${name.official}  </b></p>
      </li>`
  }).join("");
  list.innerHTML = markup;
}

function renderCountriesData(countries) {
  infoCountry.style.listStyle = 'none';

  const markup = countries.map(({name, capital, population, languages, flags}) => {
    return `<li style="font-size:40px">
      <p style="margin-top:10px"> <img src="${flags.svg} "width=30px" style="padding-bottom:4px"/> 
      <b>${name.official}</b></p></li>
    
      <li><p><b>Capital</b>: ${capital}</p></li>
      <li><p><b>Population</b>: ${population}</p></li>
      <li><p><b>Languages</b>: ${Object.values(languages).join(', ')}</p></li>`
  }).join("");
    infoCountry.innerHTML = markup;
}