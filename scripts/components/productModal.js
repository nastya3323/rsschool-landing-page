import { buildElement } from "../utils/dom.js";

export function renderModal(product) {
  const overlay = buildElement("div", {
    class: "overlay",
  });

  const modal = buildElement("div", {
    class: "modal",
  });

  const modalImageContainer = buildElement("div", {
    class: "modal__image",
  });

  const modalImage = buildElement("img", {
    src: product.image,
    alt: "",
    width: 310,
    height: 310,
  });

  modalImageContainer.append(modalImage);

  const modalContent = buildElement("div", {
    class: "modal__content",
  });

  const modalHeader = buildElement("div", {
    class: "modal__header",
  });

  const modalTitle = buildElement("h2", {
    class: "modal__title",
    text: product.name,
  });

  const modalDescription = buildElement("p", {
    class: "modal__description",
    text: product.description,
  });

  modalHeader.append(modalTitle, modalDescription);

  const modalSizes = renderSizes(product);
  const modalAdditives = renderAdditives(product);

  const modalTotalContainer = buildElement("div", {
    class: "modal__total",
  });

  modalTotalContainer.append(
    buildElement("span", {
      class: "modal__total-label",
      text: "Total:",
    }),
    buildElement("span", {
      class: "modal__total-value",
      text: `$${product.price}`,
    })
  );

  const modalAlertContainer = buildElement("div", {
    class: "modal__alert",
  });

  const iconContainer = buildElement("span", {
    class: "modal__alert-icon",
  });

  iconContainer.innerHTML = `
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
  <path
    d="M8 7.66663V11"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M8 5.00667L8.00667 4.99926"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  </svg>`;

  const modalAlertText = buildElement("p", {
    class: "modal__alert-text",
    text: "The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.",
  });

  modalAlertContainer.append(iconContainer, modalAlertText);

  const closeButton = buildElement("button", {
    class: "modal__close",
    type: "button",
    text: "Close",
  });

  modalContent.append(
    modalHeader,
    modalSizes,
    modalAdditives,
    modalTotalContainer,
    modalAlertContainer,
    closeButton
  );

  modal.append(modalImageContainer, modalContent);
  overlay.append(modal);

  return overlay;
}

function renderSizes(product) {
  const wrapper = buildElement("div", { class: "modal__sizes sizes" });

  const wrapperTitle = buildElement("h3", {
    class: "sizes__title",
    text: "Size",
  });

  const options = buildElement("div", { class: "sizes__options" });

  let isFirst = true;

  for (const [key, value] of Object.entries(product.sizes)) {
    const button = buildElement("button", {
      class: `sizes__option${isFirst ? " is-active" : ""}`,
      type: "button",
      dataset: { key },
    });

    button.append(
      buildElement("span", { class: "sizes__label", text: key.toUpperCase() }),
      buildElement("span", { class: "sizes__value", text: value.size })
    );

    options.append(button);

    isFirst = false;
  }

  wrapper.append(wrapperTitle, options);
  return wrapper;
}

function renderAdditives(product) {
  const wrapper = buildElement("div", {
    class: "modal__additives additives",
  });

  const wrapperTitle = buildElement("h3", {
    class: "additives__title",
    text: "Additives",
  });

  const options = buildElement("div", {
    class: "additives__options",
  });

  product.additives.forEach((additive, index) => {
    const button = buildElement("button", {
      class: "additives__option",
      type: "button",
      dataset: { key: additive.name },
    });

    button.append(
      buildElement("span", {
        class: "additives__label",
        text: index + 1,
      }),
      buildElement("span", {
        class: "additives__name",
        text: additive.name,
      })
    );

    options.append(button);
  });

  wrapper.append(wrapperTitle, options);

  return wrapper;
}
