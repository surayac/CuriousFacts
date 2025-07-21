console.log("Hello world");

//const URL = "https://uselessfacts.jsph.pl/api/v2/facts/random"

//fetch(URL)
//.then(res => res.json())
//.then (data => {
  //  const btnRefresh = document,QuerySelector(btnRefresh)
    //btnRefresh = data[0].url;
//} );


let currentFact = "";
let favorites = [];

const factElement = document.getElementById("fact");
const btnRefresh = document.getElementById("btnRefresh");
const btnFavorite = document.getElementById("btnFavorite");
const favoritesList = document.getElementById("favorites-list");

// Función para traer dato desde la API
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

// Función para guardar como favorito
function saveFavorite() {
    if (currentFact && !favorites.includes(currentFact)) {
        favorites.push(currentFact);
        renderFavorites();
    }
}

// Función para mostrar los favoritos
function renderFavorites() {
    favoritesList.innerHTML = "";
    favorites.forEach((fact, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${fact}`;
        favoritesList.appendChild(li);
    });
}

// Eventos
btnRefresh.addEventListener("click", getFact);
btnFavorite.addEventListener("click", saveFavorite);

// Mostrar uno al cargar la página
getFact();
