/* =========================================================
   CIS VILLENAVE-D'ORNON
   JAVASCRIPT — PAGE INVENTAIRES
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ÉLÉMENTS DU MENU
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
       FERMER LE MENU MOBILE
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
       FERMER LE SOUS-MENU
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
       LIENS DU MENU
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }
    );


    const submenuLinks =
        document.querySelectorAll(
            ".nav-dropdown-menu a"
        );


    submenuLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                    closeInventoryMenu();

                }
            );

        }
    );


    /* =====================================================
       CLIC EN DEHORS
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
       ESCAPE
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
       RECHERCHE INVENTAIRES
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


    function filterInventories() {

        if (!searchInput) {
            return;
        }


        const search =
            searchInput.value
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                );


        let visibleCards = 0;


        cards.forEach(
            function (card) {

                const searchableText =
                    (
                        card.dataset.search ||
                        card.textContent ||
                        ""
                    )
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
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


        /* Aucun résultat */

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


        /* Bouton effacer */

        if (clearSearch) {

            clearSearch.style.display =
                search !== ""
                    ? "flex"
                    : "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterInventories
        );

    }


    /* =====================================================
       EFFACER LA RECHERCHE
       ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                searchInput.value = "";

                filterInventories();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       ANIMATION DES CARTES
       ===================================================== */

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
