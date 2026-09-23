/* =========================================================
   CIS VILLENAVE-D'ORNON
   JAVASCRIPT — PAGE INVENTAIRES
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MENU
       ===================================================== */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mainNav =
        document.getElementById("mainNav");

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");

    const inventoryToggle =
        document.getElementById("inventoryToggle");


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    mainNav.classList.toggle("active");

                mobileToggle.classList.toggle(
                    "open",
                    isOpen
                );

                mobileToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );

    }


    /* =====================================================
       SOUS-MENU INVENTAIRES
       ===================================================== */

    if (
        inventoryDropdown &&
        inventoryToggle
    ) {

        inventoryToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                const isOpen =
                    inventoryDropdown.classList.toggle(
                        "open"
                    );

                inventoryToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );

    }


    /* =====================================================
       FERMER MENU MOBILE
       ===================================================== */

    function closeMobileMenu() {

        if (mainNav) {

            mainNav.classList.remove(
                "active"
            );

        }

        if (mobileToggle) {

            mobileToggle.classList.remove(
                "open"
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* =====================================================
       FERMER SOUS-MENU
       ===================================================== */

    function closeInventoryMenu() {

        if (inventoryDropdown) {

            inventoryDropdown.classList.remove(
                "open"
            );

        }

        if (inventoryToggle) {

            inventoryToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* =====================================================
       LIENS NAVIGATION
       ===================================================== */

    document
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        });


    document
        .querySelectorAll(".nav-dropdown-menu a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                    closeInventoryMenu();

                }
            );

        });


    /* =====================================================
       CLIC EN DEHORS DU MENU
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                inventoryDropdown &&
                !inventoryDropdown.contains(
                    event.target
                )
            ) {

                closeInventoryMenu();

            }

        }
    );


    /* =====================================================
       TOUCHE ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileMenu();

                closeInventoryMenu();

            }

        }
    );


    /* =====================================================
       REDIMENSIONNEMENT
       ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 850
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       RECHERCHE
       ===================================================== */

    const searchInput =
        document.getElementById(
            "inventorySearch"
        );

    const cards =
        document.querySelectorAll(
            ".inventory-card"
        );

    const emptyMessage =
        document.getElementById(
            "inventoryEmpty"
        );

    const clearSearch =
        document.getElementById(
            "clearSearch"
        );


    /* =====================================================
       NORMALISATION DES ACCENTS
       ===================================================== */

    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );

    }


    /* =====================================================
       FILTRER LES CARTES
       ===================================================== */

    function filterInventories() {

        if (!searchInput) {
            return;
        }


        const search =
            normalizeText(
                searchInput.value.trim()
            );


        let visibleCards = 0;


        cards.forEach(
            function (card) {

                const searchableText =
                    normalizeText(
                        (
                            card.dataset.search ||
                            card.textContent ||
                            ""
                        )
                    );


                const matches =
                    search === "" ||
                    searchableText.includes(
                        search
                    );


                if (matches) {

                    card.classList.remove(
                        "hidden"
                    );

                    visibleCards++;

                } else {

                    card.classList.add(
                        "hidden"
                    );

                }

            }
        );


        /* =================================================
           MESSAGE AUCUN RÉSULTAT
           ================================================= */

        if (emptyMessage) {

            if (
                search !== "" &&
                visibleCards === 0
            ) {

                emptyMessage.style.display =
                    "flex";

            } else {

                emptyMessage.style.display =
                    "none";

            }

        }


        /* =================================================
           BOUTON EFFACER
           ================================================= */

        if (clearSearch) {

            clearSearch.style.display =
                search !== ""
                    ? "flex"
                    : "none";

        }

    }


    /* =====================================================
       RECHERCHE EN DIRECT
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterInventories
        );

    }


    /* =====================================================
       EFFACER
       ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (!searchInput) {
                    return;
                }

                searchInput.value = "";

                filterInventories();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       ANIMATION DES CARTES
       ===================================================== */

    cards.forEach(
        function (card, index) {

            card.style.transitionDelay =
                (index * 0.06) + "s";

        }
    );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        cards.forEach(
            function (card) {

                observer.observe(card);

            }
        );

    } else {

        cards.forEach(
            function (card) {

                card.classList.add(
                    "visible"
                );

            }
        );

    }

});
