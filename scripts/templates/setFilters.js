import { setTags } from "./setTags.js";
import { closeAllDropdowns } from "../utils/closeAllDropdowns.js";

export function setFilters(recipes) {
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

    // Retrouver les ingrédients dans le tableau
    let allIngredients = [];

    recipes.forEach(recipe => {
        // On récupère la liste d'ingrédients pour cette recette
        const Ingredients = recipe.ingredients;
        // On stocke chaque unité dans le tableau
        Ingredients.forEach(unit => {
            const unitIngredient = unit.ingredient;
            const normalizedIngredient = unitIngredient.charAt(0).toUpperCase() + unitIngredient.slice(1).toLowerCase();
            allIngredients.push(normalizedIngredient);
        });
    });

    // Eviter les répétitions dans la liste 
    const uniqueIngredientsSet = new Set(allIngredients);
    let uniqueIngredientsArray = [...uniqueIngredientsSet];

    // Ajout de cette liste à la liste déroulante du filtre "Ingrédients"
    const filterListIngredients = document.querySelector(".filter_list_ingredients")

    uniqueIngredientsArray.forEach(element => {
        const filterOption = document.createElement("li");
        filterOption.setAttribute("class", "filter_option");
        filterOption.innerText = `${element}`;
        filterListIngredients.appendChild(filterOption);
    })

    // Retrouver tous les appareils disponibles dans les recettes
    let allAppliances = [];

    recipes.forEach(recipe => {
        // On récupère l'appareil pour chaque recette et on le stocke
        const Appliance = recipe.appliance;
        const normalizedAppliance = Appliance.charAt(0).toUpperCase() + Appliance.slice(1).toLowerCase();
        allAppliances.push(normalizedAppliance);
    });

    // Eviter les répétitions dans la liste 
    const uniqueAppliancesSet = new Set(allAppliances);
    const uniqueAppliancesArray = [...uniqueAppliancesSet];

    // Ajout de cette liste à la liste déroulante du filtre "Ingrédients"
    const filterListAppliances = document.querySelector(".filter_list_appliances")

    uniqueAppliancesArray.forEach(element => {
        const filterOption = document.createElement("li");
        filterOption.setAttribute("class", "filter_option");
        filterOption.innerText = `${element}`;
        filterListAppliances.appendChild(filterOption);
    });

    // Retrouver tous les ustensiles disponibles dans les recettes
    let allUtensils = [];

    recipes.forEach(recipe => {
        // On récupère la liste d'ustensiles pour chaque recette
        const Utensils = recipe.ustensils;
        // On stocke chaque élément dans une liste 
        Utensils.forEach(unit => {
            const Utensil = unit;
            const normalizedUtensil = Utensil.charAt(0).toUpperCase() + Utensil.slice(1).toLowerCase();
            allUtensils.push(normalizedUtensil);
        });
    });

    // Eviter les répétitions dans la liste 
    const uniqueUtensilsSet = new Set(allUtensils);
    const uniqueUtensilsArray = [...uniqueUtensilsSet];

    // Ajout de cette liste à la liste déroulante du filtre "Ingrédients"
    const filterListUtensils = document.querySelector(".filter_list_utensils")

    uniqueUtensilsArray.forEach(element => {
        const filterOption = document.createElement("li");
        filterOption.setAttribute("class", "filter_option");
        filterOption.innerText = `${element}`;
        filterListUtensils.appendChild(filterOption);
    });

    // Ecoute de l'input pour mettre à jour les listes des filtres
    const inputIngredients = inputs[0];
    inputIngredients.addEventListener("input", () => {
        const inputValue = inputIngredients.value.toLowerCase();
        console.log(inputValue);

        // On vide la liste existante des filtres
        filterListIngredients.innerHTML = "";

        // On crée la nouvelle liste d'ingrédients qui correspond à l'input
        uniqueIngredientsArray.forEach(element => {
            const lowercaseElement = element.toLowerCase();
            // Pour chaque élément on vérifie s'il contient la valeur de l'input, puis on crée l'élément
            if (lowercaseElement.includes(inputValue)) {
                const filterOption = document.createElement("li");
                filterOption.setAttribute("class", "filter_option");
                filterOption.innerText = element;
                filterListIngredients.appendChild(filterOption);
            }
        });

        setTags(recipes);
    });

    const inputAppliances = inputs[1];
    inputAppliances.addEventListener("input", () => {
        const inputValue = inputAppliances.value.toLowerCase();
        console.log(inputValue);

        // Vider la liste existante des filtres
        filterListAppliances.innerHTML = "";

        uniqueAppliancesArray.forEach(element => {
            const lowercaseElement = element.toLowerCase();
            if (lowercaseElement.includes(inputValue)) {
                const filterOption = document.createElement("li");
                filterOption.setAttribute("class", "filter_option");
                filterOption.innerText = element;
                filterListAppliances.appendChild(filterOption);
            }
        });

        setTags(recipes);
    });

    const inputUtensils = inputs[2];
    inputUtensils.addEventListener("input", () => {
        const inputValue = inputUtensils.value.toLowerCase();
        console.log(inputValue);

        // Vider la liste existante des filtres
        filterListUtensils.innerHTML = "";

        uniqueUtensilsArray.forEach(element => {
            const lowercaseElement = element.toLowerCase();
            if (lowercaseElement.includes(inputValue)) {
                const filterOption = document.createElement("li");
                filterOption.setAttribute("class", "filter_option");
                filterOption.innerText = element;
                filterListUtensils.appendChild(filterOption);
            }
        });

        setTags(recipes);
    })
}
