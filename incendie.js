document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MENU MOBILE
  ========================= */

  const mobileToggle = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");

  if (mobileToggle && mainNav) {

    mobileToggle.addEventListener("click", function () {

      const isOpen = mainNav.classList.toggle("open");

      mobileToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });

  }


  /* =========================
     MENU INVENTAIRES
  ========================= */

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

    document.addEventListener("click", function (event) {

      if (!inventoryDropdown.contains(event.target)) {

        inventoryDropdown.classList.remove("open");

        inventoryToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =========================
     RECHERCHE
  ========================= */

  const searchInput =
    document.getElementById("incendieSearch");

  const clearSearch =
    document.getElementById("clearSearch");

  const searchResult =
    document.getElementById("searchResult");

  const cards =
    document.querySelectorAll(".incendie-card");

  const noResult =
    document.getElementById("noResult");


  function normalize(text) {

    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  }


  function filterCards() {

    if (!searchInput) return;

    const query =
      normalize(searchInput.value.trim());

    let visibleCards = 0;


    cards.forEach(function (card) {

      const content = normalize(
        card.textContent +
        " " +
        (card.dataset.search || "")
      );

      const match =
        query === "" ||
        content.includes(query);

      card.style.display =
        match ? "" : "none";

      if (match) {
        visibleCards++;
      }

    });


    if (noResult) {

      noResult.classList.toggle(
        "show",
        visibleCards === 0
      );

    }


    if (searchResult) {

      if (query === "") {

        searchResult.textContent = "";

      } else {

        searchResult.textContent =
          visibleCards +
          (
            visibleCards > 1
              ? " véhicules trouvés"
              : " véhicule trouvé"
          );

      }

    }

  }


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      filterCards
    );

  }


  if (clearSearch) {

    clearSearch.addEventListener(
      "click",
      function () {

        if (!searchInput) return;

        searchInput.value = "";

        filterCards();

        searchInput.focus();

      }
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        searchInput
      ) {

        searchInput.value = "";

        filterCards();

      }

    }
  );

});
