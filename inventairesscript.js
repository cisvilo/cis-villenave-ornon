```javascript
/* =========================================================
   RECHERCHE INVENTAIRES
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("inventorySearch");

    const cards =
        document.querySelectorAll(".inventory-card");

    const empty =
        document.getElementById("inventoryEmpty");


    if (!searchInput || !cards.length) {
        return;
    }


    searchInput.addEventListener("input", function () {

        const search = this.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        let found = 0;


        cards.forEach(function (card) {

            const content = (
                card.dataset.search +
                " " +
                card.textContent
            )
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


            if (content.includes(search)) {

                card.style.display = "";

                found++;

            } else {

                card.style.display = "none";

            }

        });


        empty.style.display =
            found === 0 ? "block" : "none";

    });

});

