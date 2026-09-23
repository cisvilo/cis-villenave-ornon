```javascript
/* =========================================================
   INCENDIE — CIS VILLENAVE-D'ORNON
   Menu + recherche
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

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

    const inventoryMenu =
        document.getElementById("inventoryMenu");

    if (
        inventoryDropdown &&
        inventoryToggle &&
        inventoryMenu
    ) {

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
       RECHERCHE
       ===================================================== */

    const searchInput =
        document.getElementById("incendieSearch");

    const clearButton =
        document.getElementById("clearSearch");

    const cards =
        document.querySelectorAll(".incendie-card");

    const searchResult =
        document.getElementById("searchResult");

    const noResult =
        document.getElementById("noResult");


    function normalize(text) {

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
            normalize(searchInput.value);

        let visibleCards = 0;


        cards.forEach((card) => {

            const searchableText =
                normalize(
                    card.innerText +
                    " " +
                    (card.dataset.search || "")
                );

            const match =
                query === "" ||
                searchableText.includes(query);


            if (match) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        if (noResult) {

            noResult.style.display =
                visibleCards === 0
                    ? "block"
                    : "none";

        }


        if (searchResult) {

            if (query === "") {

                searchResult.textContent = "";

            } else if (visibleCards === 1) {

                searchResult.textContent =
                    "1 résultat trouvé";

            } else {

                searchResult.textContent =
                    visibleCards + " résultats trouvés";

            }

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performSearch
        );

    }


    /* =====================================================
       EFFACER LA RECHERCHE
       ===================================================== */

    if (clearButton && searchInput) {

        clearButton.addEventListener("click", () => {

            searchInput.value = "";

            performSearch();

            searchInput.focus();

        });

    }


    /* =====================================================
       ESCAPE
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                searchInput.value = "";

                performSearch();

                searchInput.blur();

            }

        });

    }


});
