// movie app that pulls all Wes Anderson movies

// namespace
var movieApp = {};

movieApp.api_key = 'fdbbdd3674ce1ebe1a8033b50c959db6';

movieApp.wesAndersonId = '5655';

movieApp.init = function() {
	movieApp.grabConfig();

	};

movieApp.grabConfig = function() {
	var configURL = 'https://api.themoviedb.org/3/configuration';
	$.ajax(configURL,{
		data : {
			api_key : movieApp.api_key 
		},
		type : 'GET',
		dataType : 'jsonp',
		success : function(config){
			movieApp.config = config; 
			movieApp.grabWesAndersonMovies(); 
		} 
	}); // end configURL ajax
}; 

movieApp.grabWesAndersonMovies = function(){

	var wesAndersonMoviesURL = 'http://api.themoviedb.org/3/person/'+movieApp.wesAndersonId+'/movie_credits';

	$.ajax(wesAndersonMoviesURL, {
		data: {
			api_key: movieApp.api_key
		},
		type : 'GET',
		dataType : 'jsonp',
		success : function(results) {
			console.log(results.crew);
			movieApp.displayMovies(results.crew);

		} 
	}); // end ajax
}; 

movieApp.displayMovies = function(movies){

	for (var i = 0; i < movies.length; i++) {
		
		if (movies[i].department === "Directing") {
			var title = $('<h2>').text(movies[i].title);
			var release = $('<h3>').text(movies[i].release_date);

			var image = $('<img>').attr('src', movieApp.config.images.base_url + "w500" + movies[i].poster_path);

			var movieDiv = $('<div>').addClass('movie').append(title,release,image);

			$('.movies').append(movieDiv);

		}

	}; // end loop

};


$(function(){
	movieApp.init();

}); // end doc ready
