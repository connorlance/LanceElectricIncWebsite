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

//Gallary slideshow
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".section5-item2-content");
  const slides = document.querySelectorAll(".section5-item2-content .slide");
  const totalSlides = slides.length;
  let currentIndex = 0;
  const autoSlideIntervalTime = 5000; // 5 seconds
  let autoSlideInterval;

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
      resetAutoSlide();
    }
  }

  function previousSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
      resetAutoSlide();
    }
  }

  function updateArrowVisibility() {
    const prevArrow = document.querySelector(".arrow-left");
    const nextArrow = document.querySelector(".arrow-right");

    // Disable or enable arrows based on the current index
    prevArrow.disabled = currentIndex === 0;
    nextArrow.disabled = currentIndex === totalSlides - 1;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideIntervalTime);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  function handleVisibility(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startAutoSlide();
      } else {
        clearInterval(autoSlideInterval);
      }
    });
  }

  const observer = new IntersectionObserver(handleVisibility, {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  // Observe the gallery container
  observer.observe(container);

  document.querySelector(".arrow-left").addEventListener("click", previousSlide);
  document.querySelector(".arrow-right").addEventListener("click", nextSlide);

  updateGallery(); // Initialize gallery position
});
