import recipes from "./data/recipes.js";
import { cardTemplate } from "./templates/cardTemplate.js";
import { setFilters } from "./templates/setFilters.js";
import { displayTags } from "./templates/displayTags.js";
import { closeAllDropdowns } from "./utils/closeAllDropdowns.js";
import { searchRecipes } from "./utils/searchRecipes.js";

function init(list) {
    // Génération des cards pour chaque recette dans les données
    cardTemplate(list);
    // Lancement de la fonction qui permet de fermer les listes déroulantes
    closeAllDropdowns();
    // Lancement de la fonction qui permet de générer le contenu des listes déroulantes des filtres
    setFilters(list);
    // Création des tags à la sélection d'un élément dans les filtres
    displayTags();
    // Recherche de recettes correspondantes via la barre principale
    searchRecipes(list);
}

// Boutons de filtres
const btnFilter = document.querySelectorAll(".btn_filter");
const btnDropdown = document.querySelectorAll(".dropdown_filter");
const btnArrow = document.querySelectorAll(".chevron_icon");

for (let i = 0; i < btnFilter.length; i++) {
    btnFilter[i].addEventListener("click", () => {
        if (!btnDropdown[i].classList.contains("max-h-80")) {
            closeAllDropdowns();
            btnDropdown[i].classList.remove("max-h-0");
            btnDropdown[i].classList.add("max-h-80");
            btnFilter[i].classList.add("rounded-b-none");
            btnArrow[i].style.rotate = "-180deg";
        } else {
            closeAllDropdowns();
            btnDropdown[i].classList.add("max-h-0");
            btnDropdown[i].classList.remove("max-h-80");
            btnFilter[i].classList.remove("rounded-b-none");
            btnArrow[i].style.rotate = "0deg";
        }
    });
}

// Empêcher la propagation du clic sur l'input et la fermeture en tapant "espace"
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

init(recipes);