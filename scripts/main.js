import recipes from "./data/recipes.js";
import { cardTemplate } from "./templates/recipeCard.js";

console.log(recipes);

// Génération des cards pour chaque recette dans les données
cardTemplate(recipes);

// Boutons de filtres
const btnFilter = document.querySelectorAll(".btn_filter");
const btnDropdown = document.querySelectorAll(".dropdown_filter");
const btnArrow = document.querySelectorAll(".fa-chevron-down");

for (let i = 0; i < btnFilter.length; i++) {
    btnFilter[i].addEventListener("click", () => {
        if (!btnDropdown[i].classList.contains("max-h-80")) {
            btnDropdown[i].classList.remove("max-h-0");
            btnDropdown[i].classList.add("max-h-80");
            btnFilter[i].classList.add("rounded-b-none");
            btnArrow[i].style.rotate = "-180deg";
        } else {
            btnDropdown[i].classList.add("max-h-0");
            btnDropdown[i].classList.remove("max-h-80");
            btnFilter[i].classList.remove("rounded-b-none");
            btnArrow[i].style.rotate = "0deg";
        }
    });
}

// Fonction pour fermer tous les dropdowns sauf celui qui est actuellement ouvert
function closeAllDropdowns() {
    const allDropdowns = document.querySelectorAll(".dropdown_filter");
    const allBtns = document.querySelectorAll(".btn_filter");
    const allArrows = document.querySelectorAll(".fa-chevron-down");

    allDropdowns.forEach(dropdown => {
        dropdown.classList.add("max-h-0");
        dropdown.classList.remove("max-h-80");
    });

    allBtns.forEach(btn => {
        btn.classList.remove("rounded-b-none");
    });

    allArrows.forEach(arrow => {
        arrow.style.rotate = "0deg";
    });
}

window.onclick = function (e) {
    if (!e.target.classList.contains("btn_filter")) {
        closeAllDropdowns();
    }
};


// Empêcher la propagation du clic sur l'input
const inputs = document.querySelectorAll(".dropdown_filter input");
inputs.forEach(input => {
    input.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});

// Retrouver les ingrédients dans le tableau
let allIngredients = [];

recipes.forEach(recipe => {
    const Ingredients = recipe.ingredients;
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
    console.log(element);
    const filterOption = document.createElement("li");
    filterOption.setAttribute("class", "filter_option");
    filterOption.innerText = `${element}`;
    filterListIngredients.appendChild(filterOption);
})


// Retrouver tous les appareils disponibles dans les recettes
let allAppliances = [];

recipes.forEach(recipe => {
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
    const Utensils = recipe.ustensils;
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
console.log(inputIngredients);
inputIngredients.addEventListener("input", () => {
    const inputValue = inputIngredients.value.toLowerCase();
    console.log(inputValue);

    // Vider la liste existante des filtres
    filterListIngredients.innerHTML = "";

    uniqueIngredientsArray.forEach(element => {
        const lowercaseElement = element.toLowerCase(); 
        if (lowercaseElement.includes(inputValue)) { 
            const filterOption = document.createElement("li");
            filterOption.setAttribute("class", "filter_option");
            filterOption.innerText = element;
            filterListIngredients.appendChild(filterOption);
        }
    });
});

const inputAppliances = inputs[1];
console.log(inputAppliances);
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
});

const inputUtensils = inputs[2];
console.log(inputUtensils);
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
});