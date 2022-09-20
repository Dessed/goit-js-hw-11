export {fetchCountries};
import { renderCountriesData } from './index';
import { showsListCountries } from './index';
import Notiflix from 'notiflix';

async function fetchCountries(name) {
   try {
        const countries = await fetch(`https://restcountries.com/v3.1/name//${name}?fields=name,capital,population,flags,languages`);
        if (!countries.ok ) {
            (Notiflix.Notify.failure('Oops, there is no country with that name'));
        }
        const countrie = await countries.json();
        if (!countrie.length) {
            list.innerHTML = '';
            infoCountry.innerHTML = '';
        } else if (countrie.length >= 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countrie.length === 1) {
            renderCountriesData(countrie);
            list.innerHTML = '';
        } else {
            showsListCountries(countrie);
            infoCountry.innerHTML = '';
        }
    } catch (error) {
        console.log('Ошибка');
      }
}
   