const axios = require('axios').default;
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'infinite-scroll/dist/infinite-scroll.pkgd.min.js'
import ImageSearch from './image-search';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const imageSearch = new ImageSearch();

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);
gallery.addEventListener('click', onGallerySimpleLightbox);

disableButtonLoadMore ();

function onSearch(e) {
  e.preventDefault();

  imageSearch.searchQuery = e.currentTarget.elements.searchQuery.value;
  imageSearch.resetPage();
  imageSearch.axiosSearchPhoto().then(data => {
    if (data.hits.length != 0) {
      addFirstMarkupCreation(data.hits);
    } else {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
    })
    .catch(error => {
     console.log(error);
    })
};

function onLoadMore () {
  imageSearch.axiosSearchPhoto().then(data => {
      addNextMarkupCreation(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      totalHitsPhotos ();
    })
    .catch(error => {
      console.log(error);
     });
};

function addFirstMarkupCreation (hits) {
  gallery.innerHTML = '';
  gallery.insertAdjacentHTML('beforeend', markupСreation (hits));
  enableButtonLoadMore ();
};

function addNextMarkupCreation (hits) {
  gallery.insertAdjacentHTML('beforeend', markupСreation (hits));
  smoothScreenScrolling ();
};

function markupСreation (hits) {
  return hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return `<article class="post">
    <div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
      <div class="info">
        <p class="info-item">
          <b>Likes<br> ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views<br> ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments<br> ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads<br> ${downloads}</b>
        </p>
      </div>
    </div>
    </article>`
    
  }).join('');
};

function disableButtonLoadMore () {
  loadMore.classList.add('is-hidden');
}

function enableButtonLoadMore () {
  loadMore.classList.remove('is-hidden');
}

function onGallerySimpleLightbox (evt) { 
  evt.preventDefault();
  
  let lightbox = new SimpleLightbox('.gallery a',
   {captionsData: 'alt',
    captionDelay: 250,
    navText: ['←','→']
    });

    lightbox.open(evt.target.parentElement);

    lightbox.on('close.simplelightbox', () => lightbox.destroy());
};

async function totalHitsPhotos () {
  imageSearch.axiosSearchPhoto().then(data => {
      const totalPage = document.querySelectorAll('.photo-card');
      console.log(totalPage.length);
      console.log(data.totalHits);
    if (totalPage.length === data.totalHits) {
      Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
      disableButtonLoadMore ();
    } 
  })
};

function smoothScreenScrolling () {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

let elem = document.querySelector('.container');
console.log(elem);
let infScroll = new InfiniteScroll( elem, {
  // options
  path: '.pagination__next',
  append: '.post',
  history: false,
});