"use strict";

//Removes the div of the load image
function removeLoader() {
    $("#loadingDiv").fadeOut(1000, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}


//Get Method

// Main Function
const getMovies = () => {
    $('#container').append('<div style="" id="loadingDiv"><div class="loader"><img src="img/Loading.gif"' +
        ' alt="loadingGif"></div></div>');
    fetch("https://lunar-spice-chocolate.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {
            removeLoader();
            console.log(movies);
            let htmlStr = "";
            for (let movie of movies) {
                console.log(movies);
                htmlStr += `<h1>${movie.title}</h1><p><strong>Director:</strong> ${movie.director} <br>`;
                htmlStr += `<strong>Actors: </strong> ${movie.actors}<br><strong>Rating: </strong> ${movie.rating}<br><strong>Id : </strong>${movie.id}</p>`;
                htmlStr += `<label for="editName"></label>`;
                htmlStr += `<input type="text" class="editName${movie.id}" placeholder="Title">`;
                htmlStr += `<label for="editDirector"></label>`;
                htmlStr += `<input type="text" class="editDirector${movie.id}" placeholder="Director(s)">`;
                htmlStr += `<label for="editRating"></label>`;
                htmlStr += `<input type="text" class="editRating${movie.id}" placeholder="Rating">`;
                htmlStr += `<button class="editMovie" type="button" data-id="${movie.id}">Edit Movie Info</button>`;
                htmlStr += `<button class="deleteMovie" type="button" data-id="${movie.id}">Delete</button>`;


            }

            setTimeout(function (){
                //The container displays after loader function has ran
                $("#container").html(htmlStr)
                // $('#container').append(htmlStr);

                $('.editMovie').click((e) =>{
                    //Targets the object's ID Number from the edit button and the delete button
                    let movieID = $(e.target).data("id");

                    //Is assigned to each class of the inputs
                    let editMovie = {
                        title: $('.editName'+ movieID).val(),
                        director: $('.editDirector'+ movieID).val(),
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

            }, 1050)

        });
}
    getMovies();

    //Add movie function allows users to input their own movie names to the list of arrays
    $('#newMovie').click(() =>{

        let addMovie = {
            title : $('#titleName').val(),
            director : $('#directorName').val(),
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



