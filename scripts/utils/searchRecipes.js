import { cardTemplate } from "../templates/cardTemplate.js";
import { setFilters } from "../templates/setFilters.js";
import { displayTags, newListAfterTag, tagList } from "../templates/displayTags.js";
import { newListAfterUpdate, updateRecipeNumber } from "../main.js";
import { filterUpdate } from "../main.js";

// Implémentation de la recherche avec boucles natives (for, while, ...)
const mainSearchbar = document.querySelector("nav input");
const recipeContainer = document.querySelector(".container_recipes");
export let newListAfterSearch = [];

export function searchRecipes(recipes, newList) {
    mainSearchbar.addEventListener("input", () => {
        const inputValue = mainSearchbar.value.toLowerCase();
        newList = [];

        if (inputValue.length >= 3 && newListAfterTag.length > 0) {
            performSearch(newListAfterTag, inputValue, newList);
            resetAndUpdateDisplay(newList);
        } else if (inputValue.length < 3 && newListAfterTag.length > 0){
            filterUpdate(recipes, tagList);
            resetAndUpdateDisplay(newListAfterUpdate);
        } else {
            resetAndUpdateDisplay(recipes);
        }
        
        newListAfterSearch = newList;
    });
}

export function performSearch(recipes, inputValue, newList){

    recipes.forEach(recipe => {
        let foundInName = false;
        let foundInDescription = false;
        let foundInIngredients = false;

        // Vérifier si la sous-chaîne de la longueur de inputValue correspond à inputValue
        if (recipe.name.toLowerCase().includes(inputValue)) {
            foundInName = true;
        }

        if (recipe.description.toLowerCase().includes(inputValue)) {
            foundInDescription = true;
        }

        recipe.ingredients.forEach(element => {
            if (element.ingredient.toLowerCase().includes(inputValue)) {
                foundInIngredients = true;
            }
        });  

        // Affichage de la recette si une correspondance est trouvée dans au moins l'une des parties de la recette
        if (foundInName || foundInDescription || foundInIngredients) {
            newList.push(recipe);
        }
    })
}

export function resetAndUpdateDisplay(list){
    // On vide le conteneur principal et aussi les filtres
    recipeContainer.innerHTML = "";
    let optionList = document.querySelectorAll(".filter_option");
    optionList.forEach(li => {
        li.remove();
    });

    if (list.length === 0){
        const inputValue = mainSearchbar.value.trim();
        const noMatchMessage = document.createElement("div");
        noMatchMessage.innerText = `Désolé, il n'y a aucun résultat pour "${inputValue}"`
        recipeContainer.appendChild(noMatchMessage);
        updateRecipeNumber(list);
    } else {
        // On relance les fonctions de génération
        cardTemplate(list);
        setFilters(list);
        displayTags();
        updateRecipeNumber(list);
    }
}