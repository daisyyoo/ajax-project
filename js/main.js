var $bodyContainer = document.querySelector('.body-container');
var $header = document.querySelector('.header');
var $flagsPage = document.querySelector('.flags-page');

$bodyContainer.addEventListener('click', cuisinePage);
$bodyContainer.addEventListener('click', recipePage);

function getCuisineData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b35d81708b394cbfa180077a26661fe8&cuisine=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var recipeListObject = xhr.response;
    var recipeContainer = $bodyContainer.appendChild(document.createElement('div'));
    recipeContainer.className = 'recipe-container flex-wrap center';

    for (var i = 0; i < recipeListObject.results.length; i++) {
      var recipeBox = recipeContainer.appendChild(document.createElement('div'));
      recipeBox.className = 'recipe-box col-sm-full col-lg-third col-direction';

      var recipeButton = recipeBox.appendChild(document.createElement('button'));
      recipeButton.className = 'recipe-button';

      var recipeImg = recipeButton.appendChild(document.createElement('img'));
      recipeImg.className = 'recipe-image';
      recipeImg.setAttribute('src', recipeListObject.results[i].image);
      recipeImg.setAttribute('data-id', recipeListObject.results[i].id);

      var recipeTitle = recipeBox.appendChild(document.createElement('h4'));
      recipeTitle.className = 'recipe-title center';
      recipeTitle.textContent = recipeListObject.results[i].title;
    }
  });
  xhr.send();
}

function cuisinePage(event) {
  if (event.target.matches('.flag')) {
    var name = event.target.getAttribute('data-id');
    $header.textContent = name + ' Dishes';
    $flagsPage.className = 'hidden';
    getCuisineData(name);
  }
}

function getRecipeData(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=b35d81708b394cbfa180077a26661fe8');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var recipeObject = xhr.response;
    var selectedRecipeContainer = $bodyContainer.appendChild(document.createElement('div'));
    selectedRecipeContainer.className = 'selected-recipe-container';

    var recipeImgRow = selectedRecipeContainer.appendChild(document.createElement('div'));
    recipeImgRow.className = 'row recipe-img-direction img-ingredient-container';

    var recipeImage = recipeImgRow.appendChild(document.createElement('img'));
    recipeImage.setAttribute('src', recipeObject.image);
    recipeImage.className = 'selected-recipe-image col-lg-half col-sm-full';

    var ingredientListContainer = recipeImgRow.appendChild(document.createElement('div'));
    ingredientListContainer.className = 'ingredient-list col-lg-half col-sm-full';

    var ingredientLabel = ingredientListContainer.appendChild(document.createElement('h3'));
    ingredientLabel.textContent = 'Ingredients';

    var ingredientList = ingredientListContainer.appendChild(document.createElement('ul'));
    for (var i = 0; i < recipeObject.extendedIngredients.length; i++) {
      var ingredients = ingredientList.appendChild(document.createElement('li'));
      var ingredientName = recipeObject.extendedIngredients[i].name;
      var amount = recipeObject.extendedIngredients[i].amount;
      var unit = recipeObject.extendedIngredients[i].unit;
      ingredients.textContent = amount + ' ' + unit + ' ' + ingredientName;
    }

    var instructionsRow = selectedRecipeContainer.appendChild(document.createElement('div'));
    instructionsRow.className = 'row instruction-container col-direction';
    for (var j = 0; j < recipeObject.analyzedInstructions[0].steps.length; j++) {
      var stepNumber = instructionsRow.appendChild(document.createElement('h4'));
      stepNumber.className = 'step-number';
      stepNumber.textContent = 'Step ' + recipeObject.analyzedInstructions[0].steps[j].number;
      var instruction = stepNumber.appendChild(document.createElement('p'));
      instruction.textContent = recipeObject.analyzedInstructions[0].steps[j].step;
      instruction.className = 'instruction';
    }

  });
  xhr.send();
}

function recipePage(event) {
  if (event.target.matches('.recipe-image')) {
    var id = event.target.getAttribute('data-id');
    $header.textContent = event.target.closest('div').textContent;
    var $recipePage = document.querySelector('.recipe-container');
    $recipePage.className = 'hidden';
    getRecipeData(id);
  }
}
