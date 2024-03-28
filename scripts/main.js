import recipes from "./data/recipes.js";
import { cardTemplate } from "./templates/cardTemplate.js";
import { setFilters } from "./templates/setFilters.js";
import { setTags } from "./templates/setTags.js";
import { closeAllDropdowns } from "./utils/closeAllDropdowns.js";
import { searchRecipes } from "./utils/searchRecipes.js";


// 4 variables: searchglobal; tagutensil; tagapparel; tagingredient

// Création de la liste qui accueillera les recettes correspondantes
let newList = recipes;

// Variables 
const recipeContainer = document.querySelector(".container_recipes");

function init(recipes, newList) {
    // Génération des cards pour chaque recette dans les données
    cardTemplate(recipes);
    // Lancement de la fonction qui permet de fermer les listes déroulantes
    closeAllDropdowns();
    // Lancement de la fonction qui permet de générer le contenu des listes déroulantes des filtres
    setFilters(recipes);
    // Création des tags à la sélection d'un élément dans les filtres
    setTags(recipes);
    // Recherche de recettes correspondantes via la barre principale
    searchRecipes(recipes, newList);
    // Génère le nombre de recettes affichées sur la page
    updateRecipeNumber(recipes);
}

// Mise à jour de la liste de recettes disponibles
export function filterUpdate(recipes, tagList) {

    // Reset newList à chaque nouvelle mise à jour
    newList = [];

    // On va parcourir chaque recette pour voir s'il y a des correspondances
    for (let i = 0; i < recipes.length; i++) {
        let foundInIngredients = false;
        let foundInAppliances = false;
        let foundInUtensils = false;


        for (let t = 0; t < tagList.length; t++) {
            // On crée la variable tagText qui contient seulement le texte de chaque élément tag
            const tagText = tagList[t].querySelector("p").innerText.toLowerCase();

            // Utilisation d'une boucle pour vérifier chaque caractère des ingrédients de la recette
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                const itemIngredients = recipes[i].ingredients[j].ingredient.toLowerCase();
                for (let k = 0; k <= itemIngredients.length - tagText.length; k++) {
                    if (itemIngredients.substring(k, k + tagText.length).toLowerCase() === tagText) {
                        foundInIngredients = true;
                        break;
                    }
                }
            }

            // Utilisation d'une boucle pour vérifier chaque caractère de les appareils de la recette
            for (let j = 0; j <= recipes[i].appliance.length - tagText.length; j++) {
                if (recipes[i].appliance.substring(j, j + tagText.length).toLowerCase() === tagText) {
                    foundInAppliances = true;
                    break;
                }
            }

            // Utilisation d'une boucle pour vérifier chaque caractère des ustensiles de la recette
            for (let j = 0; j < recipes[i].ustensils.length; j++) {
                const itemUtensils = recipes[i].ustensils[j].toLowerCase();
                for (let k = 0; k <= itemUtensils.length - tagText.length; k++) {
                    if (itemUtensils.substring(k, k + tagText.length).toLowerCase() === tagText) {
                        foundInUtensils = true;
                        break;
                    }
                }
            }

            // Si on trouve des correspondances, on va ajouter ces recettes à newList
            if (foundInIngredients || foundInAppliances || foundInUtensils) {
                if (!newList.includes(recipes[i])) {
                    newList.push(recipes[i]);
                }
            }
        }
    }

    // Mettre à jour l'affichage des recettes avec newList
    recipeContainer.innerHTML = "";
    cardTemplate(newList);
    updateRecipeNumber(newList);
}

export function updateRecipeNumber (newList){
    const nbRecipes = document.getElementById("nbRecipes");
    const number = newList.length

    if (number >= 2){
        nbRecipes.innerText = `${number} recettes`
    } else {
        nbRecipes.innerText = `${number} recette`
    }
}

init(recipes);
