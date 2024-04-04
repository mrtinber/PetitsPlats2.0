import { cardTemplate } from "../templates/cardTemplate.js";
import { setFilters } from "../templates/setFilters.js";
import { displayTags, tagList } from "../templates/displayTags.js";

// Implémentation de la recherche avec boucles natives (for, while, ...)
const mainSearchbar = document.querySelector("nav input");
const recipeContainer = document.querySelector(".container_recipes");

export let inputValue = mainSearchbar.value.toLowerCase();

export function searchRecipes(recipes) {  
    mainSearchbar.addEventListener("input", () => {
        inputValue = mainSearchbar.value.toLowerCase();

        if (inputValue.length >= 3 || tagList.length > 0) {
            const newListAfterSearch = performSearch(recipes, inputValue);
            resetAndUpdateDisplay(newListAfterSearch);
        } else {
            resetAndUpdateDisplay(recipes);
        }
    });
}

export function performSearch(recipes, inputValue){
    let newList = []

    for (let i = 0; i < recipes.length; i++) {
        let foundInName = false;
        let foundInDescription = false;
        let foundInIngredients = false;

        if (inputValue !== "") {
            // Utilisation d'une boucle pour vérifier chaque caractère du nom de la recette
            for (let j = 0; j <= recipes[i].name.length - inputValue.length; j++) {
                // Vérifier si la sous-chaîne de la longueur de inputValue correspond à inputValue
                if (recipes[i].name.substring(j, j + inputValue.length).toLowerCase() === inputValue) {
                    foundInName = true;
                    break; // Sortir de la boucle interne si une correspondance est trouvée
                }
            }
            // Utilisation d'une boucle pour vérifier chaque caractère de la description de la recette
            for (let j = 0; j <= recipes[i].description.length - inputValue.length; j++) {
                if (recipes[i].description.substring(j, j + inputValue.length).toLowerCase() === inputValue) {
                    foundInDescription = true;
                    break;
                }
            }
            // Utilisation d'une boucle pour vérifier chaque caractère des ingrédients de la recette
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                const itemIngredients = recipes[i].ingredients[j].ingredient.toLowerCase();
                for (let k = 0; k <= itemIngredients.length - inputValue.length; k++) {
                    if (itemIngredients.substring(k, k + inputValue.length).toLowerCase() === inputValue) {
                        foundInIngredients = true;
                        break;
                    }
                }
            }
        }

        let foundAllTags = true; // Initialise la variable à true

        // Vérifie si tagList est non vide
        if (tagList.length !== 0) {
            for (let t = 0; t < tagList.length; t++) {
                const tag = tagList[t];
                const tagText = tag.querySelector("p").innerText.toLowerCase();
                let tagFound = false; // Initialise à false

                // Vérification des ingrédients
                for (let j = 0; j < recipes[i].ingredients.length; j++) {
                    const itemIngredient = recipes[i].ingredients[j].ingredient.toLowerCase();
                    if (itemIngredient.includes(tagText)) {
                        tagFound = true;
                        break; // Si le tag est trouvé dans les ingrédients, on arrête la boucle
                    }
                }

                // Vérification de l'appareil
                if (!tagFound && recipes[i].appliance.toLowerCase().includes(tagText)) {
                    tagFound = true;
                }

                // Vérification des ustensiles
                for (let j = 0; j < recipes[i].ustensils.length; j++) {
                    const itemUtensil = recipes[i].ustensils[j].toLowerCase();
                    if (itemUtensil.includes(tagText)) {
                        tagFound = true;
                        break; // Si le tag est trouvé dans les ustensiles, on arrête la boucle
                    }
                }

                // Si le tag n'est pas trouvé pour cette recette, on met foundAllTags à false
                if (!tagFound) {
                    foundAllTags = false;
                    break; // Pas besoin de vérifier les autres tags pour cette recette
                }
            }
        }

        // Affichage de la recette si une correspondance est trouvée dans au moins l'une des parties de la recette
        if ((inputValue === "" || foundInName || foundInDescription || foundInIngredients) && (tagList.length === 0 || foundAllTags)) {
            newList.push(recipes[i]);
        }
    }

    return newList;
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