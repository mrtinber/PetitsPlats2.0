import {
    inputValue,
    performSearch,
    resetAndUpdateDisplay,
} from "../utils/searchRecipes.js";
import recipes from "../data/recipes.js";

const tagBar = document.querySelector(".tag_bar");

export let tagList = [];

export function displayTags() {
    let optionList = document.querySelectorAll(".filter_option");

    // On parcourt chaque option des listes déroulantes et on écoute l'événement "clic"
    optionList.forEach((option) => {
        option.addEventListener("click", () => {
            // Ajout du tag sous la barre de filtres
            const newTag = document.createElement("div");
            newTag.setAttribute("class", "filter_tag");
            newTag.innerHTML = `
            <p>${option.innerText}</p>
            <svg width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="xmark object-contain cursor-pointer duration-200 hover:scale-125"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            `;
            tagBar.appendChild(newTag);

            // On crée une variable pour le texte du tag et on ajoute ce texte à la liste de tags
            const tagText = option.innerText.toLowerCase();
            tagList.push(tagText);

            // Ajout du tag dans la liste déroulante correspondante
            const parentClassName = option.parentNode.className;
            let dropdownFilter;

            if (parentClassName.includes("filter_list_ingredients")) {
                dropdownFilter = document.querySelector(
                    ".filter_list_ingredients"
                );
            } else if (parentClassName.includes("filter_list_appliances")) {
                dropdownFilter = document.querySelector(
                    ".filter_list_appliances"
                );
            } else if (parentClassName.includes("filter_list_utensils")) {
                dropdownFilter = document.querySelector(
                    ".filter_list_utensils"
                );
            }

            const filterListElement = dropdownFilter.querySelector("li");

            const newListTag = document.createElement("div");
            newListTag.setAttribute("class", "chosen_option");
            newListTag.innerHTML = `
            <p>${option.innerText}</p>
            <svg width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="circle-xmark object-contain cursor-pointer duration-200 hover:scale-125"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            `;
            dropdownFilter.insertBefore(newListTag, filterListElement);

            // Ajout de l'écouteur d'événement de suppression à ces tags
            const removeBtnTag = newTag.querySelector(".xmark");
            const removeBtnList = newListTag.querySelector(".circle-xmark");

            // Fonction pour gérer la suppression des tags
            function removeTags() {
                newTag.remove();
                newListTag.remove();

                // Retire l'élément supprimé de la liste tagList
                const index = tagList.indexOf(tagText);
                if (index !== -1) {
                    tagList.splice(index, 1);
                }

                // Affiche toutes les recettes après suppression de tous les filtres
                if (tagList.length === 0) {
                    const mainSearchbar = document.querySelector("nav input");
                    const inputValue = mainSearchbar.value.toLowerCase();
                    if (inputValue != "") {
                        const newListAfterSearch = performSearch(
                            recipes,
                            inputValue
                        );
                        resetAndUpdateDisplay(newListAfterSearch);
                    } else {
                        resetAndUpdateDisplay(recipes);
                    }
                }

                const newListAfterSearch = performSearch(recipes, inputValue);
                resetAndUpdateDisplay(newListAfterSearch);
            }

            // Ajout de l'écouteur d'événement de suppression aux deux boutons de suppression
            removeBtnTag.addEventListener("click", removeTags);
            removeBtnList.addEventListener("click", removeTags);

            const newListAfterSearch = performSearch(recipes, inputValue);
            resetAndUpdateDisplay(newListAfterSearch);
        });
    });
}
