export let newListAfterUpdate;

export function updateAfterTag(recipes, tagList) {
    const newList = recipes.filter(recipe => {
        return tagList.every(tag => {
            const tagText = tag.querySelector("p").innerText.toLowerCase();
            return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tagText)) ||
                   recipe.appliance.toLowerCase().includes(tagText) ||
                   recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tagText));
        });
    });

    newListAfterUpdate = newList;
    return newListAfterUpdate;
}

export function updateRecipeNumber (newList){
    const nbRecipes = document.getElementById("nbRecipes");
    const number = newList.length;

    if (number >= 2){
        nbRecipes.innerText = `${number} recettes`;
    } else {
        nbRecipes.innerText = `${number} recette`;
    }
}