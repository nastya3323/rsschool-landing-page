const MOBILE_QUERY = "(max-width: 48.05em)";

export default function initBurger() {
  const mq = window.matchMedia(MOBILE_QUERY);
  const burger = document.querySelector(".burger-menu");
  const menuLinks = document.querySelectorAll(".menu__link");

  if (!burger) {
    return;
  }

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger-menu--open");
    document.body.classList.toggle("no-scroll");
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      document.body.classList.contains("no-scroll")
    ) {
      closeMenu();
      burger.focus();
    }
  });

  mq.addEventListener("change", () => {
    if (!mq.matches) {
      closeMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  function closeMenu() {
    if (burger.classList.contains("burger-menu--open")) {
      burger.classList.remove("burger-menu--open");
      document.body.classList.remove("no-scroll");
    }
  }
}
