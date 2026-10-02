import { renderModal } from "./components/productModal.js";

export function openModal(product) {
  const overlay = renderModal(product);
  const opener = document.activeElement;
  let isClosing = false;

  document.body.append(overlay);
  document.body.classList.add("no-scroll");

  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
  });

  const closeButton = overlay.querySelector(".modal__close");

  function handleBackdropClick(event) {
    if (event.target === overlay) {
      closeModal();
    }
  }

  function handleEscape(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function closeModal() {
    if (isClosing) {
      return;
    }

    isClosing = true;

    overlay.classList.remove("is-open");

    overlay.addEventListener("transitionend", function onEnd(event) {
      if (event.target !== overlay || event.propertyName !== "opacity") {
        return;
      }

      overlay.removeEventListener("transitionend", onEnd);
      overlay.remove();

      if (opener) {
        opener.focus({ preventScroll: true });
      }
    });

    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", handleEscape);
  }

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleEscape);

  initModalControls(overlay, product);
}

function initModalControls(modal, product) {
  const sizesOptions = modal.querySelectorAll(".sizes__option ");
  const additivesOptions = modal.querySelectorAll(".additives__option");
  const totalValue = modal.querySelector(".modal__total-value");

  let selectedSize = Object.keys(product.sizes)[0];
  let selectedAdditives = new Set();

  sizesOptions.forEach((button) => {
    button.addEventListener("click", () => {
      toggleActiveSize(button);
      selectedSize = button.dataset.key;

      recalculate();
    });
  });

  additivesOptions.forEach((additive) => {
    additive.addEventListener("click", () => {
      const key = additive.dataset.key;

      if (!key) {
        return;
      }

      if (selectedAdditives.has(key)) {
        selectedAdditives.delete(key);
      } else {
        selectedAdditives.add(key);
      }

      additive.classList.toggle("is-active", selectedAdditives.has(key));

      recalculate();
    });
  });

  function toggleActiveSize(selectedButton) {
    sizesOptions.forEach((button) => {
      const isActive = button === selectedButton;
      button.classList.toggle("is-active", isActive);
    });
  }

  function recalculate() {
    let total = Number(product.price);

    const size = product.sizes[selectedSize];

    if (size) {
      total += Number(size.addPrice);
    }

    for (const key of selectedAdditives) {
      const additive = product.additives.find((item) => {
        return item.name === key;
      });

      if (additive) {
        total += Number(additive.addPrice);
      }
    }

    totalValue.textContent = `$${total.toFixed(2)}`;
  }

  recalculate();
}
