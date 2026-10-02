export function filterByCategory(products, category) {
  return products.filter((product) => {
    return product.category === category;
  });
}
