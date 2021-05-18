"use strict";


/*
    $(window).load(function() {
        alert("window finished loading");
    })
*/

const getMovies = () => {
    fetch("https://lunar-spice-chocolate.glitch.me/movies")
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
        })

}
    getMovies();


