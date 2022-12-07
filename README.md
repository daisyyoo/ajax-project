# Feasting Eyes

A web application where users can search for recipes via cuisines.

## Why I Built This

As an ex-chef, I still love researching new recipes. I wanted to create a project to further my newfound skills while integrating my past interests.

## Technologies Used

- HTML
- CSS
- JavaScript
- Spoonacular API [https://spoonacular.com/food-api/docs](https://spoonacular.com/food-api/docs)

## Live Demo

Try the application live at [daisyyoo.github.io/feasting-eyes/](https://daisyyoo.github.io/feasting-eyes/)

## Features

- User can select a cuisine
- User can view their results
- User can view a recipe
- User can save a recipe
- User can view their saved recipes
- User can verify recipe status
- User can see more recipes

## Preview
[Feasting Eyes](images/Feasting-Eyes-Demo.gif)


## Stretch Features

- User can search for recipe by keywords
- User can see calorie and nutrition values
## Getting Started

1. Apply for an API key at Spoonacular [https://spoonacular.com/food-api]


1. Clone the repository.

    ```shell
    git clone https://github.com/daisyyoo/feasting-eyes.git
    cd feasting-eyes
    ```

1. Input your API key in main.js and have fun!

    ```shell
     xhr.open('GET', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=insertAPIkeyhere&cuisine=' + name + '&number=100');
    ```
