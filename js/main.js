/* global data */

var $bodyContainer = document.querySelector('.body-container');
var $header = document.querySelector('.header');
var $flagsPage = document.querySelector('.flags-page');

$bodyContainer.addEventListener('click', cuisinePage);
$bodyContainer.addEventListener('click', recipePage);

function getCuisineData(name) {
  $bodyContainer.setAttribute('recipeBox-view', 'cuisinePage');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=8036dee798704bc5b7a94e9409fbfa26&cuisine=' + name);
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
    data.view = 'cuisinePage';
    getCuisineData(name);
  }
}

function getRecipeData(id) {
  $bodyContainer.setAttribute('data-view', 'recipePage');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=8036dee798704bc5b7a94e9409fbfa26');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var recipeObject = xhr.response;
    var selectedRecipeContainer = $bodyContainer.appendChild(document.createElement('form'));
    selectedRecipeContainer.className = 'selected-recipe-container';
    selectedRecipeContainer.setAttribute('data-id', id);

    var recipeImgRow = selectedRecipeContainer.appendChild(document.createElement('div'));
    recipeImgRow.className = 'row recipe-img-direction img-ingredient-container';

    var recipeImage = recipeImgRow.appendChild(document.createElement('img'));
    recipeImage.setAttribute('src', recipeObject.image);
    recipeImage.className = 'selected-recipe-image col-lg-half col-sm-full';

    var ingredientListContainer = recipeImgRow.appendChild(document.createElement('div'));
    ingredientListContainer.className = 'ingredient-list col-lg-half col-sm-full';

    var ingredientHeader = ingredientListContainer.appendChild(document.createElement('div'));
    ingredientHeader.className = 'ingredient-header';

    var ingredientLabel = ingredientHeader.appendChild(document.createElement('h3'));
    ingredientLabel.className = 'ingredient-label';
    ingredientLabel.textContent = 'Ingredients';

    var saveRecipeButton = ingredientHeader.appendChild(document.createElement('button'));
    saveRecipeButton.className = 'save-recipe-button';
    saveRecipeButton.textContent = 'SAVE RECIPE ';

    var bookmarkIcon = saveRecipeButton.appendChild(document.createElement('i'));
    bookmarkIcon.className = 'fa-solid fa-bookmark';

    var ingredientList = ingredientListContainer.appendChild(document.createElement('ul'));
    for (var i = 0; i < recipeObject.extendedIngredients.length; i++) {
      var ingredients = ingredientList.appendChild(document.createElement('li'));
      var ingredientName = recipeObject.extendedIngredients[i].name;
      var amount = recipeObject.extendedIngredients[i].amount;
      var unit = recipeObject.extendedIngredients[i].unit;
      ingredients.textContent = amount + ' ' + unit + ' ' + ingredientName;
    }

    var instructionRow = selectedRecipeContainer.appendChild(document.createElement('div'));
    instructionRow.className = 'row instruction-container col-direction';

    var instructionHeader = instructionRow.appendChild(document.createElement('div'));
    instructionHeader.className = 'instruction-header';

    var instructionLabel = instructionHeader.appendChild(document.createElement('h3'));
    instructionLabel.className = 'instruction-label';
    instructionLabel.textContent = 'Instructions';

    for (var j = 0; j < recipeObject.analyzedInstructions[0].steps.length; j++) {
      var stepNumber = instructionRow.appendChild(document.createElement('h4'));
      stepNumber.className = 'step-number';
      stepNumber.textContent = 'Step ' + recipeObject.analyzedInstructions[0].steps[j].number;
      var instruction = stepNumber.appendChild(document.createElement('p'));
      instruction.textContent = recipeObject.analyzedInstructions[0].steps[j].step;
      instruction.className = 'instruction';
    }
    selectedRecipeContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      var $selectedRecipePage = document.querySelector('.selected-recipe-container');
      var recipeId = $selectedRecipePage.getAttribute('data-id');
      var recipeInfo = {
        recipeID: recipeId
      };
      data.recipes.push(recipeInfo);
    });
  });
  xhr.send();
}

function recipePage(event) {
  if (event.target.matches('.recipe-image')) {
    var id = event.target.getAttribute('data-id');
    $header.textContent = event.target.closest('div').textContent;
    var $recipePage = document.querySelector('.recipe-container');
    $recipePage.className = 'hidden';
    data.view = 'recipePage';
    getRecipeData(id);
  }
}

function myRecipeBoxPage(recipeID) {
  $bodyContainer.setAttribute('recipeBox-view', 'myRecipeBoxPage');
  for (var i = 0; i < data.recipes.length; i++) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.spoonacular.com/recipes/' + data.recipes[i].recipeID + '/information?apiKey=8036dee798704bc5b7a94e9409fbfa26');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var savedRecipeObject = xhr.response;
      var recipeContainer = $bodyContainer.appendChild(document.createElement('div'));
      recipeContainer.className = 'recipe-container flex-wrap center';

      var recipeBox = recipeContainer.appendChild(document.createElement('div'));
      recipeBox.className = 'recipe-box col-sm-full col-lg-third col-direction';

      var recipeButton = recipeBox.appendChild(document.createElement('button'));
      recipeButton.className = 'recipe-button';

      var recipeImg = recipeButton.appendChild(document.createElement('img'));
      recipeImg.className = 'recipe-image';
      recipeImg.setAttribute('src', savedRecipeObject.image);
      recipeImg.setAttribute('data-id', data.recipes[i].recipeID);

      var recipeTitle = recipeBox.appendChild(document.createElement('h4'));
      recipeTitle.className = 'recipe-title center';
      recipeTitle.textContent = savedRecipeObject.title;
    });
    xhr.send();
  }
}

function showPage(name) {
  if (event.target.getAttribute('data-view') === 'flagsPage') {
    var $recipePage = document.querySelector('.recipe-container');
    $recipePage.className = 'hidden';
    data.view = 'flagsPage';
    $flagsPage.className = 'row center flex-wrap flags-page';
    $modalPage.className = 'modal-background hidden';
  } else if (event.target.getAttribute('data-view') === 'myRecipeBoxPage') {
    $flagsPage.className = 'hidden';
    data.view = 'myRecipeBoxPage';
    $header.textContent = 'My Recipe Box';
    $modalPage.className = 'modal-background hidden';
    myRecipeBoxPage();
  }
}

var $flagsPageButton = document.querySelector('#flagsPageButton');
var $myRecipePageButton = document.querySelector('#myRecipePageButton');
var $menuButton = document.querySelector('.menu-button');
var $modalPage = document.querySelector('.modal-background');
var $modalCloseButton = document.querySelector('.modal-close-button');

$flagsPageButton.addEventListener('click', showPage);
$myRecipePageButton.addEventListener('click', showPage);
$menuButton.addEventListener('click', modalMenu);
$modalCloseButton.addEventListener('click', modalMenu);

var modalOpen = false;

function modalMenu(event) {
  if (modalOpen === false) {
    $modalPage.className = 'modal-background';
    modalOpen = true;
  } else {
    $modalPage.className = 'modal-background hidden';
    modalOpen = false;
  }
}
