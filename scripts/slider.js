export default function initSlider() {
  const prevBtn = document.querySelector(".slider__prev-btn");
  const nextBtn = document.querySelector(".slider__next-btn");
  const sliderControls = document.querySelectorAll(".slider__control");

  const sliderTrack = document.querySelector(".slider__track");

  if (!prevBtn || !nextBtn || !sliderTrack) {
    return;
  }

  const sliders = sliderTrack.children.length;

  if (sliders === 0) {
    return;
  }

  let index = 0;

  function goTo(i) {
    index = (i + sliders) % sliders;

    sliderTrack.style.transform = `translateX(-${index * 100}%)`;

    sliderControls.forEach((control, controlIndex) => {
      control.classList.toggle(
        "slider__control--active",
        index === controlIndex
      );
    });
  }

  nextBtn.addEventListener("click", () => {
    goTo(index + 1);
  });

  prevBtn.addEventListener("click", () => {
    goTo(index - 1);
  });
}
