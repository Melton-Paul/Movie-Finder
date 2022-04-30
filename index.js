const search = document.getElementById("searchBar")
const movieContainer = document.getElementById("movieContainer")
const noData = document.getElementById("noData")
let movieAdd = document.getElementsByClassName("watchlist-add")
let savedId = []
let typingTimer


document.getElementById("searchBtn").addEventListener("click", getData)
search.addEventListener('keyup', () => {
    clearTimeout(typingTimer)
    if (search.value) {
        typingTimer = setTimeout(getData, 2000) 
        movieContainer.innerHTML = `
        <div id="noData">
            <img class="loading" src="/30+fps.gif">
            <p>Fetching Movies</p>
        </div>
            `
    }
})

function getData(){
    let searchValue = search.value
    fetch(`https://www.omdbapi.com/?apikey=9980ac75&s=${searchValue}`)
    .then(res => res.json())
    .then(data => {
            movieContainer.innerHTML= ""
            noData.style.display = "none"
            data.Search.forEach(movie => {
                fetch(`https://www.omdbapi.com/?apikey=9980ac75&t=${movie.Title}`)
                .then(res => res.json())
                .then(data => {
                    movieContainer.innerHTML += renderPage(data)
                    createList()
                    
                })
            });
    })
    .catch(() => {
        noData.style.display = "block"
        movieContainer.innerHTML= `
        <div id="noData">
        <p>OOPS!</p>
        <p>No movie was found, check your spelling!</p>
        </div>
        `
    })
}
        
function renderPage(data) {
    const {Title, Runtime, Genre, Plot, imdbRating, imdbID, Poster} =  data
    return  `
        <div class="movie-container container">
            <img class="movie-img" src="${Poster}" alt="A poster of the movie ${Title}">
            <div class="movie-content">
            <div class="movie-header">
            <h2 class="movie-title clear__bottom">${Title}</h2>
            <i class="fa fa-star clear__bottom"></i>
            <p class="movie-rating clear__bottom">${imdbRating}</p>
            </div>
            <div class="movie-tags">
            <p class="movie-tag movie-time clear__bottom">${Runtime}</p>
            <p class="movie-tag movie-category clear__bottom">${Genre}</p>
            <div class=" movie-tag watchlist-add" id="${imdbID}" >
            <i class="fa fa-plus"></i>
            <p class="clear__bottom" >Add to Watchlist</p>
            </div>
            </div>
            <div class="movie-desc">
            <p>${Plot}</p>
            </div>
            </div>
            </div>
            `
        }

function createList(){
    const wantedMovies = Array.from(document.getElementsByClassName("watchlist-add"))
    wantedMovies.forEach(movie => {
        movie.addEventListener("click", (event) => {
           const movieId =  event.target.parentElement.id
           document.getElementById(movieId).innerHTML = ""
            if(savedId.includes(movieId)){
                window.alert("You already have this movie in your watch list!")
            }
            else {
                    savedId.push(movieId)
                    window.localStorage.setItem("savedIds", JSON.stringify(savedId))
                }       
    })
})
}


    
function pageLoad(){
    if(window.localStorage.length > 0){
        savedId = JSON.parse(window.localStorage.getItem("savedIds"))
    }
    
}
pageLoad()