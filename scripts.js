/* ################################### */
/* #              NAVBAR             # */
/* ################################### */
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
