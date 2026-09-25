export default function initTheme() {
  const root = document.documentElement;

  const themeToggleButton = document.querySelector(".theme-switch");

  if (!themeToggleButton) {
    return;
  }

  themeToggleButton.addEventListener("click", () => {
    const theme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = theme;

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  });
}
