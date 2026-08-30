(() => {
  const mobileMenus = Array.from(document.querySelectorAll(".mobile-site-menu"));

  if (!mobileMenus.length) {
    return;
  }

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    mobileMenus.forEach((menu) => {
      if (!menu.open) {
        return;
      }

      const clickedSummary = target.closest(".mobile-site-menu > summary");
      const clickedLinks = target.closest(".mobile-menu-links");

      if (clickedSummary || clickedLinks) {
        return;
      }

      menu.open = false;
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    mobileMenus.forEach((menu) => {
      menu.open = false;
    });
  });
})();
