document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
  
    // Toggle menu visibility
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  
    // Close menu when a navigation link is clicked
    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("active");
      }
    });
  });
  