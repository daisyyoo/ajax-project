/* exported data */
var data = {
  view: 'flagsPage',
  cuisine: '',
  recipePageId: '',
  header: 'What are you craving today?',
  searchResults: [],
  showResultsNumber: 10,
  recipes: []
};

window.addEventListener('beforeunload', stringified);

function stringified(event) {
  var newSavedRecipeJSON = JSON.stringify(data);
  localStorage.setItem('saved-recipes', newSavedRecipeJSON);
}

var savedRecipes = localStorage.getItem('saved-recipes');

if (savedRecipes !== null) {
  data = JSON.parse(savedRecipes);
}
