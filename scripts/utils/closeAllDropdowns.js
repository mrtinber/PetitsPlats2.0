// Fonction pour fermer tous les dropdowns sauf celui qui est actuellement ouvert
export function closeAllDropdowns() {
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