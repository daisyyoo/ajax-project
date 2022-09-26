var $spainFlag = document.querySelector('.spain');
var $koreaFlag = document.querySelector('.korea');
var $indiaFlag = document.querySelector('.india');
var $italyFlag = document.querySelector('.italy');
var $germanyFlag = document.querySelector('.germany');
var $chinaFlag = document.querySelector('.china');

function getCuisineData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b35d81708b394cbfa180077a26661fe8&cuisine=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  });
  xhr.send();
}

$spainFlag.addEventListener('click', getCuisineData('Spanish'));
$koreaFlag.addEventListener('click', getCuisineData('Korean'));
$indiaFlag.addEventListener('click', getCuisineData('Indian'));
$italyFlag.addEventListener('click', getCuisineData('Italian'));
$germanyFlag.addEventListener('click', getCuisineData('German'));
$chinaFlag.addEventListener('click', getCuisineData('Chinese'));
