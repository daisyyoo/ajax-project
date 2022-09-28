/* exported data */
var data = {
  view: 'flagsPage',
  recipes: []
};

window.addEventListener('beforeunload', stringified);

function stringified(event) {
  var newSavedRecipeJSON = JSON.stringify(data.recipes);
  localStorage.setItem('saved-recipes', newSavedRecipeJSON);
}

var savedRecipes = localStorage.getItem('saved-recipes');

if (savedRecipes !== null) {
  data.recipes = JSON.parse(savedRecipes);
}
