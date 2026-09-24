
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            mainNav.classList.toggle("active");
        });

    }


    /* =====================================================
       SOUS-MENU INVENTAIRES
       ===================================================== */

    const inventoryToggle = document.getElementById("inventoryToggle");
    const inventoryDropdown = document.getElementById("inventoryDropdown");

    if (inventoryToggle && inventoryDropdown) {

        inventoryToggle.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            inventoryDropdown.classList.toggle("open");

        });

    }


    /* =====================================================
       FERMETURE DU MENU
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (
            mainNav &&
            mobileToggle &&
            !mainNav.contains(event.target) &&
            !mobileToggle.contains(event.target)
        ) {
            mainNav.classList.remove("active");
        }

        if (
            inventoryDropdown &&
            inventoryToggle &&
            !inventoryDropdown.contains(event.target) &&
            !inventoryToggle.contains(event.target)
        ) {
            inventoryDropdown.classList.remove("open");
        }

    });


    /* =====================================================
       TOUCHE ÉCHAP
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (mainNav) {
                mainNav.classList.remove("active");
            }

            if (inventoryDropdown) {
                inventoryDropdown.classList.remove("open");
            }

        }

    });


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

});

