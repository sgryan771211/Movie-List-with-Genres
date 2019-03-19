const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const data = []
const genresList = document.querySelector('#genresList')
const movieList = document.querySelector('#movieList')
const genres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

axios.get(INDEX_URL).then((response) => {
  data.push(...response.data.results)
  displayMovieList(data)
}).catch((err) => console.log(err))

genresList.addEventListener('click', (event) => {
  if (event.target.matches('.nav-link')) {
    displayMovieList(filter(event.target.dataset.id))
  }
})

function displayGenresList(genres) {
  let htmlContent = ''
  for (let item in genres) {
    htmlContent += `
      <li>
        <a class="nav-link" data-toggle="pill" href="#" role="tab" data-id="${item}"> ${genres[item]}</a>
      </li>`
  }
  genresList.innerHTML = htmlContent
}

displayGenresList(genres)

function displayMovieList(data) {
  let htmlContent = ''
  movieList.innerHTML = htmlContent
  data.forEach(function (item, index) {
    htmlContent += `
        <div class="col-sm-4">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
              ${addSpan(item)}
            </div >
          </div >
        </div > `
    movieList.innerHTML = htmlContent
  })
}

function addSpan(item) {
  let htmlContent = ''
  for (let i = 0; i < item.genres.length; i++) {
    htmlContent += `<span class="badge badge-info card-subtitle mr-1">${genres[item.genres[i]]}</span>`
  }
  return htmlContent
}

function filter(id) {
  let results = []
  let finalResults = []
  for (let i = 0; i < Object.keys(genres).length; i++) {
    results = data.filter(movie => movie.genres[i] === parseInt(id))
    finalResults = finalResults.concat(results)
  }
  return finalResults
}