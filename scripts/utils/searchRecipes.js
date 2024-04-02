import { cardTemplate } from "../templates/cardTemplate.js";
import { setFilters } from "../templates/setFilters.js";
import { displayTags, newListAfterTag, tagList } from "../templates/displayTags.js";
import { updateAfterTag, updateRecipeNumber, newListAfterUpdate } from "./updateAfterTag.js";

// Implémentation de la recherche avec boucles natives (for, while, ...)
const mainSearchbar = document.querySelector("nav input");
const recipeContainer = document.querySelector(".container_recipes");
export let newListAfterSearch = [];

export function searchRecipes(recipes, newList) {
    mainSearchbar.addEventListener("input", () => {
        const inputValue = mainSearchbar.value.toLowerCase();
        newList = [];

        if (inputValue.length >= 3 && newListAfterTag.length > 0) {
            performSearch(newListAfterUpdate, inputValue);
            resetAndUpdateDisplay(newListAfterSearch);
            return newListAfterSearch
        } else if (inputValue.length < 3 && newListAfterTag.length > 0){
            updateAfterTag(recipes, tagList);
            resetAndUpdateDisplay(newListAfterUpdate);
        } else {
            resetAndUpdateDisplay(recipes);
        }
        
        newListAfterSearch = newList;
    });
}

export function performSearch(recipes, inputValue){
    let newList = recipes.filter(recipe => {
        const foundInName = recipe.name.toLowerCase().includes(inputValue);
        const foundInDescription = recipe.description.toLowerCase().includes(inputValue);
        const foundInIngredients = recipe.ingredients.some(element => element.ingredient.toLowerCase().includes(inputValue));
        return foundInName || foundInDescription || foundInIngredients;
    });
    newListAfterSearch = newList
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