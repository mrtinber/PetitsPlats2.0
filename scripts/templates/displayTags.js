import { filterUpdate, newList, updateRecipeNumber } from "../main.js";
import { searchRecipes } from "../utils/searchRecipes.js";
import { cardTemplate } from "./cardTemplate.js";
import recipes from "../data/recipes.js";
import { setFilters } from "./setFilters.js";

const recipeContainer = document.querySelector(".container_recipes");
const tagBar = document.querySelector(".tag_bar");
let tagList = [];

export function displayTags (){

    let optionList = document.querySelectorAll(".filter_option");
    // On crée la liste vide des éléments HTML de tags
    
    // On parcourt chaque option des listes déroulantes et on écoute l'événement "clic"
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
            `
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
                
                console.log("je supprime un tag, voici newlist avant maj:", newList)
                // Après avoir supprimé un nouveau tag
                filterUpdate(newList, tagList);

                let optionList = document.querySelectorAll(".filter_option");
                optionList.forEach(li => {
                    li.remove();
                });
                setFilters(newList);
                displayTags()
                
                // Affiche toutes les recettes après suppression de tous les filtres
                if (tagList.length === 0){
                    cardTemplate(recipes);
                    updateRecipeNumber(recipes);
                    let optionList = document.querySelectorAll(".filter_option");
                    optionList.forEach(li => {
                        li.remove();
                    });
                    setFilters(recipes);
                    displayTags();
                    // Si on vide la liste de tags, on veut qu'il prenne quand même en compte l'input du champ principal 
                    // Il faut récupérer ce qu'il y a d'écrit dans l'input et faire le tri selon cet input
                    // const inputValue = mainSearchbar.value.toLowerCase();
                    // if (inputValue != ""){
                        // afficher les recettes 
                    // }
                    // searchRecipes(recipes, newList);
                }
            };

            // Ajout de l'écouteur d'événement de suppression aux deux boutons de suppression
            removeBtnTag.addEventListener("click", removeTags);
            removeBtnList.addEventListener("click", removeTags);
            
            // Après avoir ajouté un nouveau tag
            console.log("taglist = ", tagList)
            filterUpdate(recipes, tagList);

            let optionList = document.querySelectorAll(".filter_option");
            optionList.forEach(li => {
                li.remove();
            });
        
            setFilters(newList);
            displayTags();
                //         function addTagAndUpdateFilters(newList) {
                // Mettre à jour les recettes affichées et récupérer la nouvelle liste newList
    //             newList = filterUpdate(recipes, tagList);
    //             // Mettre à jour les options disponibles dans les filtres
    //             setFilters(newList);
    //             // Mettre à jour les tags
    //             setTags(newList);
    //         }

    //         // Après avoir ajouté un nouveau tag, appelez addTagAndUpdateFilters
    //         addTagAndUpdateFilters(newList);
        });
    });
}