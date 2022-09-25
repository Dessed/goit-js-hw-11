const axios = require('axios').default;

// const form = document.getElementById('search-form');
const formBtn = document.querySelector('.search-form button');
const form = document.querySelector('.search-form')

const API_KEY = '30147177-aa989cd4308968caefabd5d9f'; 

form.addEventListener('submit', getUser);

async function getUser(e) {
  e.preventDefault();
  let search = e.currentTarget.elements.searchQuery.value;

  try {
    const response = await axios.
    get('https://pixabay.com/api/?key='+API_KEY+'&q='+search+'&image_type=photo&orientation=horizontal&safesearch=true');
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

console.log(getUser);
console.log(getUser(response));