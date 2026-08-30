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

/* Live GitHub star counts. Elements carry a static "last known" count as markup (so the page
   is correct even with JS off or the API unreachable); this replaces it with the live number,
   cached per tab session so hopping between the 7 pages doesn't refetch every repo every time. */
(() => {
  const starEls = Array.from(document.querySelectorAll("[data-repo-stars]"));

  if (!starEls.length) {
    return;
  }

  const CACHE_TTL_MS = 60 * 60 * 1000;

  const formatStars = (count) => `★ ${count.toLocaleString()} star${count === 1 ? "" : "s"}`;

  const readCache = (repo) => {
    try {
      const raw = sessionStorage.getItem(`gh_stars:${repo}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
      return parsed.count;
    } catch {
      return null;
    }
  };

  const writeCache = (repo, count) => {
    try {
      sessionStorage.setItem(`gh_stars:${repo}`, JSON.stringify({ count, fetchedAt: Date.now() }));
    } catch {
      // sessionStorage unavailable (private mode, quota) - live count still applied to the page,
      // just not cached for the next navigation.
    }
  };

  starEls.forEach((el) => {
    const repo = el.dataset.repoStars;

    const cached = readCache(repo);
    if (cached !== null) {
      el.textContent = formatStars(cached);
      return;
    }

    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || typeof data.stargazers_count !== "number") {
          return;
        }
        el.textContent = formatStars(data.stargazers_count);
        writeCache(repo, data.stargazers_count);
      })
      .catch(() => {
        // Offline or rate-limited - leave the static fallback count already in the markup.
      });
  });
})();
