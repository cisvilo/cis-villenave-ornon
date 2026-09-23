/* =========================================================
   CIS VILLENAVE-D'ORNON
   JAVASCRIPT GLOBAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ÉLÉMENTS
       ===================================================== */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mainNav =
        document.getElementById("mainNav");

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");

    const inventoryToggle =
        document.getElementById("inventoryToggle");

    const inventoryMenu =
        document.getElementById("inventoryMenu");


    /* =====================================================
       OUVRIR / FERMER LE MENU MOBILE
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
                    isOpen
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /* =====================================================
       INVENTAIRES
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
                    isOpen
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /* =====================================================
       LIENS PRINCIPAUX
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


    /* =====================================================
       LIENS DU SOUS-MENU
       ===================================================== */

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
       FERMER LE MENU
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
       FERMER INVENTAIRES
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
       ESCAPE = FERMER
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
       ANIMATION DES CARTES
       ===================================================== */

    const cards =
        document.querySelectorAll(
            ".card"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                function (
                    entries
                ) {

                    entries.forEach(
                        function (
                            entry
                        ) {

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
                    threshold: 0.12
                }
            );


        cards.forEach(
            function (card) {

                observer.observe(
                    card
                );

            }
        );

    }


});
