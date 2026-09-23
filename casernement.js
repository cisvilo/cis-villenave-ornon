```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", () => {

            mainNav.classList.toggle("active");
            mobileToggle.classList.toggle("open");

        });

    }


    /* =====================================================
       MENU INVENTAIRES
       ===================================================== */

    const inventoryDropdown =
        document.getElementById("inventoryDropdown");

    const inventoryToggle =
        document.getElementById("inventoryToggle");

    if (inventoryToggle && inventoryDropdown) {

        inventoryToggle.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            inventoryDropdown.classList.toggle("open");

        });

        document.addEventListener("click", (event) => {

            if (!inventoryDropdown.contains(event.target)) {

                inventoryDropdown.classList.remove("open");

            }

        });

    }


    /* =====================================================
       RECHERCHE CASERNEMENT
       ===================================================== */

    const searchInput =
        document.getElementById("casernementSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const cards =
        document.querySelectorAll(".casernement-card");

    const noResult =
        document.getElementById("noResult");

    const searchResult =
        document.getElementById("searchResult");


    if (!searchInput) return;


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


        cards.forEach(card => {

            const cardText =
                normalize(
                    card.innerText +
                    " " +
                    Array.from(
                        card.querySelectorAll("[data-search]")
                    )
                    .map(element =>
                        element.dataset.search
                    )
                    .join(" ")
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


        if (query !== "") {

            searchResult.textContent =
                visibleCards === 0
                    ? ""
                    : `${visibleCards} résultat${visibleCards > 1 ? "s" : ""}`;

        } else {

            searchResult.textContent = "";

        }


        if (query !== "" && visibleCards === 0) {

            noResult.classList.add("show");

        } else {

            noResult.classList.remove("show");

        }

    }


    searchInput.addEventListener(
        "input",
        performSearch
    );


    if (clearSearch) {

        clearSearch.addEventListener("click", () => {

            searchInput.value = "";

            performSearch();

            searchInput.focus();

        });

    }


    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            searchInput.value = "";

            performSearch();

        }

    });

});
