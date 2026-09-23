document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       MENU MOBILE ☰
    ================================= */

    const mobileToggle = document.querySelector(".mobile-toggle");
    const mainNav = document.querySelector("#mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            mobileToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            mobileToggle.classList.toggle("open", isOpen);

        });

    }


    /* ================================
       SOUS-MENU INVENTAIRES
    ================================= */

    const inventoryDropdown =
        document.querySelector(".nav-dropdown");

    const inventoryToggle =
        document.querySelector(".nav-dropdown-toggle");

    if (inventoryDropdown && inventoryToggle) {

        inventoryToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                inventoryDropdown.classList.toggle("open");

            inventoryToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* ================================
       FERMER LE MENU APRÈS UN CLIC
    ================================= */

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

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

        });

    });


    /* ================================
       FERMER APRÈS CHOIX DU SOUS-MENU
    ================================= */

    const submenuLinks =
        document.querySelectorAll(".nav-dropdown-menu a");

    submenuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

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
                mainNav.classList.remove("active");
            }

            if (mobileToggle) {
                mobileToggle.classList.remove("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* ================================
       ANIMATION DES CARTES
    ================================= */

    const cards =
        document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        cards.forEach(function (card) {
            observer.observe(card);
        });

    } else {

        cards.forEach(function (card) {
            card.classList.add("visible");
        });

    }

});
