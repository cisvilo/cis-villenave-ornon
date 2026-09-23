```javascript
/* =========================================================
   RECHERCHE PAGE INVENTAIRES
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("inventorySearch");
    const inventoryCards = document.querySelectorAll(".inventory-card");
    const emptyMessage = document.getElementById("inventoryEmpty");

    if (!searchInput || !inventoryCards.length) {
        return;
    }

    searchInput.addEventListener("input", function () {

        const search = this.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        let visibleCards = 0;

        inventoryCards.forEach(function (card) {

            const text = (
                card.dataset.search +
                " " +
                card.textContent
            )
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

            const match = text.includes(search);

            card.style.display = match ? "" : "none";

            if (match) {
                visibleCards++;
            }
        });

        emptyMessage.style.display =
            visibleCards === 0 ? "block" : "none";

    });

});
