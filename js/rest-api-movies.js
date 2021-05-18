"use strict";




// window.addEventListener('load', (event) => {
//     console.log('page is fully loaded');
// });

$('body').append('<div style="" id="loadingDiv"><div class="loader"><img src="../img/Loading.gif" alt="loadingGif"></div></div>');
$(window).on('load', function(){
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});
function removeLoader(){
    $( "#loading-image" ).fadeOut(1000, function() {
        // fadeOut complete. Remove the loading div
        $( "#loadingDiv" ).remove(); //makes page more lightweight
    });
}

//Get Method?
const getMovies = () => {
    fetch("https://lunar-spice-chocolate.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            let htmlStr = "";
            for (let movie of movies) {
                htmlStr += `<h1>${movie.title}</h1><p>Director: ${movie.director} <br> ${movie.actors}</p>`;
            }
            $("#container").html(htmlStr);

        });
}
    getMovies();



