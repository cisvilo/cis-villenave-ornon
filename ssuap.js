document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MENU MOBILE
     ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("mobile-open");
    });

  }


  /* =====================================================
     DROPDOWN INVENTAIRES
     ===================================================== */

  const dropdownButton =
    document.querySelector(".nav-dropdown-button");

  const dropdown =
    document.querySelector(".nav-dropdown");

  if (dropdownButton && dropdown) {

    dropdownButton.addEventListener("click", (event) => {

      event.preventDefault();

      dropdown.classList.toggle("open");

    });

  }


  /* =====================================================
     FERMETURE DU DROPDOWN EN CLIQUANT AILLEURS
     ===================================================== */

  document.addEventListener("click", (event) => {

    if (
      dropdown &&
      !dropdown.contains(event.target)
    ) {

      dropdown.classList.remove("open");

    }

  });


  /* =====================================================
     FERMETURE MENU MOBILE
     ===================================================== */

  document.querySelectorAll(".main-nav a").forEach(link => {

    link.addEventListener("click", () => {

      if (mainNav) {
        mainNav.classList.remove("mobile-open");
      }

    });

  });


  /* =====================================================
     ANIMATION DES CARTES
     ===================================================== */

  const cards =
    document.querySelectorAll(".ssuap-card");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("ssuap-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );

    cards.forEach(card => {

      card.classList.add("ssuap-hidden");

      observer.observe(card);

    });

  }

});
