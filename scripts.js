document.getElementById("searchBtn").addEventListener("click", function () {
  const query = document.getElementById("query").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.recipes.length === 0) {
        resultsDiv.innerHTML = "<p>No recipes found.</p>";
        return;
      }

      data.recipes.forEach((recipe) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
                  <h3>${recipe.title}</h3>
                  <p>Source: <a href="${recipe.source_url}" target="_blank">View Recipe</a></p>
                  <img src="${recipe.image_url}" alt="${recipe.title}" style="width:100px;height:auto;">
              `;
        resultsDiv.appendChild(recipeDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      resultsDiv.innerHTML = "<p>Error fetching recipes. Please try again.</p>";
    });
});

// Smooth Scroll Functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Text Animation on Scroll
const aboutSection = document.getElementById("about");
const options = {
  root: null,
  threshold: 0.1,
};

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      aboutSection.classList.add("visible");
    }
  });
};

const observer = new IntersectionObserver(callback, options);
observer.observe(aboutSection);

// Image Modal Functionality
const img = document.getElementById("about-image");
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeSpan = document.getElementsByClassName("close")[0];

img.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt; // Use the alt attribute as the caption
};

closeSpan.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// stats start here
document.addEventListener("DOMContentLoaded", () => {
  const counts = document.querySelectorAll(".count");

  counts.forEach((count) => {
    const target = +count.getAttribute("data-target");
    let currentCount = 0;
    const increment = Math.ceil(target / 200); // Adjust speed of increment

    const updateCount = () => {
      if (currentCount < target) {
        currentCount += increment;
        if (currentCount > target) {
          currentCount = target;
        }
        count.textContent = currentCount;
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  });
});
