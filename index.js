const search = document.getElementById("searchBar")
const movieContainer = document.getElementById("movieContainer")
let searchArray = []


document.getElementById("searchBtn").addEventListener("click", function(){
    let searchValue = search.value
    fetch(`http://www.omdbapi.com/?apikey=9980ac75&s=${searchValue}`)
        .then(res => res.json())
        .then(data => {console.log(data.Search)
            data.Search.forEach(movie => {
                fetch(`http://www.omdbapi.com/?apikey=9980ac75&t=${movie.Title}`)
                    .then(res => res.json())
                    .then(data => {console.log(data)
                        const {Title, Runtime, Genre, Plot, imdbRating, Poster} =  data
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
                                        <div class=" movie-tag watchlist-add">
                                            <i class="fa fa-plus"></i>
                                            <p class="clear__bottom">Add to Watchlist</p>
                                        </div>
                                    </div>
                                    <div class="movie-desc">
                                        <p>${Plot}</p>
                                    </div>
                                </div>
                            </div>
                        `
                        searchArray.push(movieHtml)
                    })
                });
                
                console.log(searchArray)

        
        
        
        })

            });
        

