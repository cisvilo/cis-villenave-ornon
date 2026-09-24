document.addEventListener("DOMContentLoaded", function () {

```
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

            mainNav.classList.remove("active");

            mobileToggle.classList.remove("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


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


    /* =================================================
       NOMBRE DE RÉSULTATS
       ================================================= */

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


    /* =================================================
       AUCUN RÉSULTAT
       ================================================= */

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
   ESCAPE — FERMETURE DES MENUS
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

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

    }
);


/* =====================================================
   REDIMENSIONNEMENT
   ===================================================== */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 900 &&
            mainNav &&
            mobileToggle
        ) {

            mainNav.classList.remove("active");

            mobileToggle.classList.remove("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =====================================================
   INITIALISATION
   ===================================================== */

performSearch();
```

});


