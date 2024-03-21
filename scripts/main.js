//Importation des données des recettes
import recipes from "./data/recipes.js";
console.log(recipes); 

// Template de card pour les recettes stockées dans les données
recipes.forEach (recipe => {
    const recipeSection = document.querySelector(".container_recipes");
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("card_recipe");

    const recipeTime = document.createElement("div");
    recipeTime.setAttribute("class", "recipe_time");
    recipeTime.innerHTML = `
        <p class="font-content text-xs">${recipe.time}min</p>
    `
    recipeCard.appendChild(recipeTime);
    
    const recipePicture = document.createElement("img");
    recipePicture.setAttribute("src", `assets/recipes/${recipe.image}`);
    recipePicture.setAttribute("class", "object-cover h-60");
    recipeCard.appendChild(recipePicture);

    const recipeTitle = document.createElement("h3");
    recipeTitle.setAttribute("class", "font-title mx-6");
    recipeTitle.innerText = `${recipe.name}`;
    recipeCard.appendChild(recipeTitle);

    const recipeContent = document.createElement("div");
    recipeContent.setAttribute("class", "recipe_content");
    const recipeInstructions = document.createElement("div");
    recipeInstructions.setAttribute("class", "flex flex-col gap-4")
    recipeInstructions.innerHTML = `
            <h4 class="uppercase font-content text-xs">Recette</h4>
            <p class="text-sm overflow-hidden text-ellipsis text-justify h-20">${recipe.description}</p>
    `
    const recipeIngredients = document.createElement("div");
    recipeIngredients.setAttribute("class", "flex flex-col gap-4")
    recipeIngredients.innerHTML = `
        <h4 class="uppercase font-content text-xs">Ingrédients</h4>
    `

    const ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.setAttribute("class", "flex flex-wrap");
    recipeIngredients.appendChild(ingredientsWrapper);

    recipe.ingredients.forEach(ingredient => {
        const ingredientUnit = document.createElement("div");
        ingredientUnit.setAttribute("class", "w-1/2 mb-5");
        ingredientUnit.innerHTML = `
            <h5 class="text-black1 font-content text-sm font-medium">${ingredient.ingredient}</h5>
            <p class="text-grey2 font-content text-sm">${ingredient.quantity ? ingredient.quantity : "" } ${ingredient.unit ? ingredient.unit : ""}</p>
        `
        ingredientsWrapper.appendChild(ingredientUnit);
    });

    recipeCard.appendChild(recipeContent);
    recipeContent.appendChild(recipeInstructions);
    recipeContent.appendChild(recipeIngredients);

    recipeSection.appendChild(recipeCard);
});


// Boutons de filtres
const btnFilter = document.querySelectorAll(".btn_filter");
const btnDropdown = document.querySelector(".dropdown_filter");
const btnArrow = document.querySelector(".fa-chevron-down")

btnFilter.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!btnDropdown.classList.contains("max-h-80")) {
            btnDropdown.classList.remove("max-h-0");
            btnDropdown.classList.add("max-h-80");
            btn.classList.add("rounded-b-none");
            btnArrow.style.rotate = "-180deg";
        } else {
            btnDropdown.classList.add("max-h-0");
            btnDropdown.classList.remove("max-h-80");
            btn.classList.remove("rounded-b-none");
            btnArrow.style.rotate = "0deg";
        }
    });
});

window.onclick = function (e) {
    if (!e.target.classList.contains("btn_filter")) {
        btnDropdown.classList.add("max-h-0");
        btnDropdown.classList.remove("max-h-80");
        btnArrow.style.rotate = "0deg";
        btnFilter.forEach(btn =>{
            btn.classList.remove("rounded-b-none");
        })
    }
};


// Empêcher la propagation du clic sur l'input
const inputs = document.querySelectorAll(".dropdown_filter input");
inputs.forEach(input => {
    input.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});