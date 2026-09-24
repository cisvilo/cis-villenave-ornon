
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen = mainNav.classList.toggle("active");

            mobileToggle.classList.toggle("open", isOpen);

            mobileToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });
    }


    /* =====================================================
       MENU INVENTAIRES
       ===================================================== */

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");

    const inventoryToggle =
        document.getElementById("inventoryToggle");

    if (inventoryDropdown && inventoryToggle) {

        inventoryToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                inventoryDropdown.classList.toggle("open");

            inventoryToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

        document.addEventListener("click", (event) => {

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
       RECHERCHE DOCUMENTS
       ===================================================== */

    const searchInput =
        document.getElementById("documentsSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const cards =
        document.querySelectorAll(".documents-card");

    const noResult =
        document.getElementById("noResult");

    const searchResult =
        document.getElementById("searchResult");


    if (searchInput) {

        function normalize(text) {

            return text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        }


        function performSearch() {

            const query =
                normalize(searchInput.value.trim());

            let visibleCards = 0;


            cards.forEach((card) => {

                const cardText =
                    normalize(card.innerText);

                const match =
                    query === "" ||
                    cardText.includes(query);

                card.style.display =
                    match ? "" : "none";

                if (match) {
                    visibleCards++;
                }

            });


            /* Résultats */

            if (query !== "") {

                if (visibleCards === 0) {

                    searchResult.textContent =
                        "Aucun résultat";

                } else {

                    searchResult.textContent =
                        `${visibleCards} résultat${visibleCards > 1 ? "s" : ""}`;
                }

            } else {

                searchResult.textContent = "";
            }


            /* Aucun résultat */

            if (query !== "" && visibleCards === 0) {

                noResult.classList.add("show");

            } else {

                noResult.classList.remove("show");
            }
        }


        /* Recherche en direct */

        searchInput.addEventListener(
            "input",
            performSearch
        );


        /* Bouton X */

        if (clearSearch) {

            clearSearch.addEventListener("click", () => {

                searchInput.value = "";

                performSearch();

                searchInput.focus();

            });
        }


        /* Touche Échap */

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    searchInput.value = "";

                    performSearch();

                    searchInput.focus();
                }

            }
        );

    }


    /* =====================================================
       FERMETURE MENU AVEC ÉCHAP
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (mainNav) {

                mainNav.classList.remove("active");

            }

            if (mobileToggle) {

                mobileToggle.classList.remove("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            if (inventoryDropdown) {

                inventoryDropdown.classList.remove("open");

            }

            if (inventoryToggle) {

                inventoryToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }

    });

});

