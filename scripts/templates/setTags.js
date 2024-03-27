import { filterUpdate } from "../main.js";
import { cardTemplate } from "./recipeCard.js";

export function setTags (optionList, newList){
    const recipeContainer = document.querySelector(".container_recipes");
    const tagBar = document.querySelector(".tag_bar");
    let tagList = [];
    console.log("settag entry optionlist", optionList);
    
    optionList.forEach(option => {
        option.addEventListener("click", () =>{
            console.log("je clique");
            // Ajout du tag sous la barre de filtres
            const newTag = document.createElement("div");
            newTag.setAttribute("class", "filter_tag");
            newTag.innerHTML = `
            <p>${option.innerText}</p>
            <i class="fa-solid fa-xmark cursor-pointer duration-200 hover:scale-125"></i>
            `;
            tagBar.appendChild(newTag);
            tagList.push(newTag);
            
            // //Ajout du tag dans la liste déroulante
            // const newListTag = document.createElement("div");
            // const dropdownFilter = document.querySelector('.dropdown_filter');
            // const filterListIngredients = document.querySelector('.filter_list_ingredients');
            
            // newListTag.setAttribute("class", "chosen_option");
            // newListTag.innerHTML = `
            // <p>${option.innerText}</p>
            // <i class="fa-solid fa-circle-xmark cursor-pointer duration-200 hover:scale-125"></i>
            // `
            // dropdownFilter.insertBefore(newListTag, filterListIngredients);
            
            // Ajout de l'écouteur d'événement de suppression à ce tag
            const removeBtn = newTag.querySelector(".fa-xmark");
            removeBtn.addEventListener("click", () => {
                newTag.remove();
                // Retire l'élément supprimé de la liste tagList
                const index = tagList.indexOf(newTag);
                if (index !== -1) {
                    tagList.splice(index, 1);
                }
                recipeContainer.innerHTML = "";
                filterUpdate(newList, tagList); // Mise à jour des recettes affichées après suppression
                
                // Affiche toutes les recettes après suppression de tous les filtres
                if (tagList.length === 0){
                    cardTemplate(newList);
                }
            });
            
            filterUpdate(newList, tagList); // Met à jour les recettes après l'ajout d'un tag
            console.log("settag newlist", newList);
            console.log("settag taglist", tagList);
        });
    });
}