"use strict";

//Removes the div of the load image
function removeLoader() {
    $("#loadingDiv").fadeOut(2000, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}
//Get Method

// Main Function
const getMovies = () => {
    $('#container').append('<div class="container d-flex justify-content-center align-items-center" id="loadingDiv"><div class="loader"><img src="img/Loading.gif"' +
        ' alt="loadingGif"></div></div>');
    fetch("https://lunar-spice-chocolate.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {
            removeLoader();
            console.log(movies);
            let htmlStr = "";
                // Moving the add movie form to be dynamically created AND above the list of movies
                htmlStr += `<div class="container justify-content-center align-items-center mainTitle">`;
                htmlStr += `<h1>Add Your Own Movie</h1>`;
                htmlStr += `<div class="row justify-content-center align-items-center">`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="titleName"></label>`;
                htmlStr += `<input type="text" id="titleName" placeholder="Title">`
                htmlStr +=  `</div>`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="directorName"></label>`;
                htmlStr += `<input type="text" id="directorName" placeholder="Director(s)">`;
                htmlStr +=  `</div>`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="actorName"></label>`;
                htmlStr += `<input type ="text" id="actorName" placeholder="Actor(s)">`
                htmlStr +=  `</div>`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="ratingValue"></label>`;
                htmlStr += `<input type="text" id="ratingValue" placeholder="Rating">`;
                htmlStr +=  `</div>`;
                htmlStr += `<div class="col-12 Title">`;
                htmlStr += ` <button id="newMovie" type="button">Add Movie Info</button>`;
                htmlStr += `</div>`;
                htmlStr += `</div>`;
                htmlStr += `</div>`;
                //The loop of dynamically created movies that is called from the API
            for (let movie of movies) {
                console.log(movies);
                htmlStr += `<div class="container justify-content-center align-items-center titles">`;
                htmlStr += `<h1>${movie.title.toUpperCase()}</h1>`;
                htmlStr += `<p><strong>Director:</strong> ${movie.director}</p>`;
                htmlStr += `<p><strong>Actors: </strong> ${movie.actors}</p>`;
                htmlStr += `<p><strong>Rating: </strong> ${movie.rating}</p>`;
                htmlStr += `<button class="col-2 editMovie">Edit Movie</button>`//Option to edit movie details
                htmlStr += `<div class="row justify-content-center align-items-center editInfo">`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="editName"></label>`;
                htmlStr += `<input type="text" class="editName${movie.id}" placeholder="Title">`;
                htmlStr += `</div>`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="editDirector"></label>`;
                htmlStr += `<input type="text" class="editDirector${movie.id}" placeholder="Director(s)">`;
                htmlStr += `</div>`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="editActor"></label>`;
                htmlStr += `<input type="text" class="editActor${movie.id}" placeholder="Actor(s)">`;
                htmlStr += `</div>`;
                htmlStr += `<div class="col-3 Title">`;
                htmlStr += `<label for="editRating"></label>`;
                htmlStr += `<input type="text" class="editRating${movie.id}" placeholder="Rating">`;
                htmlStr += `</div>`;
                htmlStr += `<div class="col-12 Title">`;
                htmlStr += `<button class="makeChange" type="button" data-id="${movie.id}">Commit Changes</button>`;
                htmlStr += `<button class="deleteMovie" type="button" data-id="${movie.id}">Delete</button>`;
                htmlStr += `</div>`;
                htmlStr += `</div>`;
                htmlStr += `</div>`;

            }

            setTimeout(function (){
                //The container displays after loader function has ran
                $("#container").html(htmlStr)

                $(".editMovie").click(function(){

                    $(".editInfo").css({"visibility" : "initial"});
                })
                $('.makeChange').click((e) =>{
                    //Targets the object's ID Number from the edit button and the delete button
                    let movieID = $(e.target).data("id");

                    //Is assigned to each class of the inputs
                    let editMovie = {
                        title: $('.editName'+ movieID).val(),
                        director: $('.editDirector'+ movieID).val(),
                        actors: $('.editActors' + movieID).val(),
                        rating: $('.editRating'+ movieID).val()
                    }

                    //Defining the PUT method
                    let putOptions = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editMovie)
                    }

                    //${movieID} variable is assigned to the url in order to gather the id from the object
                    fetch(`https://lunar-spice-chocolate.glitch.me/movies/${movieID}`, putOptions)

                        .then(resp => resp.json())
                        .then(getMovies)

                })

                    //The delete button click function
                $('.deleteMovie').click(function (e){
                    var deleteMovie = $(e.target).data("id");

                    //The delete method variable
                    let deleteOptions = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    };
                    fetch(`https://lunar-spice-chocolate.glitch.me/movies/${deleteMovie}`, deleteOptions)

                        .then (resp => resp.json())
                        .then(getMovies);
                })

                //Add movie function allows users to input their own movie names to the list of arrays
                $('#newMovie').click(() =>{

                    let addMovie = {
                        title : $('#titleName').val(),
                        director : $('#directorName').val(),
                        actors : $('#actorName').val(),
                        rating : $('#ratingValue').val()
                    }

                    let postOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(addMovie)
                    }

                    fetch("https://lunar-spice-chocolate.glitch.me/movies",postOptions)
                        .then(resp => resp.json())
                        .then(getMovies);

                });

            }, 1500)

        });
}
    getMovies();





