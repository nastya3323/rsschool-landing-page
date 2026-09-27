import renderProductCard from "./components/productCard.js";
import { getProducts } from "./utils/api.js";
import { buildElement } from "./utils/dom.js";
import { filterByCategory } from "./utils/filter.js";

export default function initCatalog() {
  const grid = document.querySelector(".catalog__grid");
  const filterButtons = document.querySelectorAll(".filters__btn");

  if (!grid || filterButtons.length === 0) {
    return;
  }

  loadAndRender(grid, filterButtons);
}

async function loadAndRender(grid, filterButtons) {
  try {
    const products = await getProducts();

    let initialCategory = filterButtons[0].dataset.category;
    renderProducts(filterByCategory(products, initialCategory), grid);

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category;

        filterButtons.forEach((btn) => {
          const isActive = btn === button;
          btn.classList.toggle("filters__btn--active", isActive);
        });

        renderProducts(filterByCategory(products, category), grid);
      });
    });
  } catch (error) {
    console.warn(error);

    grid.replaceChildren();
    grid.append(
      buildElement("p", {
        class: "catalog__error",
        text: "Failed to load the catalog. Please try again later",
      })
    );
  }
}

function renderProducts(products, grid) {
  grid.replaceChildren();

  if (products.length === 0) {
    grid.append(
      buildElement("p", { class: "catalog__empty", text: "Nothing found" })
    );

    return;
  }

  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    fragment.append(renderProductCard(product));
  });

  grid.append(fragment);
}
