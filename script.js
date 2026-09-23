document.addEventListener("DOMContentLoaded", function () {

    // Animation des cartes à l'apparition
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    cards.forEach(function (card) {
        observer.observe(card);
    });


    // Fermer le menu mobile après un clic
    const links = document.querySelectorAll(".nav a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {

            const nav = document.querySelector(".nav");

            if (nav) {
                nav.classList.remove("active");
            }

        });
    });

});
