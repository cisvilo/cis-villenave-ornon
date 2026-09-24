
document.addEventListener("DOMContentLoaded", () => {

  const mobileToggle = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");

  const inventoryToggle = document.getElementById("inventoryToggle");
  const inventoryDropdown = document.getElementById("inventoryDropdown");
  const navDropdown = inventoryToggle
    ? inventoryToggle.closest(".nav-dropdown")
    : null;


  /* =====================================================
     MENU MOBILE
     ===================================================== */

  if (mobileToggle && mainNav) {

    mobileToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = mainNav.classList.toggle("active");

      mobileToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });

  }


  /* =====================================================
     SOUS-MENU INVENTAIRES
     ===================================================== */

  if (inventoryToggle && navDropdown) {

    inventoryToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = navDropdown.classList.toggle("open");

      inventoryToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });

  }


  /* =====================================================
     FERMETURE EN CLIQUANT À L'EXTÉRIEUR
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
      mobileToggle.setAttribute("aria-expanded", "false");
    }


    if (
      navDropdown &&
      inventoryToggle &&
      navDropdown.classList.contains("open") &&
      !navDropdown.contains(event.target)
    ) {
      navDropdown.classList.remove("open");
      inventoryToggle.setAttribute("aria-expanded", "false");
    }

  });


  /* =====================================================
     TOUCHE ÉCHAP
     ===================================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      if (mainNav && mobileToggle) {
        mainNav.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }

      if (navDropdown && inventoryToggle) {
        navDropdown.classList.remove("open");
        inventoryToggle.setAttribute("aria-expanded", "false");
      }

    }

  });


  /* =====================================================
     FERMER LE MENU APRÈS CLIC SUR UN LIEN MOBILE
     ===================================================== */

  if (mainNav) {

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        if (window.innerWidth <= 900) {
          mainNav.classList.remove("active");

          if (mobileToggle) {
            mobileToggle.setAttribute("aria-expanded", "false");
          }
        }

      });

    });

  }

});
