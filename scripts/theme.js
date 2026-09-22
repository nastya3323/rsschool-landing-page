export default function initTheme() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    root.dataset.theme = savedTheme;
  }

  const themeToggleButton = document.querySelector(".theme-switch");

  if (!themeToggleButton) {
    return;
  }

  themeToggleButton.addEventListener("click", () => {
    const theme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  });
}
