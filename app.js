let currentFact = "";
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const factElement = document.getElementById("fact");
const btnRefresh = document.getElementById("btnRefresh");
const btnFavorite = document.getElementById("btnFavorite");
const favoritesList = document.getElementById("favorites-list");
const moon = document.getElementById("moon");

const moonImages = [
  "Assets/img/Luna1.jpg",
  "Assets/img/Luna2.jpg",
  "Assets/img/Luna3.jpg"
];

let currentImage = 0;

function getFact() {
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
    .then(response => response.json())
    .then(data => {
      currentFact = data.text;
      factElement.textContent = currentFact;
    })
    .catch(error => {
    factElement.textContent = "Fact could not be loaded";
    });
}

function showHome() {
  document.getElementById('home-page').style.display = 'block';
  document.getElementById('favorites-page').style.display = 'none';
}

function showFavorites() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('favorites-page').style.display = 'block';
}

function router(){
    const hash = window.location.hash;

    if (hash === "#favorites") {
        showFavorites();
    } else {
        showHome();
    }
}

function saveFavorite() {
  if (currentFact && !favorites.includes(currentFact)) {
    favorites.push(currentFact);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
    }
}

function renderFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((fact, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${fact}`;
    favoritesList.appendChild(li);
  });
}

btnRefresh.addEventListener("click", () => {
    
  moon.classList.add("fade-out");

  setTimeout(() => {
    currentImage = (currentImage + 1) % moonImages.length;
    moon.style.backgroundImage = `url('${moonImages[currentImage]}')`;
    moon.classList.remove("fade-out");
  }, 500);

 getFact();
});

btnRefresh.addEventListener("click", getFact);
btnFavorite.addEventListener("click", saveFavorite);
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

getFact();