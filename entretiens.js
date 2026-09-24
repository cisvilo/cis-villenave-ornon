document.addEventListener("DOMContentLoaded", function () {

```
/* =====================================================
   MENU MOBILE
   ===================================================== */

const mobileToggle = document.getElementById("mobileToggle");
const mainNav = document.getElementById("mainNav");

if (mobileToggle && mainNav) {

    mobileToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = mainNav.classList.toggle("active");

        mobileToggle.classList.toggle("open", isOpen);

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

if (inventoryDropdown && inventoryToggle) {

    inventoryToggle.addEventListener("click", function (event) {

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
   FERMETURE DES MENUS
   ===================================================== */

document.addEventListener("click", function (event) {

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

});


/* =====================================================
   ESCAPE
   ===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
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


/* =====================================================
   RECHERCHE ENTRETIENS
   ===================================================== */

const searchInput =
    document.getElementById("entretiensSearch");

const clearSearch =
    document.getElementById("clearSearch");

const cards =
    document.querySelectorAll(".entretien-card");

const emptyMessage =
    document.getElementById("entretiensEmpty");

const searchResult =
    document.getElementById("entretiensSearchResult");


function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


function filterCards() {

    if (!searchInput) {
        return;
    }

    const query =
        normalizeText(searchInput.value.trim());

    let visibleCount = 0;


    cards.forEach(function (card) {

        const searchData =
            normalizeText(
                card.dataset.search || ""
            );

        const cardText =
            normalizeText(
                card.textContent || ""
            );

        const matches =
            query === "" ||
            searchData.includes(query) ||
            cardText.includes(query);


        card.style.display =
            matches ? "" : "none";


        if (matches) {
            visibleCount++;
        }

    });


    if (searchResult) {

        if (query === "") {
            searchResult.textContent = "";
        } else if (visibleCount > 0) {
            searchResult.textContent =
                visibleCount +
                " résultat" +
                (visibleCount > 1 ? "s" : "");
        } else {
            searchResult.textContent = "";
        }
    }


    if (emptyMessage) {

        emptyMessage.classList.toggle(
            "visible",
            query !== "" && visibleCount === 0
        );

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterCards
    );

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                searchInput.value = "";

                filterCards();

                searchInput.focus();
            }

        }
    );
}


if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        function () {

            if (!searchInput) {
                return;
            }

            searchInput.value = "";

            filterCards();

            searchInput.focus();

        }
    );
}


/* =====================================================
   REDIMENSIONNEMENT
   ===================================================== */

window.addEventListener("resize", function () {

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

});
```

});

