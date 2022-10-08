const axios = require('axios').default;

export default class ImageSearch {
    constructor () {
       this.search = '';
       this.KEY_API = '30147177-aa989cd4308968caefabd5d9f';
       this.page = 1;
    }
    
    async axiosSearchPhoto () {
        try {
            const response = await axios.
            get(`https://pixabay.com/api/?key=${this.KEY_API}&q=${this.search}
            &image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
            const data = this.increase();
            console.log(response);
            return response.data;
          } catch (error) {
            console.error(error);
          }
    }

    get searchQuery () {
        return this.search;
    }

    set searchQuery (newSearchQuery) {
       this.search = newSearchQuery;
    }

    increase() {
        this.page += 1
    }

    resetPage () {
        this.page = 1;
    }
}