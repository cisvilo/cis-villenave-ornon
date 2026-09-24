
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ÉLÉMENTS DU MENU
       ===================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");

    const inventoryToggle =
        document.getElementById("inventoryToggle");


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                mainNav.classList.contains("active");

            if (isOpen) {

                mainNav.classList.remove("active");
                mobileToggle.classList.remove("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                /* Ferme aussi le sous-menu */

                if (inventoryDropdown) {
                    inventoryDropdown.classList.remove("open");
                }

                if (inventoryToggle) {
                    inventoryToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            } else {

                mainNav.classList.add("active");
                mobileToggle.classList.add("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    /* =====================================================
       SOUS-MENU INVENTAIRES
       ===================================================== */

    if (inventoryToggle && inventoryDropdown) {

        inventoryToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                inventoryDropdown.classList.contains("open");

            if (isOpen) {

                inventoryDropdown.classList.remove("open");

                inventoryToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                inventoryDropdown.classList.add("open");

                inventoryToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    /* =====================================================
       LIENS DU MENU MOBILE
       ===================================================== */

    if (mainNav) {

        const navLinks =
            mainNav.querySelectorAll(
                "a:not(.nav-dropdown-menu a)"
            );

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 900) {

                    mainNav.classList.remove("active");

                    if (mobileToggle) {

                        mobileToggle.classList.remove("open");

                        mobileToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });

        });


        /* Les liens du sous-menu ferment aussi le menu */

        const inventoryLinks =
            mainNav.querySelectorAll(
                ".nav-dropdown-menu a"
            );

        inventoryLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 900) {

                    mainNav.classList.remove("active");

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

    }


    /* =====================================================
       CLIC EN DEHORS
       ===================================================== */

    document.addEventListener("click", function (event) {

        /* Sous-menu */

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


        /* Menu mobile */

        if (
            mainNav &&
            mobileToggle &&
            !mainNav.contains(event.target) &&
            !mobileToggle.contains(event.target)
        ) {

            mainNav.classList.remove("active");

            mobileToggle.classList.remove("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") {
            return;
        }


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

    });


    /* =====================================================
       REDIMENSIONNEMENT
       ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

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


    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    function performSearch() {

        if (!searchInput) {
            return;
        }


        const query =
            normalizeText(searchInput.value);

        let visibleCards = 0;


        cards.forEach(function (card) {

            const cardText =
                normalizeText(
                    card.textContent || ""
                );

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

        if (searchResult) {

            if (query === "") {

                searchResult.textContent = "";

            } else if (visibleCards > 0) {

                searchResult.textContent =
                    visibleCards +
                    " résultat" +
                    (visibleCards > 1 ? "s" : "");

            } else {

                searchResult.textContent =
                    "Aucun résultat";

            }

        }


        /* Aucun résultat */

        if (noResult) {

            noResult.classList.toggle(
                "show",
                query !== "" && visibleCards === 0
            );

        }

    }


    /* =====================================================
       RECHERCHE EN DIRECT
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performSearch
        );


        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    searchInput.value = "";

                    performSearch();

                    searchInput.focus();

                }

            }
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

                performSearch();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       INITIALISATION
       ===================================================== */

    performSearch();

});



