import recipes from "./data/recipes.js";
import { cardTemplate } from "./templates/recipeCard.js";

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
})


// Implémentation de la recherche avec boucles natives (for, while, ...)

const mainSearchbar = document.querySelector("nav input");
const recipeContainer = document.querySelector(".container_recipes");

mainSearchbar.addEventListener("input", () =>{
    const inputValue = mainSearchbar.value.toLowerCase();
    console.log(inputValue);
    let newList = [];

    if(inputValue.length >= 3){
        console.log("C'est bon on peut lancer la recherche")
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
                console.log("Nouvelle liste", newList);
                recipeContainer.innerHTML = "";
                cardTemplate(newList);
            }   
        }
    }else{
        console.log("L'input n'est pas assez long")
        recipeContainer.innerHTML = "";
        cardTemplate(recipes);
    }
});

// Création des tags à la sélection d'un élément dans les filtres
const optionList = document.querySelectorAll(".filter_option");
const tagBar = document.querySelector(".tag_bar");
let tagList = [];
let newList = [];

optionList.forEach(option => {

    option.addEventListener("click", () =>{
        // Ajout du tag sous la barre de filtres
        const newTag = document.createElement("div");
        newTag.setAttribute("class", "filter_tag");
        newTag.innerHTML = `
            <p>${option.innerText}</p>
            <i class="fa-solid fa-xmark cursor-pointer duration-200 hover:scale-125"></i>
        `;
        tagBar.appendChild(newTag);
        tagList.push(newTag);

        //Ajout du tag dans la liste déroulante
        const newListTag = document.createElement("div");
        const dropdownFilter = document.querySelector('.dropdown_filter');
        const filterListIngredients = document.querySelector('.filter_list_ingredients');
        
        newListTag.setAttribute("class", "chosen_option");
        newListTag.innerHTML = `
            <p>${option.innerText}</p>
            <i class="fa-solid fa-circle-xmark cursor-pointer duration-200 hover:scale-125"></i>
        `
        dropdownFilter.insertBefore(newListTag, filterListIngredients);

        // Ajout de l'écouteur d'événement de suppression à ce tag
        const removeBtn = newTag.querySelector(".fa-xmark");
        removeBtn.addEventListener("click", () => {
            newTag.remove();
            // Retirez l'élément supprimé de la liste tagList
            const index = tagList.indexOf(newTag);
            if (index !== -1) {
                tagList.splice(index, 1);
            }
            recipeContainer.innerHTML = "";
            filterUpdate(recipes, tagList); // Mise à jour des recettes affichées après suppression

            // Afficher toutes les recettes après suppression de tous les filtres
            if (tagList.length === 0){
                cardTemplate(recipes);
            }
        });

        filterUpdate(recipes, tagList); // Mettez à jour les recettes après l'ajout d'un tag
    });
});

// Mise à jour de la liste de recettes disponibles
function filterUpdate(recipes, tagList) {
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