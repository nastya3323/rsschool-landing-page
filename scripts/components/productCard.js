import { buildElement } from "../utils/dom.js";

export default function renderProductCard(product) {
  const article = buildElement("article", {
    class: "product-card",
    dataset: { category: product.category, productId: product.id },
  });

  const imageContainer = buildElement("div", {
    class: "product-card__image",
  });

  const productCardImage = buildElement("img", {
    src: product.image,
    width: 310,
    height: 310,
    loading: "lazy",
  });

  imageContainer.append(productCardImage);

  const productCardBody = buildElement("div", {
    class: "product-card__body",
  });

  const title = buildElement("h3", {
    class: "product-card__name",
  });

  const triggerButton = buildElement("button", {
    class: "product-card__trigger",
    type: "button",
    text: product.name,
  });

  title.append(triggerButton);

  const description = buildElement("p", {
    class: "product-card__description",
    text: product.description,
  });

  const price = buildElement("p", {
    class: "product-card__price",
    text: `$${product.price}`,
  });

  productCardBody.append(title, description, price);
  article.append(imageContainer, productCardBody);

  return article;
}
