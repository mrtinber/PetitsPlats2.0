import { cardTemplate } from "../templates/cardTemplate.js";
import { setFilters } from "../templates/setFilters.js";
import { displayTags, tagList } from "../templates/displayTags.js";

// Implémentation de la recherche avec boucles natives (for, while, ...)
const mainSearchbar = document.querySelector("nav input");
const recipeContainer = document.querySelector(".container_recipes");
export let newListAfterSearch = [];
export let inputValue = mainSearchbar.value.toLowerCase();

export function searchRecipes(recipes, newList) {
    
    mainSearchbar.addEventListener("input", () => {
        newList = [];
        inputValue = mainSearchbar.value.toLowerCase();

        if (inputValue.length >= 3 || tagList.length > 0) {
            performSearch(recipes, inputValue);
            resetAndUpdateDisplay(newListAfterSearch);
        } else {
            resetAndUpdateDisplay(recipes);
        }
    });
}

export function performSearch(recipes, inputValue) {

    return newListAfterSearch = recipes.filter(recipe => {
        let foundInName = false
        let foundInDescription = false
        let foundInIngredients = false

        if (inputValue !== "") {
            foundInName = recipe.name.toLowerCase().includes(inputValue);
            foundInDescription = recipe.description.toLowerCase().includes(inputValue);
            foundInIngredients = recipe.ingredients.some(element => element.ingredient.toLowerCase().includes(inputValue));
        }

        let tagFound = false; // Initialise la variable tagFound à false

        // Vérifie si tagList est non vide
        if (tagList.length !== 0) {
            tagFound = tagList.every(tag => {
                const tagText = tag.querySelector("p").innerText.toLowerCase();
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tagText)) ||
                    recipe.appliance.toLowerCase().includes(tagText) ||
                    recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tagText));
            });
        }

        // Si on a à la fois un input et des tags
        if (inputValue !== "" && tagList.length !== 0) {
            return (foundInName || foundInDescription || foundInIngredients) && tagFound;
        }

        // Si on a seulement un input
        if (inputValue !== "") {
            return foundInName || foundInDescription || foundInIngredients;
        }

        // Si on a seulement des tags
        if (tagList.length !== 0) {
            return tagFound;
        }

        // Si ni l'input ni les tags ne sont présents, on retourne true pour inclure tous les éléments
        return true;
    });
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
        noMatchMessage.innerText = `Désolé, il n'y a aucun résultat pour "${inputValue}"`;
        recipeContainer.appendChild(noMatchMessage);
    } else {
        // On relance les fonctions de génération
        cardTemplate(list);
        setFilters(list);
        displayTags();
    }
}