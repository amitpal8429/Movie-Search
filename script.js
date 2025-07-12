const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector("#movie-box");
const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data);
};
getMovies(APIURL);

const showMovies = (data) => {
  movieBox.innerHTML = "";
  data.results.forEach((result) => {
    const imagePath =
      result.poster_path === null
        ? "https://via.placeholder.com/300x450?text=No+Image"
        : IMGPATH + result.poster_path;

    const box = document.createElement("div");
    box.classList.add("box");

    box.innerHTML = `
      <img src="${imagePath}" alt="${result.original_title}" />
      <div class="overlay">
        <div class="title"> 
          <h2>${result.original_title}</h2>
          <span>${result.vote_average}</span>
        </div>
        <h3>Overview:</h3>
        <p>${result.overview}</p>
      </div>
    `;

    movieBox.appendChild(box);
  });
};


document.querySelector("#search-input").addEventListener("keyup", function (event) {
  const query = event.target.value.trim();
  if (query !== "") {
    getMovies(SEARCHAPI + query);
  } else {
    getMovies(APIURL);
  }
});

function searchMovie() {
  const query = document.getElementById("search-input").value.trim();
  if (query !== "") {
    getMovies(SEARCHAPI + query);
  } else {
    getMovies(APIURL);
  }
}
