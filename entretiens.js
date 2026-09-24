
document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       MENU MOBILE
    ================================= */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNav = document.getElementById("mainNav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", function () {
            mainNav.classList.toggle("open");
        });

    }


    /* ================================
       MENU INVENTAIRES
    ================================= */

    const inventoryDropdown = document.getElementById("inventoryDropdown");
    const inventoryToggle = document.getElementById("inventoryToggle");

    if (inventoryDropdown && inventoryToggle) {

        inventoryToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            inventoryDropdown.classList.toggle("open");

        });

    }


    /* ================================
       LIENS DU MENU
    ================================= */

    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (mainNav) {
                mainNav.classList.remove("open");
            }

        });

    });


    /* ================================
       FERMETURE MENU EN DEHORS
    ================================= */

    document.addEventListener("click", function (event) {

        if (
            inventoryDropdown &&
            !inventoryDropdown.contains(event.target)
        ) {
            inventoryDropdown.classList.remove("open");
        }

    });


    /* ================================
       ESCAPE
    ================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (inventoryDropdown) {
                inventoryDropdown.classList.remove("open");
            }

            if (mainNav) {
                mainNav.classList.remove("open");
            }

        }

    });


    /* ================================
       REDIMENSIONNEMENT
    ================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 850 && mainNav) {
            mainNav.classList.remove("open");
        }

    });


    /* ================================
       RECHERCHE ENTRETIENS
    ================================= */

    const searchInput = document.getElementById("entretiensSearch");
    const cards = document.querySelectorAll(".entretien-card");
    const emptyState = document.getElementById("entretiensEmpty");
    const clearSearch = document.getElementById("clearSearch");


    if (searchInput && cards.length) {

        function normalizeText(text) {

            return text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        }


        function filterCards() {

            const searchValue = normalizeText(searchInput.value.trim());

            let visibleCards = 0;


            cards.forEach(function (card) {

                const searchableText = normalizeText(
                    card.dataset.search || card.textContent
                );

                const match =
                    searchValue === "" ||
                    searchableText.includes(searchValue);


                if (match) {

                    card.classList.remove("hidden");

                    card.style.transitionDelay =
                        (visibleCards * 0.03) + "s";

                    visibleCards++;

                } else {

                    card.classList.add("hidden");
                    card.style.transitionDelay = "0s";

                }

            });


            if (emptyState) {

                if (visibleCards === 0) {
                    emptyState.classList.add("visible");
                } else {
                    emptyState.classList.remove("visible");
                }

            }


            if (clearSearch) {

                if (searchInput.value.length > 0) {
                    clearSearch.classList.add("visible");
                } else {
                    clearSearch.classList.remove("visible");
                }

            }

        }


        searchInput.addEventListener("input", filterCards);


        if (clearSearch) {

            clearSearch.addEventListener("click", function () {

                searchInput.value = "";

                filterCards();

                searchInput.focus();

            });

        }

    }


    /* ================================
       ANIMATION DES CARTES
    ================================= */

    const entretienCards = document.querySelectorAll(".entretien-card");


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
                threshold: 0.08
            }
        );


        entretienCards.forEach(function (card) {
            observer.observe(card);
        });

    }

});

