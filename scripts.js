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

document.addEventListener("DOMContentLoaded", function () {
  const desktopSlidesContainer = document.querySelector("#desktop-slides");
  const mobileSlidesContainer = document.querySelector("#mobile-slides");
  const slideContainers = [desktopSlidesContainer, mobileSlidesContainer];
  let currentIndex = 0;
  let totalSlides = 0;

  // Lightbox elements
  const slides = document.querySelectorAll(".section5-item2-content .slide img");
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const closeModal = document.querySelector(".close");

  function updateSlideContainers() {
    slideContainers.forEach((container) => {
      if (window.innerWidth < 920) {
        if (container === mobileSlidesContainer) {
          container.style.display = "flex";
          totalSlides = mobileSlidesContainer.querySelectorAll(".slide").length;
        } else {
          container.style.display = "none";
        }
      } else {
        if (container === desktopSlidesContainer) {
          container.style.display = "flex";
          totalSlides = desktopSlidesContainer.querySelectorAll(".slide").length;
        } else {
          container.style.display = "none";
        }
      }
    });
  }

  function updateGallery() {
    const slideWidth = 100; // Slide width as percentage
    const container = window.innerWidth < 920 ? mobileSlidesContainer : desktopSlidesContainer;
    container.style.transform = `translateX(${-currentIndex * slideWidth}%)`;
    updateArrowVisibility();
  }

  function goToSlide(index) {
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
    prevArrow.disabled = currentIndex === 0;
    nextArrow.disabled = currentIndex === totalSlides - 1;
  }

  // Event listeners for gallery arrows
  document.querySelector(".arrow-left").addEventListener("click", previousSlide);
  document.querySelector(".arrow-right").addEventListener("click", nextSlide);

  updateSlideContainers();
  updateGallery(); // Initialize gallery position

  // Lightbox functionality
  slides.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Handle resizing
  window.addEventListener("resize", function () {
    updateSlideContainers();
    updateGallery();
  });
});
