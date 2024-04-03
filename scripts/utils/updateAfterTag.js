export let newListAfterUpdate;

export function updateAfterTag(recipes, tagList) {
    // Reset newList à chaque nouvelle mise à jour
    let newList = [];

    // On va parcourir chaque recette pour voir s'il y a des correspondances avec tous les tags
    for (let i = 0; i < recipes.length; i++) {
        let foundAllTags = true; // Initialisation à true pour indiquer que tous les tags sont trouvés pour cette recette

        // Vérification pour chaque tag de la liste
        for (let t = 0; t < tagList.length; t++) {
            const tagText = tagList[t].querySelector("p").innerText.toLowerCase();
            let foundTag = false; // Initialisation à false pour indiquer que le tag n'est pas trouvé par défaut

            // Vérification des ingrédients
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                const itemIngredient = recipes[i].ingredients[j].ingredient.toLowerCase();
                if (itemIngredient.includes(tagText)) {
                    foundTag = true;
                    break; // Si le tag est trouvé dans les ingrédients, on arrête la boucle
                }
            }

            // Vérification des appareils
            if (!foundTag && recipes[i].appliance.toLowerCase().includes(tagText)) {
                foundTag = true;
            }

            // Vérification des ustensiles
            for (let j = 0; j < recipes[i].ustensils.length; j++) {
                const itemUtensil = recipes[i].ustensils[j].toLowerCase();
                if (itemUtensil.includes(tagText)) {
                    foundTag = true;
                    break; // Si le tag est trouvé dans les ustensiles, on arrête la boucle
                }
            }

            // Si le tag n'est pas trouvé pour cette recette, on met foundAllTags à false
            if (!foundTag) {
                foundAllTags = false;
                break; // Pas besoin de vérifier les autres tags pour cette recette
            }
        }

        // Si tous les tags sont trouvés pour cette recette, on l'ajoute à la liste newList
        if (foundAllTags) {
            newList.push(recipes[i]);
        }
    }

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