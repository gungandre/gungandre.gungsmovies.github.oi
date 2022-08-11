//menggunakan fetch (async await)

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-film");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (e) {
    console.log(e);
    alert(e);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=1ade5555&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        console.log(response);
        throw new Error(response.Error);
      }

      return response.Search;
    });
}

function updateUICard(sukses) {
  return fetch("http://www.omdbapi.com/?apikey=1ade5555&i=" + sukses)
    .then((e) => e.json())
    .then((sukses) => sukses);
}

function updateUI(movies) {
  const movieContainer = document.querySelector(".movie-container");
  let card = "";
  movies.forEach((film) => {
    card += showCards(film);
  });
  movieContainer.innerHTML = card;
}

document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("modal-detail-button")) {
    const cardDetails = document.querySelector(".modal-body");
    console.log(event.target.dataset.imdbid);
    const detail = event.target.dataset.imdbid;
    const movieDetails = await updateUICard(detail);
    console.log(movieDetails);
    cardDetails.innerHTML = showMovieDetail(movieDetails);
  }
});

function showCards(film) {
  return `<div class="col-md-4 my-3">
              <div class="card">
                  <img src="${film.Poster}" class="card-img-top" alt="" />
                  <div class="card-body">
                  <h5 class="card-title">${film.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${film.Year}</h6>
                  <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#MovieDeatailModal" data-imdbid="${film.imdbID}">Show Details</a>
                  </div>
              </div>
          </div>`;
}

function showMovieDetail(sukses) {
  return `<div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <img src="${sukses.Poster}" alt="" class="img-fluid" />
        </div>
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item"><h4>${sukses.Title}(2014</h4></li>
            <li class="list-group-item"><strong>Director : ${sukses.Director}</strong></li>
            <li class="list-group-item"><strong>Actors : ${sukses.Actors}</strong></li>
            <li class="list-group-item"><strong>Writer : ${sukses.Writer}</strong></li>
            <li class="list-group-item">
              <strong>Plot : <br /></strong>${sukses.Plot}
            </li>
          </ul>
        </div>
      </div>
    </div>`;
}
