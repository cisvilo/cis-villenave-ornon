
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

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


    /* =====================================================
       RECHERCHE ENTRETIENS
       ===================================================== */

    const searchInput =
        document.getElementById("searchInput");

    const cards =
        document.querySelectorAll(".entretiens-card");

    const resultsCount =
        document.getElementById("resultsCount");

    const noResult =
        document.getElementById("noResult");


    function updateResults() {

        const search =
            searchInput.value.trim().toLowerCase();

        let visibleCards = 0;

        cards.forEach(function (card) {

            const name =
                card.querySelector("h3").textContent.toLowerCase();

            if (name.includes(search)) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCards === 0) {

            noResult.style.display = "block";

        } else {

            noResult.style.display = "none";

        }


        if (visibleCards === 1) {

            resultsCount.textContent =
                "1 entretien trouvé";

        } else {

            resultsCount.textContent =
                visibleCards + " entretiens trouvés";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            updateResults
        );

    }


    /* =====================================================
       FERMETURE DU MENU INVENTAIRES
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

    });

});
