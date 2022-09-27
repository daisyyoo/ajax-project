var $bodyContainer = document.querySelector('.body-container');
var $header = document.querySelector('.header');
var $flagsPage = document.querySelector('.flags-page');

$bodyContainer.addEventListener('click', cuisinePage);

function getCuisineData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b35d81708b394cbfa180077a26661fe8&cuisine=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var recipeListObject = xhr.response;
    for (var i = 0; i < recipeListObject.results.length; i++) {
      var row = $bodyContainer.appendChild(document.createElement('div'));
      row.className = 'recipe-container center col-lg-third';

      var div = row.appendChild(document.createElement('div'));
      div.className = 'center col-sm-full col-direction';

      var recipeButton = div.appendChild(document.createElement('button'));
      recipeButton.className = 'recipe-button';

      var recipeImg = recipeButton.appendChild(document.createElement('img'));
      recipeImg.className = 'recipe-image';
      recipeImg.setAttribute('src', recipeListObject.results[i].image);

      var recipeTitle = div.appendChild(document.createElement('h4'));
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
