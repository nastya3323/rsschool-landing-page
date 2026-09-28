import renderProductCard from "./components/productCard.js";
import { getProducts } from "./utils/api.js";
import { buildElement } from "./utils/dom.js";
import { filterByCategory } from "./utils/filter.js";

const VISIBLE_ON_MOBILE = 4;
const MOBILE_QUERY = "(max-width: 48.05em)";

export default function initCatalog() {
  const grid = document.querySelector(".catalog__grid");
  const filterButtons = document.querySelectorAll(".filters__btn");
  const showMoreContainer = document.querySelector(".catalog__show-more");
  const showMoreButton = document.querySelector(".catalog__show-more-btn");
  const mq = window.matchMedia(MOBILE_QUERY);

  if (
    !grid ||
    filterButtons.length === 0 ||
    !showMoreContainer ||
    !showMoreButton
  ) {
    return;
  }

  loadAndRender(grid, filterButtons, mq, showMoreContainer);

  showMoreButton.addEventListener("click", () => {
    grid.classList.add("is-expanded");
    updateShowMoreButton(grid, mq, showMoreContainer);
  });

  mq.addEventListener("change", () => {
    updateShowMoreButton(grid, mq, showMoreContainer);
  });
}

async function loadAndRender(grid, filterButtons, mq, showMoreContainer) {
  try {
    const products = await getProducts();

    function applyFilter(category, button) {
      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("filters__btn--active", isActive);
      });

      renderProducts(filterByCategory(products, category), grid);
      grid.classList.remove("is-expanded");
      updateShowMoreButton(grid, mq, showMoreContainer);
    }

    const firstButton = filterButtons[0];
    applyFilter(firstButton.dataset.category, firstButton);

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category;
        applyFilter(category, button);
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

function updateShowMoreButton(grid, mq, showMoreContainer) {
  const cards = grid.children;
  const expanded = grid.classList.contains("is-expanded");
  const shouldShow =
    cards.length > VISIBLE_ON_MOBILE && mq.matches && !expanded;

  showMoreContainer.classList.toggle("is-hidden", !shouldShow);
}
