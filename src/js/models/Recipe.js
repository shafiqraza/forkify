import axios from "axios";

export class Recipe {
  constructor(id) {
    this.id = id;
  }

   async getRecipe() {
    await axios.get(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
    .then(recipe => {
      this.title = recipe.data.recipe.title;
      this.image = recipe.data.recipe.image_url;
      this.publisher = recipe.data.recipe.publisher;
      this.socialRank = recipe.data.recipe.social_rank;
      this.sourceUrl = recipe.data.recipe.source_url;
      this.ingredients = [
        '4 1/2 ounces cream chesee, room temperature',
        '3-1/2 cup sour cream',
        '1/4 cup mayonaise',
        '1/2 cup mozarella, grated',
        '1/4 cup permigianoreggiano (permesan), grated',
        '1 cup pizza sauce',
        '1/2 cup mozzarella, shredded/grated',
        '1/4 cup pernigiano regiano (parmesan), grated',
        '2 ounces pepperoni, sliced',
        '2 tablespoons green pepper, sliced',
        '2 tablespoons black olives, sliced',
        '2 breads',
        'Tomato sauce'
      ]
      console.log(`recipe no: ${this.id} fetched`);
      this.parseIngrediant();
      this.calcService()
      this.calcPeriod()
    }).catch(e => {
      console.log(e);
    });
  }

  calcService() {
    this.servings = 4;
  }

  calcPeriod() {
    let ingCount = this.ingredients.length
    let period = (ingCount / 3) * 15;
    this.serveTime = period;
  }

  updateServings(type) {
    // servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // ingredients
    this.ingredients.forEach(ing => {
      ing.qty *= (newServings / this.servings);
      // if(type === 'dec') ing.qty -= 0.25;
      // else if(type === 'inc') ing.qty += 0.25
    });

    this.servings = newServings
  }

  parseIngrediant() {
    // if(this.ingredients) {
      const unitLong = ['tablespoons', 'tablespoon',  'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
      const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

      const newIngredients = this.ingredients.map(el => {
        let ingredient = el.toLowerCase();
        
        // uniform units
        unitLong.forEach((ingLong, i) => {
          ingredient = ingredient.replace(ingLong, unitShort[i]);
        });

        // remove paretheses 
        ingredient = ingredient.replace(/[()]/g, '');

        const arrIng = ingredient.split(" ");
        
        let unitIndex = arrIng.findIndex(el2 => unitShort.includes(el2));
        // console.log(unitIndex);

        let recObj;
        if(unitIndex > -1) {
          // unit and qty
          let qty;
          if(unitIndex.length === 1) {
            qty = arrIng[0].replace('-', ' ');
          }else {
            // qty = arrIng.slice(0, unitIndex).join(' ').replace('-', ' ');
            qty = eval(arrIng.slice(0, unitIndex).join('+'));
          }
          recObj = {
            qty,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(unitIndex + 1).join(' ')
          }
        }else if(parseInt(arrIng[0])) {
          // no unit but qty
          recObj = {
            qty: parseInt(arrIng[0]),
            unit: '',
            ingredient: arrIng.slice(1).join(' ')
          }
        }else if(unitIndex === -1) {
          // no unit, no qty  
          recObj = {
            qty: 1,
            unit: "",
            ingredient: arrIng.slice(unitIndex).join(' ')
          }
        }

        return recObj;
      });

      this.ingredients = newIngredients;
    // }else console.log("No Ingredients Found!");
  }
}