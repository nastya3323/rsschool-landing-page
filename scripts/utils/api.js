export async function getProducts() {
  const response = await fetch("./data/products.json");

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  return response.json();
}
