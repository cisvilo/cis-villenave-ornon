document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", function () {

            const opened = mainNav.classList.toggle("active");

            mobileToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
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
       FERMER LE MENU MOBILE APRÈS UN CLIC
       ===================================================== */

    if (mainNav) {

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 850) {

                    mainNav.classList.remove("active");

                    if (mobileToggle) {

                        mobileToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });

        });

    }


    /* =====================================================
       RECHERCHE DIV
       ===================================================== */

    const searchInput =
        document.getElementById("divSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const searchResult =
        document.getElementById("searchResult");

    const cards =
        document.querySelectorAll(".div-card");

    const noResult =
        document.getElementById("noResult");


    /* =====================================================
       NORMALISATION
       ===================================================== */

    function normalize(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    /* =====================================================
       FILTRAGE
       ===================================================== */

    function filterCards() {

        if (!searchInput) {
            return;
        }

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


        /* AUCUN RÉSULTAT */

        if (noResult) {

            noResult.classList.toggle(
                "show",
                visible === 0
            );

        }


        /* COMPTEUR */

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


    /* =====================================================
       SAISIE RECHERCHE
       ===================================================== */

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
       TOUCHE ESCAPE
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
