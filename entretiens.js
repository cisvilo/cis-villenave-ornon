
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const opened =
                mainNav.classList.toggle("active");

            mobileToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        });

    }


    /* =====================================================
       SOUS-MENU INVENTAIRES
       ===================================================== */

    const inventoryToggle =
        document.getElementById("inventoryToggle");

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");


    if (inventoryToggle && inventoryDropdown) {

        inventoryToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const opened =
                inventoryDropdown.classList.toggle("open");

            inventoryToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        });


        document.addEventListener("click", function (event) {

            if (!inventoryDropdown.contains(event.target)) {

                inventoryDropdown.classList.remove("open");

                inventoryToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       RECHERCHE
       ===================================================== */

    const searchInput =
        document.getElementById("entretiensSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const searchResult =
        document.getElementById("searchResult");

    const cards =
        document.querySelectorAll(".entretiens-card");

    const noResult =
        document.getElementById("noResult");


    function normalize(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    function filterCards() {

        if (!searchInput) {
            return;
        }


        const query =
            normalize(
                searchInput.value.trim()
            );


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


        if (noResult) {

            noResult.classList.toggle(
                "show",
                visible === 0
            );

        }


        if (searchResult) {

            if (query === "") {

                searchResult.textContent = "";

            } else {

                searchResult.textContent =
                    visible +
                    (
                        visible > 1
                            ? " véhicules trouvés"
                            : " véhicule trouvé"
                    );

            }

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    /* =====================================================
       BOUTON EFFACER
       ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (!searchInput) {
                    return;
                }

                searchInput.value = "";

                filterCards();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       ESCAPE
       ===================================================== */

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
