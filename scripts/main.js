import recipes from "./data/recipes.js";
import { cardTemplate } from "./templates/cardTemplate.js";
import { setFilters } from "./templates/setFilters.js";
import { displayTags } from "./templates/displayTags.js";
import { closeAllDropdowns } from "./utils/closeAllDropdowns.js";
import { searchRecipes } from "./utils/searchRecipes.js";


// 4 variables: searchglobal; tagutensil; tagapparel; tagingredient

// Création de la liste qui accueillera les recettes correspondantes
export let newList = recipes;

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
    displayTags(newList);
    // Recherche de recettes correspondantes via la barre principale
    searchRecipes(recipes, newList);
    // Génère le nombre de recettes affichées sur la page
    updateRecipeNumber(recipes);
}


// Boutons de filtres
const btnFilter = document.querySelectorAll(".btn_filter");
const btnDropdown = document.querySelectorAll(".dropdown_filter");
const btnArrow = document.querySelectorAll(".fa-chevron-down");

for (let i = 0; i < btnFilter.length; i++) {
    btnFilter[i].addEventListener("click", () => {
        if (!btnDropdown[i].classList.contains("max-h-80")) {
            closeAllDropdowns()
            btnDropdown[i].classList.remove("max-h-0");
            btnDropdown[i].classList.add("max-h-80");
            btnFilter[i].classList.add("rounded-b-none");
            btnArrow[i].style.rotate = "-180deg";
        } else {
            closeAllDropdowns()
            btnDropdown[i].classList.add("max-h-0");
            btnDropdown[i].classList.remove("max-h-80");
            btnFilter[i].classList.remove("rounded-b-none");
            btnArrow[i].style.rotate = "0deg";
        }
    });
}

// Empêcher la propagation du clic sur l'input et la fermeture en tapant "espace"
// On récupère la liste des inputs contenus dans les listes déroulantes
const inputs = document.querySelectorAll(".dropdown_filter input");

inputs.forEach(input => {
    input.addEventListener("click", (event) => {
        event.stopPropagation();
    });
    input.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            event.preventDefault();
            const cursorPosition = input.selectionStart; // Obtenir la position du curseur dans l'input
            const value = input.value; // Obtenir la valeur actuelle de l'input
            const newValue = value.slice(0, cursorPosition) + " " + value.slice(cursorPosition); // Ajouter un espace à la position du curseur
            input.value = newValue; // Mettre à jour la valeur de l'input avec l'espace ajouté
            input.selectionStart = cursorPosition + 1; // Déplacer le curseur après l'espace ajouté
            input.selectionEnd = cursorPosition + 1;
        }
    });
});

export let newListAfterUpdate;

export function filterUpdate(recipes, tagList) {
    console.log("filter update");
    // Reset newList à chaque nouvelle mise à jour
    newList = [];

    // On va parcourir chaque recette pour voir s'il y a des correspondances avec tous les tags
    for (let i = 0; i < recipes.length; i++) {
        let foundAllTags = true; // Initialisation à true pour indiquer que tous les tags sont trouvés pour cette recette

        // Vérification pour chaque tag de la liste
        for (let t = 0; t < tagList.length; t++) {
            const tagText = tagList[t].querySelector("p").innerText.toLowerCase();
            let foundTag = false; // Initialisation à false pour indiquer que le tag n'est pas trouvé par défaut

            // Vérification des ingrédients
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                const itemIngredient = recipes[i].ingredients[j].ingredient.toLowerCase();
                if (itemIngredient.includes(tagText)) {
                    foundTag = true;
                    break; // Si le tag est trouvé dans les ingrédients, on arrête la boucle
                }
            }

            // Vérification des appareils
            if (!foundTag && recipes[i].appliance.toLowerCase().includes(tagText)) {
                foundTag = true;
            }

            // Vérification des ustensiles
            for (let j = 0; j < recipes[i].ustensils.length; j++) {
                const itemUtensil = recipes[i].ustensils[j].toLowerCase();
                if (itemUtensil.includes(tagText)) {
                    foundTag = true;
                    break; // Si le tag est trouvé dans les ustensiles, on arrête la boucle
                }
            }

            // Si le tag n'est pas trouvé pour cette recette, on met foundAllTags à false
            if (!foundTag) {
                foundAllTags = false;
                break; // Pas besoin de vérifier les autres tags pour cette recette
            }
        }

        // Si tous les tags sont trouvés pour cette recette, on l'ajoute à la liste newList
        if (foundAllTags) {
            newList.push(recipes[i]);
        }
    }

    // Mettre à jour l'affichage des recettes avec newList
    recipeContainer.innerHTML = "";
    cardTemplate(newList);
    updateRecipeNumber(newList);
    newListAfterUpdate = newList;
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