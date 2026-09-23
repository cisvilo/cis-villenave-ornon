document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       RECHERCHE
    ===================================================== */

    const searchInput = document.getElementById("ssuapSearch");
    const clearButton = document.getElementById("clearSearch");
    const resultText = document.getElementById("searchResult");
    const noResult = document.getElementById("noResult");

    const cards = document.querySelectorAll(".ssuap-card");


    function performSearch() {

        const search = searchInput.value
            .toLowerCase()
            .trim();

        let visibleCards = 0;


        cards.forEach(function (card) {

            const text = card.innerText.toLowerCase();

            const match = text.includes(search);


            if (match) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        /* Bouton effacer */

        if (search.length > 0) {

            clearButton.style.display = "flex";

        } else {

            clearButton.style.display = "none";

        }


        /* Résultats */

        if (search.length > 0) {

            resultText.textContent =
                visibleCards +
                " catégorie" +
                (visibleCards > 1 ? "s" : "") +
                " trouvée" +
                (visibleCards > 1 ? "s" : "");

        } else {

            resultText.textContent = "";

        }


        /* Aucun résultat */

        if (visibleCards === 0) {

            noResult.style.display = "block";

        } else {

            noResult.style.display = "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performSearch
        );

    }


    /* Effacer */

    if (clearButton) {

        clearButton.addEventListener("click", function () {

            searchInput.value = "";

            performSearch();

            searchInput.focus();

        });

    }


    /* =====================================================
       ANIMATION DES CARTES
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "card-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        cards.forEach(function (card) {

            observer.observe(card);

        });

    } else {

        cards.forEach(function (card) {

            card.classList.add(
                "card-visible"
            );

        });

    }


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                mainNav.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* =====================================================
       DROPDOWN INVENTAIRES
    ===================================================== */

    const dropdown =
        document.querySelector(".nav-dropdown");

    const dropdownButton =
        document.querySelector(
            ".nav-dropdown-button"
        );


    if (dropdown && dropdownButton) {

        dropdownButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                dropdown.classList.toggle(
                    "open"
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !dropdown.contains(
                        event.target
                    )
                ) {

                    dropdown.classList.remove(
                        "open"
                    );

                }

            }
        );

    }

});
