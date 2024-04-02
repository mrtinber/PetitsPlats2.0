// // Mise à jour de la liste de recettes disponibles
// export function updateAfterTag(recipes, tagList) {
//     let tagText = [];
//     tagList.forEach(element => {
//         const textElement = element.innerText.toLowerCase();
//         tagText.push(textElement);
//     });

//     console.log("tagtext", tagText);
//     console.log("taglist", tagList);
//     // Reset newList à chaque nouvelle mise à jour
//     newList = [];

//     for(let i=0; i < recipes.length; i++) {
//         let foundInIngredients = false;
//         let foundInAppliances = false;
//         let foundInUtensils = false; 

//         for (let t = 0; t < tagList.length; t++) {
//             const tagText = tagList[t].querySelector("p").innerText.toLowerCase();
//             // Utilisation d'une boucle pour vérifier chaque caractère des ingrédients de la recette
//             for (let j = 0; j < recipes[i].ingredients.length; j++) {
//                 const itemIngredients = recipes[i].ingredients[j].ingredient.toLowerCase();
//                 for (let k = 0; k <= itemIngredients.length - tagText.length; k++) {
//                     if (itemIngredients.substring(k, k + tagText.length).toLowerCase() === tagText) {
//                         foundInIngredients = true;
//                         break;
//                     }
//                 }
//             } 

//             // Utilisation d'une boucle pour vérifier chaque caractère de les appareils de la recette
//             for (let j = 0; j <= recipes[i].appliance.length - tagText.length; j++) {
//                     if (recipes[i].appliance.substring(j, j + tagText.length).toLowerCase() === tagText) {
//                         foundInAppliances = true;
//                         break;
//                     }
//             }

//             // Utilisation d'une boucle pour vérifier chaque caractère des ustensiles de la recette
//             for (let j = 0; j < recipes[i].ustensils.length; j++) {
//                 const itemUtensils = recipes[i].ustensils[j].toLowerCase();
//                 for (let k = 0; k <= itemUtensils.length - tagText.length; k++) {
//                     if (itemUtensils.substring(k, k + tagText.length).toLowerCase() === tagText) {
//                         foundInUtensils = true;
//                         break;
//                     }
//                 }
//             } 

//             if (foundInIngredients || foundInAppliances || foundInUtensils) {
//                 if (!newList.includes(recipes[i])){
//                     newList.push(recipes[i]);
//                 }
//             }  
//         }
//     }
//     // Mettre à jour l'affichage des recettes
//     recipeContainer.innerHTML = "";
//     cardTemplate(newList);
//     console.log("newlist", newList);
// }