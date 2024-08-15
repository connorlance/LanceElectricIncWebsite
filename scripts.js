const toggleButton = document.querySelector(".toggle-button");
const navbarLinks = document.querySelector(".navbar-links");

// Toggle the navbar and toggle button styles on button click
toggleButton.addEventListener("click", (event) => {
  event.preventDefault();
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
});

// Close the navbar when any link inside navbar-links is clicked
navbarLinks.addEventListener("click", () => {
  navbarLinks.classList.remove("active");
  toggleButton.classList.remove("active");
});

// Adjust scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const additionalOffset = 75;

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - additionalOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Element with ID ${targetId} not found.`);
    }
  });
});

// Gallery slideshow
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".section5-item2-content");
  const slides = document.querySelectorAll(".section5-item2-content .slide");
  const totalSlides = slides.length;
  let currentIndex = 0;

  function updateGallery() {
    const slideWidth = 100 / totalSlides;
    container.style.transform = `translateX(${-currentIndex * slideWidth}%)`;

    // Update arrow visibility
    updateArrowVisibility();
  }

  function goToSlide(index) {
    // Prevent index from going out of bounds
    if (index >= totalSlides || index < 0) return;

    currentIndex = index;
    updateGallery();
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  }

  function previousSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  function updateArrowVisibility() {
    const prevArrow = document.querySelector(".arrow-left");
    const nextArrow = document.querySelector(".arrow-right");

    // Disable or enable arrows based on the current index
    prevArrow.disabled = currentIndex === 0;
    nextArrow.disabled = currentIndex === totalSlides - 1;
  }

  document.querySelector(".arrow-left").addEventListener("click", previousSlide);
  document.querySelector(".arrow-right").addEventListener("click", nextSlide);

  updateGallery(); // Initialize gallery position
});
