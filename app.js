console.log("Hello world");

let currentFact = "";
let favorites = [];

const factElement = document.getElementById("fact");
const btnRefresh = document.getElementById("btnRefresh");
const btnFavorite = document.getElementById("btnFavorite");
const favoritesList = document.getElementById("favorites-list");
const moon = document.getElementById("moon");

// Imágenes de la luna 
const moonImages = [
  "Assets/img/Luna1.jpg",
  "Assets/img/Luna2.jpg",
  "Assets/img/Luna3.jpg"
];

let currentImage = 0;

// Obtener dato curioso desde la API
function getFact() {
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
    .then(response => response.json())
    .then(data => {
      currentFact = data.text;
      console.log(data.text);
      factElement.textContent = currentFact;
    })
    .catch(error => {
      console.error("Error al obtener el dato:", error);
      factElement.textContent = "No se pudo cargar el dato 😢";
    });
}

// Guardar como favorito
function saveFavorite() {
  if (currentFact && !favorites.includes(currentFact)) {
    favorites.push(currentFact);
    renderFavorites();
  }
}

// Mostrar lista de favoritos
function renderFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((fact, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${fact}`;
    favoritesList.appendChild(li);
  });
}

// Evento al hacer clic en "Next Fact"
btnRefresh.addEventListener("click", () => {
    
  // Transición de la luna
  moon.classList.add("fade-out");

  setTimeout(() => {
    currentImage = (currentImage + 1) % moonImages.length;
    moon.style.backgroundImage = `url('${moonImages[currentImage]}')`;
    moon.classList.remove("fade-out");
  }, 500);

  // Mostrar nuevo dato curioso
  getFact();
});

// Evento "Like Quote"
btnFavorite.addEventListener("click", saveFavorite);

// Mostrar un dato al cargar
getFact();