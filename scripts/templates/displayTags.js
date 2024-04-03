import { newList } from "../main.js";
import { newListAfterSearch, performSearch, resetAndUpdateDisplay } from "../utils/searchRecipes.js";
import recipes from "../data/recipes.js";
import { updateAfterTag, newListAfterUpdate } from "../utils/updateAfterTag.js";

const recipeContainer = document.querySelector(".container_recipes");
const tagBar = document.querySelector(".tag_bar");

export let tagList = [];
export let newListAfterTag = [];

export function displayTags() {

    let optionList = document.querySelectorAll(".filter_option");
    newListAfterTag = [];

    // On parcourt chaque option des listes déroulantes et on écoute l'événement "clic"
    optionList.forEach(option => {
        option.addEventListener("click", () => {

            // Ajout du tag sous la barre de filtres
            const newTag = document.createElement("div");
            newTag.setAttribute("class", "filter_tag");
            newTag.innerHTML = `
            <p>${option.innerText}</p>
            <i class="fa-solid fa-xmark cursor-pointer duration-200 hover:scale-125"></i>
            `;
            tagBar.appendChild(newTag);

            // On ajoute ce nouvel élément tag à la liste tagList
            tagList.push(newTag);

            // Ajout du tag dans la liste déroulante correspondante
            const parentClassName = option.parentNode.className;
            let dropdownFilter;

            if (parentClassName.includes("filter_list_ingredients")) {
                dropdownFilter = document.querySelector('.filter_list_ingredients');
            } else if (parentClassName.includes("filter_list_appliances")) {
                dropdownFilter = document.querySelector('.filter_list_appliances');
            } else if (parentClassName.includes("filter_list_utensils")) {
                dropdownFilter = document.querySelector('.filter_list_utensils');
            }

            const filterListElement = dropdownFilter.querySelector("li");

            const newListTag = document.createElement("div");
            newListTag.setAttribute("class", "chosen_option");
            newListTag.innerHTML = `
            <p>${option.innerText}</p>
            <i class="fa-solid fa-circle-xmark cursor-pointer !hidden duration-200 hover:scale-125"></i>
            `;
            dropdownFilter.insertBefore(newListTag, filterListElement);

            // Ajout de l'écouteur d'événement de suppression à ces tags
            const removeBtnTag = newTag.querySelector(".fa-xmark");
            const removeBtnList = newListTag.querySelector(".fa-circle-xmark");

            // Fonction pour gérer la suppression des tags
            function removeTags() {
                newTag.remove();
                newListTag.remove();
                recipeContainer.innerHTML = "";

                // Retire l'élément supprimé de la liste tagList
                const index = tagList.indexOf(newTag);
                if (index !== -1) {
                    tagList.splice(index, 1);
                }

                // Après avoir supprimé un tag
                if (newListAfterSearch != 0) {
                    const mainSearchbar = document.querySelector("nav input");
                    const inputValue = mainSearchbar.value.toLowerCase();
                    let newList = [];
                    performSearch(recipes, inputValue, newList);
                    updateAfterTag(newListAfterSearch, tagList);
                    resetAndUpdateDisplay(newListAfterUpdate);
                } else {
                    updateAfterTag(recipes, tagList);
                    resetAndUpdateDisplay(newListAfterUpdate);
                }

                // Affiche toutes les recettes après suppression de tous les filtres
                if (tagList.length === 0) {
                    const mainSearchbar = document.querySelector("nav input");
                    const inputValue = mainSearchbar.value.toLowerCase();
                    console.log("inputvalue", inputValue)
                    if (inputValue != "") {
                        let newList = [];
                        performSearch(recipes, inputValue, newList);
                        resetAndUpdateDisplay(newListAfterSearch);
                        // Reset de la liste aftertag pour afficher toutes les recettes si suppression du champ
                        newListAfterTag = [];
                    } else {
                        resetAndUpdateDisplay(recipes);
                    }
                }
            }

            // Ajout de l'écouteur d'événement de suppression aux deux boutons de suppression
            removeBtnTag.addEventListener("click", removeTags);
            removeBtnList.addEventListener("click", removeTags);

            // Après avoir ajouté un nouveau tag
            if (newListAfterSearch != 0) {
                updateAfterTag(newListAfterSearch, tagList);
                newListAfterTag = newList;
                resetAndUpdateDisplay(newListAfterUpdate);
            } else {
                updateAfterTag(recipes, tagList);
                resetAndUpdateDisplay(newListAfterUpdate);
            }
        });
    });
    // Stocker la nouvelle liste dans une variable plus claire
    newListAfterTag = newList;
}