import axios from "axios";
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getSearchedRecipe() {
    await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`)
    .then(res => {
      this.result = res.data.recipes
      console.log('search recipes fetched');
      // console.log(this.result[0]);
    }).catch(() => {
      console.log("Recipe not found!");
    });

  }
}