export function buildElement(tag, props = {}) {
  const element = document.createElement(tag);

  const { text, class: className, dataset, ...attrs } = props;

  if (text != null) {
    element.textContent = String(text);
  }

  if (className) {
    element.className = className;
  }

  if (dataset) {
    Object.assign(element.dataset, dataset);
  }

  for (const [key, value] of Object.entries(attrs)) {
    if (value === false || value === null) {
      continue;
    }

    if (value === true) {
      element.setAttribute(key, "");
    } else {
      element.setAttribute(key, value);
    }
  }

  return element;
}
