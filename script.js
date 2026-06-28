const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);

const animateCounter = (element) => {
  const target = Number(element.dataset.count);
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const duration = 1300;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * eased);
    element.textContent = `${prefix}${formatNumber(current)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = `${prefix}${formatNumber(target)}${suffix}`;
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

document.querySelectorAll("[data-count]").forEach((counter) => {
  counterObserver.observe(counter);
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const note = event.currentTarget.querySelector(".form-note");
  note.textContent = "Thanks. Your message is ready to connect with the Project Fresh team.";
  event.currentTarget.reset();
});
