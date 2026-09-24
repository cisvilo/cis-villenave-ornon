
document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     MENU MOBILE
     ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      mainNav.classList.toggle("active");
    });

  }


  /* =====================================================
     DROPDOWN INVENTAIRES
     ===================================================== */

  const inventoryDropdown =
    document.getElementById("inventoryDropdown");

  const dropdownToggle =
    inventoryDropdown
      ? inventoryDropdown.querySelector(".nav-dropdown-toggle")
      : null;

  if (dropdownToggle && inventoryDropdown) {

    dropdownToggle.addEventListener("click", function (event) {

      event.stopPropagation();

      inventoryDropdown.classList.toggle("open");

    });

  }


  /* =====================================================
     FERMETURE DES MENUS EN CLIQUANT AILLEURS
     ===================================================== */

  document.addEventListener("click", function (event) {

    if (
      inventoryDropdown &&
      !inventoryDropdown.contains(event.target)
    ) {
      inventoryDropdown.classList.remove("open");
    }

  });


  /* =====================================================
     RECHERCHE
     ===================================================== */

  const searchInput =
    document.getElementById("raccourcisSearch");

  const clearSearch =
    document.getElementById("clearSearch");

  const searchResult =
    document.getElementById("searchResult");

  const raccourcisGrid =
    document.getElementById("raccourcisGrid");

  const noResult =
    document.getElementById("noResult");

  const countElement =
    document.getElementById("raccourcisCount");

  const cards =
    raccourcisGrid
      ? Array.from(
          raccourcisGrid.querySelectorAll(".raccourcis-card")
        )
      : [];


  function normalizeText(text) {

    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  }


  function performSearch() {

    if (!searchInput) {
      return;
    }

    const query =
      normalizeText(searchInput.value.trim());

    let visibleCount = 0;

    cards.forEach(function (card) {

      const name =
        normalizeText(card.dataset.name || "");

      const description =
        normalizeText(card.dataset.description || "");

      const content =
        normalizeText(card.textContent || "");

      const matches =
        query === "" ||
        name.includes(query) ||
        description.includes(query) ||
        content.includes(query);

      if (matches) {

        card.style.display = "";

        visibleCount++;

      } else {

        card.style.display = "none";

      }

    });


    if (countElement) {
      countElement.textContent = visibleCount;
    }


    if (searchResult) {

      if (query === "") {

        searchResult.textContent = "";

      } else if (visibleCount === 0) {

        searchResult.textContent =
          "Aucun service ne correspond à votre recherche.";

      } else if (visibleCount === 1) {

        searchResult.textContent =
          "1 service trouvé.";

      } else {

        searchResult.textContent =
          visibleCount + " services trouvés.";

      }

    }


    if (noResult) {

      if (visibleCount === 0) {
        noResult.classList.add("visible");
      } else {
        noResult.classList.remove("visible");
      }

    }


    if (clearSearch) {

      if (searchInput.value.trim() !== "") {
        clearSearch.classList.add("visible");
      } else {
        clearSearch.classList.remove("visible");
      }

    }

  }


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      performSearch
    );

  }


  if (clearSearch) {

    clearSearch.addEventListener("click", function () {

      searchInput.value = "";

      searchInput.focus();

      performSearch();

    });

  }


  document.addEventListener("keydown", function (event) {

    if (
      event.key === "Escape" &&
      searchInput &&
      searchInput.value !== ""
    ) {

      searchInput.value = "";

      performSearch();

    }

  });


  /* =====================================================
     FERMETURE DU MENU MOBILE APRÈS UN CLIC
     ===================================================== */

  if (mainNav) {

    mainNav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        if (window.innerWidth <= 900) {
          mainNav.classList.remove("active");
        }

      });

    });

  }


  /* =====================================================
     RESIZE
     ===================================================== */

  window.addEventListener("resize", function () {

    if (window.innerWidth > 900 && mainNav) {

      mainNav.classList.remove("active");

    }

  });


  /* =====================================================
     INITIALISATION
     ===================================================== */

  performSearch();

});
