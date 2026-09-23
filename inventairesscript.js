```javascript
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
       MENU INVENTAIRES
       ===================================================== */

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");

    const inventoryToggle =
        document.getElementById("inventoryToggle");


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
       FERMER LE MENU INVENTAIRES
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


    /* =====================================================
       SOUS-MENU INVENTAIRES
       ===================================================== */

    document
        .querySelectorAll(
            ".nav-dropdown-menu a"
        )
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

            if (window.innerWidth > 850) {

                closeMobileMenu();

            }

        }
    );
```

### `script.js` — PARTIE 2/2

```javascript
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

    const empty =
        document.getElementById(
            "inventoryEmpty"
        );


    if (
        searchInput &&
        cards.length
    ) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    this.value
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(
                            /[\u0300-\u036f]/g,
                            ""
                        )
                        .trim();


                let found = 0;


                cards.forEach(
                    function (card) {

                        const content =
                            (
                                card.dataset.search || ""
                            )
                            +
                            " "
                            +
                            card.textContent;


                        const normalized =
                            content
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(
                                    /[\u0300-\u036f]/g,
                                    ""
                                );


                        if (
                            normalized.includes(search)
                        ) {

                            card.style.display =
                                "flex";

                            found++;

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );


                if (empty) {

                    empty.style.display =
                        found === 0
                            ? "block"
                            : "none";

                }

            }
        );

    }

});
```javascript
    /* =====================================================
       RECHERCHE INVENTAIRES
       ===================================================== */

    const searchInput =
        document.getElementById("inventorySearch");

    const cards =
        document.querySelectorAll(".inventory-card");

    const empty =
        document.getElementById("inventoryEmpty");


    if (searchInput && cards.length) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    this.value
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(
                            /[\u0300-\u036f]/g,
                            ""
                        )
                        .trim();


                let found = 0;


                cards.forEach(function (card) {

                    const content =
                        (
                            card.dataset.search || ""
                        )
                        + " " +
                        card.textContent;


                    const normalized =
                        content
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(
                                /[\u0300-\u036f]/g,
                                ""
                            );


                    if (
                        normalized.includes(search)
                    ) {

                        card.style.display = "flex";

                        found++;

                    } else {

                        card.style.display = "none";

                    }

                });


                if (empty) {

                    empty.style.display =
                        found === 0
                            ? "block"
                            : "none";

                }

            }
        );

    }

});



