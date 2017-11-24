var keys = require("./keys.js");
var request = require("request")
var fs = require("fs")
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var input = process.argv;
var input1 = input[2];
var input2 = input[3];



function myTweets() {
    var client = new Twitter(keys.twitterKeys);
    console.log('tweets');
    client.get("statuses/user_timeline", function (error, tweets, response) {
        if (error) {
            console.log(error);
        }

        tweets.forEach(function (tweets) {
            console.log(tweets.text + " " + tweets.created_at);
        })
    })
}

function spotifySong(song) {
    if (song === " ") {
        song === "The Sign Ace of Base"
    }
    var spotifySearch = new Spotify(keys.spotifyKeys);
    console.log('spotify');
    spotifySearch.search({
            type: 'track',
            query: song,
            limit: 1
        },
        function (err, data) {
            if (err) {
                console.log(error)
            }
            console.log("worked")
            console.log(data.tracks.items[0].album.artists[0].name);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);

        })
}

function movieInfo() {
    var url = "http://www.omdbapi.com/?apikey=40e9cece";
    var movie = input2
    if (movie === "") {
        url += "&t=Mr+Nobody&type=movie"
    } else {
        url += "&t=" + movie;
    }
    request(url, function (error, response, body) {
        // console.log("this worked")
        if (error) {
            console.log(error)
        }
        if (response.statusCode === 200) {

        var infoJson = JSON.parse(body)
        console.log(infoJson.Title);
        console.log(infoJson.Year);
        console.log(infoJson.Country);
        console.log(infoJson.Plot);
        console.log(infoJson.Actors);
        }

    })
}

function readRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error)
        }
        console.log(data);

    })
}

function cmdListen(request, userInput) {
    switch (request) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifySong(userInput);
            break;
        case "movie-this":
            movieInfo(userInput);
            break;
        case "do-what-it-says":
            readRandom();
            break;

    }
}
cmdListen(input1, input2);