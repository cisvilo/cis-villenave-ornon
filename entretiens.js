
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    mainNav.classList.toggle("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );

    }


    /* =====================================================
       MENU INVENTAIRES
       ===================================================== */

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");

    const inventoryToggle =
        document.getElementById("inventoryToggle");


    if (inventoryDropdown && inventoryToggle) {

        inventoryToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    inventoryDropdown.classList.toggle("open");

                inventoryToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );

    }


    /* =====================================================
       FERMETURE DES MENUS
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                inventoryDropdown &&
                !inventoryDropdown.contains(event.target)
            ) {

                inventoryDropdown.classList.remove("open");

                if (inventoryToggle) {

                    inventoryToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }


            if (
                mainNav &&
                mobileToggle &&
                !mainNav.contains(event.target) &&
                !mobileToggle.contains(event.target)
            ) {

                mainNav.classList.remove("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (inventoryDropdown) {
                    inventoryDropdown.classList.remove("open");
                }

                if (inventoryToggle) {

                    inventoryToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                if (mainNav) {
                    mainNav.classList.remove("open");
                }

                if (mobileToggle) {

                    mobileToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       RECHERCHE
       ===================================================== */

    const searchInput =
        document.getElementById("entretiensSearch");

    const cards =
        document.querySelectorAll(".entretien-card");

    const emptyState =
        document.getElementById("entretiensEmpty");

    const clearSearch =
        document.getElementById("clearSearch");


    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    function filterCards() {

        if (!searchInput) {
            return;
        }


        const searchValue =
            normalizeText(
                searchInput.value.trim()
            );


        let visibleCards = 0;


        cards.forEach(
            function (card) {

                const searchableText =
                    normalizeText(
                        card.dataset.search ||
                        card.textContent
                    );


                const match =
                    searchValue === "" ||
                    searchableText.includes(searchValue);


                if (match) {

                    card.classList.remove("hidden");

                    visibleCards++;

                } else {

                    card.classList.add("hidden");

                }

            }
        );


        if (emptyState) {

            emptyState.classList.toggle(
                "visible",
                visibleCards === 0
            );

        }


        if (clearSearch) {

            clearSearch.classList.toggle(
                "visible",
                searchInput.value.trim() !== ""
            );

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    /* =====================================================
       EFFACER LA RECHERCHE
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
       REDIMENSIONNEMENT
       ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 850) {

                if (mainNav) {
                    mainNav.classList.remove("open");
                }

                if (mobileToggle) {

                    mobileToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});

