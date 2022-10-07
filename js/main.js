/* global data */

var $bodyContainer = document.querySelector('.body-container');
var $header = document.querySelector('.header');

var $flagsPage = document.querySelector('#flags-page-container');
var $cuisinePage = document.querySelector('#cuisine-container');
var cuisinePage = document.querySelector('.cuisine-page');
var $selectedRecipePage = document.querySelector('#selected-recipe-container');
var selectedRecipePage = document.querySelector('.selected-recipe-container');
var $savedRecipePage = document.querySelector('#saved-recipe-container');
var savedRecipePage = document.querySelector('.saved-recipe-container');

var $flagsPageButton = document.querySelector('#flagsPageButton');
var $myRecipePageButton = document.querySelector('#myRecipePageButton');
var $menuButton = document.querySelector('.menu-button');

var $modalPage = document.querySelector('.modal-background');
var $modalCloseButton = document.querySelector('.modal-close-button');
var loadingPage = document.querySelector('.loading-gif-container');
var $errorPage = document.querySelector('.network-error-container');

$bodyContainer.addEventListener('click', cuisineResultPage);
$bodyContainer.addEventListener('click', recipePage);
$flagsPageButton.addEventListener('click', showPage);
$myRecipePageButton.addEventListener('click', showPage);
$menuButton.addEventListener('click', modalMenu);
$modalCloseButton.addEventListener('click', modalMenu);
document.addEventListener('DOMContentLoaded', refreshPage);

function getCuisineData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b35d81708b394cbfa180077a26661fe8&cuisine=' + name);
  loadingPage.className = 'loading-gif-container center';
  xhr.responseType = 'json';
  xhr.addEventListener('error', function () {
    $errorPage.className = 'network-error-container center';
    $header.textContent = '';
  });
  xhr.addEventListener('load', function () {
    $errorPage.className = 'network-error-container center hidden';
    loadingPage.className = 'loading-gif-container center hidden';
    var recipeListObject = xhr.response;
    for (var i = 0; i < recipeListObject.results.length; i++) {
      var recipeBox = cuisinePage.appendChild(document.createElement('div'));
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

function cuisineResultPage(event) {
  if (event.target.matches('.flag')) {
    var name = event.target.getAttribute('data-id');
    data.cuisine = name;
    $header.textContent = name + ' Dishes';
    $flagsPage.className = 'view hidden';
    $cuisinePage.className = 'view';
    getCuisineData(name);
    data.view = $cuisinePage.getAttribute('data-view');
    data.header = $header.textContent;
  }
}

function getRecipeData(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=b35d81708b394cbfa180077a26661fe8');
  loadingPage.className = 'loading-gif-container center';
  xhr.responseType = 'json';
  xhr.addEventListener('error', function () {
    $errorPage.className = 'network-error-container center';
    $header.textContent = '';
  });
  xhr.addEventListener('load', function () {
    $errorPage.className = 'network-error-container center hidden';
    loadingPage.className = 'loading-gif-container center hidden';
    var recipeObject = xhr.response;

    selectedRecipePage.setAttribute('data-id', id);

    var recipeImgRow = selectedRecipePage.appendChild(document.createElement('div'));
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

    var recipeStatusModalContainer = ingredientHeader.appendChild(document.createElement('div'));
    recipeStatusModalContainer.className = 'recipe-status-modal-container';

    var recipeStatusModal = recipeStatusModalContainer.appendChild(document.createElement('div'));
    recipeStatusModal.className = 'recipe-status-modal center hidden';

    var saveRecipeButton = ingredientHeader.appendChild(document.createElement('button'));
    saveRecipeButton.className = 'save-recipe-button';
    saveRecipeButton.textContent = 'SAVE RECIPE';
    saveRecipeButton.setAttribute('data-id', 'saveRecipe');
    for (var k = 0; k < data.recipes.length; k++) {
      if (id !== data.recipes[k].recipeID) {
        saveRecipeButton.textContent = 'SAVE RECIPE';
        saveRecipeButton.setAttribute('data-id', 'saveRecipe');
      } else if (id === data.recipes[k].recipeID) {
        saveRecipeButton.textContent = 'REMOVE RECIPE';
        saveRecipeButton.setAttribute('data-id', 'removeRecipe');
        break;
      }
    }

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

    var instructionRow = selectedRecipePage.appendChild(document.createElement('div'));
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
    saveRecipeButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (saveRecipeButton.getAttribute('data-id') === 'saveRecipe') {
        recipeStatusModal.className = 'recipe-status-modal center';
        recipeStatusModal.textContent = 'You have successfully saved this recipe!';
        var recipeId = selectedRecipePage.getAttribute('data-id');
        var recipeImage = document.querySelector('.selected-recipe-image');
        var recipeInfo = {
          recipeID: recipeId,
          image: recipeImage.getAttribute('src'),
          title: $header.textContent
        };
        data.recipes.push(recipeInfo);
        var newSavedRecipe = appendSavedRecipe(recipeInfo);
        savedRecipePage.appendChild(newSavedRecipe);
      } else if (saveRecipeButton.getAttribute('data-id') === 'removeRecipe') {
        recipeStatusModal.className = 'recipe-status-modal center';
        recipeStatusModal.textContent = 'You have successfully removed this recipe!';
        for (var l = 0; l < data.recipes.length; l++) {
          if (id === data.recipes[l].recipeID) {
            data.recipes.splice(l, 1);
          }
        }
        var $savedRecipesList = document.querySelectorAll('.recipe-image');
        for (var m = 0; m < $savedRecipesList.length; m++) {
          if ($savedRecipesList[m].getAttribute('data-id') === id) {
            var deletedRecipe = $savedRecipesList[m].closest('div');
            deletedRecipe.remove();
          }
        }
      }
      setTimeout(hideRecipeStatusModal, 3000);
    }
    );
  });
  xhr.send();
}

function hideRecipeStatusModal() {
  var $recipeStatusModal = document.querySelector('.recipe-status-modal');
  $recipeStatusModal.className = 'recipe-status-modal center hidden';
}

function appendSavedRecipe(recipeInfo) {
  var recipeBox = document.createElement('div');
  recipeBox.className = 'recipe-box col-sm-full col-lg-third col-direction';

  var recipeButton = recipeBox.appendChild(document.createElement('button'));
  recipeButton.className = 'recipe-button';

  var recipeImg = recipeButton.appendChild(document.createElement('img'));
  recipeImg.className = 'recipe-image';
  recipeImg.setAttribute('src', recipeInfo.image);
  recipeImg.setAttribute('data-id', recipeInfo.recipeID);

  var recipeTitle = recipeBox.appendChild(document.createElement('h4'));
  recipeTitle.className = 'recipe-title center';
  recipeTitle.textContent = recipeInfo.title;
  return recipeBox;
}

function recipePage(event) {
  event.preventDefault();
  if (event.target.matches('.recipe-image')) {
    var id = event.target.getAttribute('data-id');
    data.recipePageId = id;
    $header.textContent = event.target.closest('div').textContent;
    $cuisinePage.className = 'view hidden';
    $savedRecipePage.className = 'view hidden';
    $selectedRecipePage.className = 'view';
    getRecipeData(id);
    data.view = $selectedRecipePage.getAttribute('data-view');
    data.header = $header.textContent;
  }
}

function myRecipeBoxPage() {
  for (var i = 0; i < data.recipes.length; i++) {
    var recipeBox = savedRecipePage.appendChild(document.createElement('div'));
    recipeBox.className = 'recipe-box col-sm-full col-lg-third col-direction';

    var recipeButton = recipeBox.appendChild(document.createElement('button'));
    recipeButton.className = 'recipe-button';

    var recipeImg = recipeButton.appendChild(document.createElement('img'));
    recipeImg.className = 'recipe-image';
    recipeImg.setAttribute('src', data.recipes[i].image);
    recipeImg.setAttribute('data-id', data.recipes[i].recipeID);

    var recipeTitle = recipeBox.appendChild(document.createElement('h4'));
    recipeTitle.className = 'recipe-title center';
    recipeTitle.textContent = data.recipes[i].title;
  }
}
document.addEventListener('DOMContentLoaded', myRecipeBoxPage);

function showPage(event) {
  if (event.target.getAttribute('data-view') !== data.view) {
    data.view = event.target.getAttribute('data-view');
    modalMenu();
    dataView();
    emptySavedRecipePage();
  }
}

function dataView(name) {
  if (data.view === 'flagsPage') {
    $header.textContent = 'What are you craving today?';
    data.header = $header.textContent;
    $flagsPage.className = 'view';
    $savedRecipePage.className = 'view hidden';
    $cuisinePage.className = 'view hidden';
    $selectedRecipePage.className = 'view hidden';
    cuisinePage.replaceChildren();
    selectedRecipePage.replaceChildren();
  } else if (data.view === 'savedRecipePage') {
    $header.textContent = 'My Recipe Box';
    data.header = $header.textContent;
    $savedRecipePage.className = 'view';
    $flagsPage.className = 'view hidden';
    $cuisinePage.className = 'view hidden';
    $selectedRecipePage.className = 'view hidden';
    cuisinePage.replaceChildren();
    selectedRecipePage.replaceChildren();
  }
}

var $viewElements = document.querySelectorAll('.view');

function refreshPage(event) {
  for (var i = 0; i < $viewElements.length; i++) {
    if (data.view === $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].className = 'view';
      $header.textContent = data.header;
    } else if (data.view !== $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].className = 'view hidden';
    }
  }
  refreshPageContent();
  emptySavedRecipePage();
}

function refreshPageContent() {
  if (data.view === 'cuisinePage') {
    getCuisineData(data.cuisine);
  } else if (data.view === 'selectedRecipePage') {
    getRecipeData(data.recipePageId);
  }
}

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

var $emptySavedRecipePage = document.querySelector('.empty-saved-recipe-page');
function emptySavedRecipePage() {
  if (data.recipes.length === 0) {
    $emptySavedRecipePage.className = 'empty-saved-recipe-page center';
  } else {
    $emptySavedRecipePage.className = 'empty-saved-recipe-page center hidden';
  }
}
