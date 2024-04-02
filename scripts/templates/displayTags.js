import { filterUpdate, newList, newListAfterUpdate, updateRecipeNumber } from "../main.js";
import { newListAfterSearch, performSearch, resetAndUpdateDisplay } from "../utils/searchRecipes.js";
import { cardTemplate } from "./cardTemplate.js";
import recipes from "../data/recipes.js";
import { setFilters } from "./setFilters.js";

const recipeContainer = document.querySelector(".container_recipes");
const tagBar = document.querySelector(".tag_bar");
export let tagList = [];

export let newListAfterTag = [];

export function displayTags (){

    let optionList = document.querySelectorAll(".filter_option");
    newListAfterTag = [];
    
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

                ///////////// A verifier
                // Les filtres sont bien mis à jour correctement : notamment après avoir tapé un mot
                // --> tape "choco", sélectionne "oeuf" et d'autres filtres, vérifier si le moule à 6 est toujours là
                // Afficher l'écran quand il n'y a pas de résultats
                // Vérifier à la suppression du champ principal s'il prend bien en compte toutes les recettes 
                
                // Après avoir supprimé un tag
                if (newListAfterSearch != 0){
                    console.log("j'ai suppr un tag, nlas != 0")
                    const mainSearchbar = document.querySelector("nav input");
                    const inputValue = mainSearchbar.value.toLowerCase();
                    console.log("la nouvelle liste normalement la bonne", newListAfterTag)
                    let newList = [];
                    performSearch(recipes, inputValue, newList);
                    filterUpdate(newList, tagList);
                    let optionList = document.querySelectorAll(".filter_option");
                    optionList.forEach(li => {
                        li.remove();
                    });
                    setFilters(newListAfterUpdate);
                    displayTags();
                    console.log("c koi nouvelle liste after update", newListAfterUpdate)
                } else {
                    console.log("j'ai suppr un tag, nlas =0")
                    filterUpdate(recipes, tagList);
                    let optionList = document.querySelectorAll(".filter_option");
                    optionList.forEach(li => {
                        li.remove();
                    });
                    setFilters(newList);
                    displayTags();
                }

                // Affiche toutes les recettes après suppression de tous les filtres
                if (tagList.length === 0){
                    const mainSearchbar = document.querySelector("nav input");
                    const inputValue = mainSearchbar.value.toLowerCase();
                    if (inputValue != ""){
                        let newList = []
                        performSearch(recipes, inputValue, newList);
                        resetAndUpdateDisplay(newList);
                        let optionList = document.querySelectorAll(".filter_option");
                        optionList.forEach(li => {
                            li.remove();
                        });
                        setFilters(newList);
                        displayTags();
                        // Reset de la liste aftertag pour afficher toutes les recettes si suppression du champ
                        newListAfterTag = []
                    } else {
                        console.log("la liste de tag est vide, je remets à zéro");
                        console.log("liste vide", newListAfterTag);
                        recipeContainer.innerHTML = "";
                        cardTemplate(recipes);
                        updateRecipeNumber(recipes);
    
                        let optionList = document.querySelectorAll(".filter_option");
                        optionList.forEach(li => {
                            li.remove();
                        });
                        setFilters(recipes);
                        displayTags();
                    }
                }
            };

            // Ajout de l'écouteur d'événement de suppression aux deux boutons de suppression
            removeBtnTag.addEventListener("click", removeTags);
            removeBtnList.addEventListener("click", removeTags);
            
            // Après avoir ajouté un nouveau tag
            console.log("nlas après recherche = ", newListAfterSearch)

            if (newListAfterSearch != 0){
                console.log("nlas != 0")
                filterUpdate(newListAfterSearch, tagList);
                newListAfterTag = newList;
                console.log("la newlist ici", newList)
            } else {
                console.log("nlas = 0")
                filterUpdate(recipes, tagList);
            }

            let optionList = document.querySelectorAll(".filter_option");
            optionList.forEach(li => {
                li.remove();
            });
        
            setFilters(newList);
            displayTags();
        });
    });
    // Stocker la nouvelle liste dans une variable plus claire
    newListAfterTag = newList;
}