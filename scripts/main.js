import recipes from "./data/recipes.js";
import { cardTemplate } from "./templates/recipeCard.js";
import { setFilters } from "./templates/setFilters.js";
import { setTags } from "./templates/setTags.js";
import { closeAllDropdowns } from "./utils/closeAllDropdowns.js";

// Génération des cards pour chaque recette dans les données
cardTemplate(recipes);

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

// Lancement de la fonction qui permet de fermer les listes déroulantes
closeAllDropdowns();

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

// Lancement de la fonction qui permet de générer le contenu des listes déroulantes des filtres
setFilters(recipes);

// Implémentation de la recherche avec boucles natives (for, while, ...)
const mainSearchbar = document.querySelector("nav input");
const recipeContainer = document.querySelector(".container_recipes");

mainSearchbar.addEventListener("input", () =>{
    const inputValue = mainSearchbar.value.toLowerCase();
    console.log(inputValue);
    newList = [];

    if(inputValue.length >= 3){
        for(let i=0; i < recipes.length; i++){

            let foundInName = false;
            let foundInDescription = false;
            let foundInIngredients = false;

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
            for (let j = 0; j < recipes[i].ingredients.length; j++){
                const itemIngredients = recipes[i].ingredients[j].ingredient.toLowerCase();
                for (let k = 0; k <= itemIngredients.length - inputValue.length; k++) {
                    if (itemIngredients.substring(k, k + inputValue.length).toLowerCase() === inputValue) {
                        foundInIngredients = true;
                        break;
                    }
                }
            } 
            // Affichage de la recette si une correspondance est trouvée dans au moins l'une des parties de la recette
            if (foundInName || foundInDescription || foundInIngredients) {
                newList.push(recipes[i]);
            }   
        }
        recipeContainer.innerHTML = "";
        cardTemplate(newList);
        let optionList = document.querySelectorAll(".filter_option");
        optionList.forEach(li => {
            li.remove();
        });
        setFilters(newList);
        setTags(optionList, recipes);
        console.log("optionlist après input", optionList);
    } else {
        console.log("L'input n'est pas assez long")
        recipeContainer.innerHTML = "";
        cardTemplate(recipes);
        let optionList = document.querySelectorAll(".filter_option");
        optionList.forEach(li => {
            li.remove();
        });
        setFilters(recipes);
        setTags(optionList, recipes);
    }
});

// Création de la liste contenant tous les éléments cliquables des listes
let optionList = document.querySelectorAll(".filter_option");

// Création de la liste qui accueillera les recettes correspondantes
let newList = [recipes];

// Création des tags à la sélection d'un élément dans les filtres
setTags(optionList, recipes);

// Mise à jour de la liste de recettes disponibles
export function filterUpdate(recipes, tagList) {
    let tagText = [];
    tagList.forEach(element => {
        const textElement = element.innerText.toLowerCase();
        tagText.push(textElement);
    });

    console.log("tagtext", tagText);
    console.log("taglist", tagList);

    // Reset newList à chaque nouvelle mise à jour
    newList = [];

    for(let i=0; i < recipes.length; i++) {
        let foundInIngredients = false;
        let foundInAppliances = false;
        let foundInUtensils = false; 


        for (let t = 0; t < tagList.length; t++) {
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

            if (foundInIngredients || foundInAppliances || foundInUtensils) {
                if (!newList.includes(recipes[i])){
                    newList.push(recipes[i]);
                }
            }  
        }
    }
    // Mettre à jour l'affichage des recettes
    recipeContainer.innerHTML = "";
    cardTemplate(newList);
    console.log("newlist", newList);
}