var $flagContainer = document.querySelector('.flag-container');
// var $allFlags = document.querySelectorAll('img');
$flagContainer.addEventListener('click', cuisinePage);

function getCuisineData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b35d81708b394cbfa180077a26661fe8&cuisine=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);
  });
  xhr.send();
}

function cuisinePage(event) {
  if (event.target.matches('.flag')) {
    var name = event.target.getAttribute('data-id');
    getCuisineData(name);
  }
}
