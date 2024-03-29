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
            console.log(`le bouton numéro ${i} on ouvre`, btnDropdown[i])
            btnFilter[i].classList.add("rounded-b-none");
            btnArrow[i].style.rotate = "-180deg";
        } else {
            closeAllDropdowns()
            btnDropdown[i].classList.add("max-h-0");
            btnDropdown[i].classList.remove("max-h-80");
            console.log(`le bouton numéro ${i} on ferme`, btnDropdown[i])
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


// Mise à jour de la liste de recettes disponibles
export function filterUpdate(recipes, tagList) {

    console.log("filterupdate entry list:", recipes);
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
    console.log("filterupdate end la liste qui est entrée: ", recipes)
    console.log("filterupdate end newlist = ", newList);
    recipeContainer.innerHTML = "";
    cardTemplate(newList);
    updateRecipeNumber(newList);
    return newList;
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
