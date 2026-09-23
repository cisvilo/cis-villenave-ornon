```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
       IDENTIQUE AU SSUAP
       ===================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }


    /* =====================================================
       SOUS-MENU INVENTAIRES
       IDENTIQUE AU SSUAP
       ===================================================== */

    const inventoryToggle = document.getElementById("inventoryToggle");
    const inventoryDropdown = document.getElementById("inventoryDropdown");

    if (inventoryToggle && inventoryDropdown) {

        inventoryToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            inventoryDropdown.classList.toggle("open");

        });

    }


    /* =====================================================
       RECHERCHE CASERNEMENT
       ===================================================== */

    const searchInput =
        document.getElementById("casernementSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const searchResult =
        document.getElementById("searchResult");

    const cards =
        document.querySelectorAll(".casernement-card");

    const noResult =
        document.getElementById("noResult");


    function normalize(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    function filterCards() {

        if (!searchInput) return;

        const query =
            normalize(searchInput.value.trim());

        let visible = 0;


        cards.forEach(function (card) {

            const text =
                normalize(
                    card.textContent +
                    " " +
                    (card.dataset.search || "")
                );

            const match =
                query === "" ||
                text.includes(query);


            card.style.display =
                match ? "" : "none";


            if (match) {
                visible++;
            }

        });


        /* Aucun résultat */

        if (noResult) {

            noResult.classList.toggle(
                "show",
                visible === 0
            );

        }


        /* Nombre de résultats */

        if (searchResult) {

            if (query === "") {

                searchResult.textContent = "";

            } else {

                searchResult.textContent =
                    visible +
                    (
                        visible > 1
                            ? " matériels trouvés"
                            : " matériel trouvé"
                    );

            }

        }

    }


    /* Recherche en direct */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    /* Bouton X */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (!searchInput) return;

                searchInput.value = "";

                filterCards();

                searchInput.focus();

            }
        );

    }


    /* Touche Échap */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                searchInput
            ) {

                searchInput.value = "";

                filterCards();

            }

        }
    );

});
```


