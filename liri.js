var keys = require("./keys.js");
var request = require("request")
var fs = require("fs")
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var input = process.argv;
var input1 = input[2];
var input2 = "";



function myTweets() {
    var client = new Twitter(keys.twitterKeys);
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
    if (song === '') {
        song = "The Sign Ace of Base"
    }
    var spotifySearch = new Spotify(keys.spotifyKeys);

    spotifySearch.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (!err) {
            console.log("Name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
        } else {
            return console.log(err)
        }
    })
}



function movieInfo() {
    for (var i = 3; i < process.argv.length; i++) {
        if (input2 === "") {
            input2 = input2 + process.argv[i];
        } else {
            input2 = input2 + " " + process.argv[i]
        }
    }
    if (input2 === "") {
        input2 = "Mr. Nobody"
    }
    var url = "http://www.omdbapi.com/?t=" + input2 + "&apikey=40e9cece";
    request(url, function (error, response, body) {
        if (error) {
            console.log(error)
        }
        if (response.statusCode === 200) {
            var infoJson = JSON.parse(body)
            console.log("This movie Title is: " + infoJson.Title);
            console.log("This movie was made in the year: " + infoJson.Year);
            console.log("This movie was made in: " + infoJson.Country);
            console.log("The plot of this movie is: " + infoJson.Plot);
            console.log("The actors in this movie are: " + infoJson.Actors);

        }
    })

}

function readRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error)
        }

        var split = data.split(",")
        action = split[0];
        randomMovie = split[1];
        cmdListen(action, randomMovie);

    })
}

function cmdListen(request, userInput) {
    console.log("Please enter one of the following" +
        "\n my-tweets" +
        "\n spotify-this-song" +
        "\n movie-this" +
        "\n do-what-it-says");
    switch (request) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            for (var i = 3; i < process.argv.length; i++) {
                if (input2 === '') {
                    input2 = input2 + process.argv[i];
                } else {
                    input2 = input2 + ' ' + process.argv[i];
                }
            }
            spotifySong(input2);
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