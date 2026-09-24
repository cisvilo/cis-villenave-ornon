document.addEventListener("DOMContentLoaded", () => {

```
/* =====================================================
   MENU MOBILE
   ===================================================== */

const mobileToggle =
    document.getElementById("mobileToggle");

const mainNav =
    document.getElementById("mainNav");

if (mobileToggle && mainNav) {

    mobileToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            mainNav.classList.toggle("active");

        mobileToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


/* =====================================================
   MENU INVENTAIRES
   ===================================================== */

const inventoryToggle =
    document.getElementById("inventoryToggle");

const inventoryDropdown =
    document.getElementById("inventoryDropdown");

if (inventoryToggle && inventoryDropdown) {

    inventoryToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            inventoryDropdown.classList.toggle("open");

        inventoryToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


/* =====================================================
   CLIC À L'EXTÉRIEUR
   ===================================================== */

document.addEventListener("click", (event) => {

    if (
        mainNav &&
        mobileToggle &&
        mainNav.classList.contains("active") &&
        !mainNav.contains(event.target) &&
        !mobileToggle.contains(event.target)
    ) {

        mainNav.classList.remove("active");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (
        inventoryDropdown &&
        inventoryToggle &&
        inventoryDropdown.classList.contains("open") &&
        !inventoryDropdown.contains(event.target)
    ) {

        inventoryDropdown.classList.remove("open");

        inventoryToggle.setAttribute(
            "aria-expanded",
            "false"
        );

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

const searchResult =
    document.getElementById("searchResult");

const noResult =
    document.getElementById("noResult");


if (searchInput) {

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

            const searchableText =
                normalize(
                    card.innerText +
                    " " +
                    (card.dataset.search || "")
                );


            const match =
                query === "" ||
                searchableText.includes(query);


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


        if (
            query !== "" &&
            visibleCards === 0
        ) {

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

}


/* =====================================================
   FERMER LE MENU APRÈS UN CLIC
   ===================================================== */

if (mainNav) {

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 900) {

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
   TOUCHE ESCAPE
   ===================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }


    if (mainNav && mobileToggle) {

        mainNav.classList.remove("active");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (
        inventoryDropdown &&
        inventoryToggle
    ) {

        inventoryDropdown.classList.remove("open");

        inventoryToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


});

