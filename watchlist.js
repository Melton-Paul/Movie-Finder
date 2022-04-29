const stored = JSON.parse(window.localStorage.getItem("savedIds"))
const noData = document.getElementById("noData")




function renderList(){
    if(stored.length > 0){
    noData.style.display = "none"
    stored.forEach(movieId => {
        fetch(`https://www.omdbapi.com/?apikey=9980ac75&i=${movieId}&`)
        .then(res => res.json())
        .then(data => {
            const {Title, Runtime, Genre, Plot, imdbRating, imdbID, Poster} =  data
            movieContainer.innerHTML += `
                    <div class="movie-container container">
                        <img class="movie-img" src="${Poster}" alt="A poster of the movie ***">
                        <div class="movie-content">
                            <div class="movie-header">
                                <h2 class="movie-title clear__bottom">${Title}</h2>
                                <i class="fa fa-star clear__bottom"></i>
                                <p class="movie-rating clear__bottom">${imdbRating}</p>
                            </div>
                            <div class="movie-tags">
                                <p class="movie-tag movie-time clear__bottom">${Runtime}</p>
                                <p class="movie-tag movie-category clear__bottom">${Genre}</p>
                                <div class=" movie-tag watchlist-add" id="${imdbID}">
                                    <i class="fa fa-x"></i>
                                    <p class="clear__bottom">Remove</p>
                                </div>
                            </div>
                            <div class="movie-desc">
                                <p>${Plot}</p>
                            </div>
                        </div>
                        </div>
                        `
                        removeMovie()
    
    
        })

        
    })

    }
}
    



function removeMovie(){
    const watchlistMovies = Array.from(document.getElementsByClassName("watchlist-add"))
    watchlistMovies.forEach(movie => {
        movie.addEventListener("click", event => {
            const movieId = event.target.parentElement.id
            const location = stored.indexOf(movieId)
            stored.splice(location, 1)
            window.localStorage.setItem("savedIds", JSON.stringify(stored))
            document.location.reload()


        })
    })
}


renderList()