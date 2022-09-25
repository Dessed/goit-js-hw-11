const axios = require('axios').default;
import ImageSearch from './image-search';

const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const imageSearch = new ImageSearch();
console.log(imageSearch);

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  imageSearch.searchQuery = e.currentTarget.elements.searchQuery.value;
  imageSearch.resetPage();
  imageSearch.axiosSearchPhoto().then(addMarkupCreation);
};

async function onLoadMore () {
  imageSearch.axiosSearchPhoto().then(addMarkupCreation);
};

function addMarkupCreation (hits) {
  gallery.innerHTML = markupСreation (hits);
  // gallery.insertAdjacentElement('beforeend', markupСreation (hits));
};

function markupСreation (hits) {
  return hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return `
    <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>${likes}</b>
        </p>
        <p class="info-item">
          <b>${views}</b>
        </p>
        <p class="info-item">
          <b>${comments}</b>
        </p>
        <p class="info-item">
          <b>${downloads}</b>
        </p>
      </div>
    </div>`
  }).join('');
};

