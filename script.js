const toggleButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const yearEl = document.getElementById("year");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const setupTabs = document.querySelectorAll(".setup-tab");
const setupPanels = document.querySelectorAll(".setup-panel");
const copyButton = document.querySelector(".copy-btn");
const tiltCard = document.querySelector("[data-tilt]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (toggleButton && nav) {
  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const show = selected === "all" || selected === category;
        card.classList.toggle("hide", !show);
      });
    });
  });
}

if (setupTabs.length > 0) {
  setupTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.dataset.tab;

      setupTabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      setupPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === selected);
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
    });
  });
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const value = copyButton.dataset.copy;
    const defaultText = "Salin Nomor HP";
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      copyButton.textContent = "Nomor Tersalin";
      setTimeout(() => {
        copyButton.textContent = defaultText;
      }, 1200);
    } catch {
      copyButton.textContent = "Gagal Menyalin";
      setTimeout(() => {
        copyButton.textContent = defaultText;
      }, 1200);
    }
  });
}

if (tiltCard) {
  tiltCard.addEventListener("mousemove", (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    tiltCard.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
  observer.observe(item);
});
