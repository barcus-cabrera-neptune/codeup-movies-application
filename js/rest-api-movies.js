"use strict";





// window.addEventListener('load', (event) => {
//     console.log('page is fully loaded');
// });


/*$(window).on('load', function(){
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});*/
function removeLoader() {
    $("#loadingDiv").fadeOut(1000, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}


//Get Method?
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
                htmlStr += `<h1>${movie.title}</h1><p><strong>Director:</strong> ${movie.director} <br>`;
                htmlStr += `<strong>Actors: </strong> ${movie.actors}<br><strong>Rating: </strong> ${movie.rating}<br><strong>Id : </strong>${movie.id}</p>`;
                htmlStr += `<label for="editName"></label>`;
                htmlStr += `<input type="text" class="${movie.id}" placeholder="Title">`;
                htmlStr += `<label for="editDirector"></label>`;
                htmlStr += `<input type="text" class="${movie.id}" placeholder="Director(s)">`;
                htmlStr += `<label for="editRating"></label>`;
                htmlStr += `<input type="text" class="editRating[${movie.id}" placeholder="Rating">`;
                htmlStr += `<button class="editMovie" type="button" data-id="${movie.id}">Edit Movie Info</button>`;
                htmlStr += `<button class="deleteMovie" type="button" data-id="${movie.id}">Delete</button>`;


            }

            setTimeout(function (){
                $("#container").html(htmlStr)
                $('.editMovie').click((e) =>{
                    let movieID = $(e.target).data("id");
                    console.log($(this));

                    let editMovie = {
                        title: $('.editName').val(),
                        director: $('.editDirector').val(),
                        rating: $('.editRating').val()
                    }

                    let putOptions = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editMovie)
                    }


                    fetch(`https://lunar-spice-chocolate.glitch.me/movies/${movieID}`, putOptions)

                        .then(resp => resp.json())
                        .then(getMovies);
                })

                $('.deleteMovie').click(function (e){
                    var deleteMovie = $(e.target).data("id");
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



