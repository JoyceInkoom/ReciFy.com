document.getElementById('searchBtn').addEventListener('click', function() {
  const query = document.getElementById('query').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
      .then(response => response.json())
      .then(data => {
          if (data.recipes.length === 0) {
              resultsDiv.innerHTML = '<p>No recipes found.</p>';
              return;
          }

          data.recipes.forEach(recipe => {
              const recipeDiv = document.createElement('div');
              recipeDiv.classList.add('recipe');
              recipeDiv.innerHTML = `
                  <h3>${recipe.title}</h3>
                  <p>Source: <a href="${recipe.source_url}" target="_blank">View Recipe</a></p>
                  <img src="${recipe.image_url}" alt="${recipe.title}" style="width:100px;height:auto;">
              `;
              resultsDiv.appendChild(recipeDiv);
          });
      })
      .catch(error => {
          console.error('Error fetching recipes:', error);
          resultsDiv.innerHTML = '<p>Error fetching recipes. Please try again.</p>';
      });
});
