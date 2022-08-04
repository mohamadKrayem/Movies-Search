import axios from 'axios';

$(document).ready(function(){
  $('#searchForm').on('submit', function(e){
    e.preventDefault();
    let searchText = $('#searchText').val();
    getMovies(searchText);
    console.log(searchText);
  });
});


function getMovies(searchText){
  console.log('hello world');
  axios.get('http://www.omdbapi.com/?apikey=d66fc54e&s='+searchText)
  .then(res=> res.data.Search)
  .then(data=>{
    let output = '';
    data.forEach(function(movie, index){
      output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="${movie.Poster}" />
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a> 
          </div>
        </div>
      `
    });

    $('#movies').html(output);
  }).catch(err=>{
    console.log(err);
  })
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}


function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?apikey=d66fc54e&i='+movieId)
  .then(res=> res.data)
  .then(movie=>{
    let output = '';
    output += `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail"/>
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
            
          </div>
        </div>
      </div>
    `;

    $('#movie').html(output);
  }).catch(err=>{
    console.log(err);
  })
}
